import ChemicalCompound from "./model/chemicalCompounds.model.js";

import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import csv from 'csv-parser'


const isInitializationRequired = async () => {
    try {

      const count = await ChemicalCompound.count();
      return count === 0;
    } catch (error) {
      console.error('Error checking database records:', error);
      return false;
    }
};



const initializeDatabase = async () => {
    try {
      const initializationRequired = await isInitializationRequired();
      if (initializationRequired) {
        const __filename = fileURLToPath(import.meta.url);
        const __dirname = path.dirname(__filename);
        const csvFilePath = path.join(__dirname, 'encoded-compound.csv');

        if (!fs.existsSync(csvFilePath)) {
            return res.status(404).send('CSV file not found');
        }

        fs.createReadStream(csvFilePath, { encoding: 'utf8' })
          .pipe(csv())
          .on('data', async (data) => {
            
            await ChemicalCompound.create({
              id: data.id,
              CompoundName: data.CompoundName,
              CompoundDescription: data.CompoundDescription,
              strImageSource: data.strImageSource,
              strImageAttribution: data.strImageAttribution,
            });
          })
          .on('end', async () => {
            console.log('Initialization completed successfully');
            console.log('Initialization flag updated');
          })
          .on('error', (error) => {
            console.error('Error reading CSV file:', error);
            res.status(500).send('Error reading the CSV file');
          });;
      } else {
        console.log('Database already initialized');
      }
    } catch (error) {
      console.error('Initialization failed:', error);
    }
  };
  
  
initializeDatabase();