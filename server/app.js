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

app.use("/api/compound",compoundRouter);

