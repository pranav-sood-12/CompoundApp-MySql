import express from 'express';
import { config } from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import compoundRouter from './router/compoundRoutes.js'
import fileUpload from 'express-fileupload';



export const app = express();
const router = express.Router();

// Load environment variables
config({
  path: './data/config.env',
});

// CORS options
const corsOptions = {
  origin: 'http://localhost:4200',
  optionsSuccessStatus: 200,
  credentials: true,
  exposedHeaders: ['set-cookie'],
};
app.use(cors(corsOptions));


// Middleware
app.use(express.json());
app.use(cookieParser());

app.use(fileUpload({
    useTempFiles:true,
}))

// Test route
app.get('/', (req, res) => {
  res.send('Nice working');
});

// Example route
app.get('/data', (req, res) => {
  const results = [];
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const csvFilePath = path.join(__dirname, 'encoded-compound.csv');

  if (!fs.existsSync(csvFilePath)) {
    return res.status(404).send('CSV file not found');
  }

  fs.createReadStream(csvFilePath, { encoding: 'utf8' })
    .pipe(csv())
    .on('data', (data) => {
      console.log('Row:', data); // Log each row
      results.push(data);
    })
    .on('end', () => {
      console.log('CSV parsing completed');
      console.log('Total rows:', results.length); // Log number of rows parsed
      res.json(results);
    })
    .on('error', (error) => {
      console.error('Error reading CSV file:', error);
      res.status(500).send('Error reading the CSV file');
    });
});

app.use("/api/compound",compoundRouter);

// app.use('/api', router);