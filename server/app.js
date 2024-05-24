import express from 'express';
import { config } from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import compoundRouter from './router/compoundRoutes.js'


export const app = express();
const router = express.Router();

// Load environment variables
config({
  path: './data/config.env',
});

// CORS options
const corsOptions = {
  origin: 'http://localhost:4000',
  credentials: true,
  exposedHeaders: ['set-cookie'],
};
app.use(cors(corsOptions));


// Middleware
app.use(express.json());
app.use(cookieParser());

// Test route
app.get('/', (req, res) => {
  res.send('Nice working');
});

// Example route
app.get('/example', (req, res) => {
  res.json({ message: 'This is an example route' });
});

app.use("/api/compound",compoundRouter);

// app.use('/api', router);