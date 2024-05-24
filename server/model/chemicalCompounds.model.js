import { Sequelize } from 'sequelize';
import { sequelize } from '../data/connectDB.js';

const ChemicalCompound = sequelize.define('ChemicalCompound', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    CompoundName: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    CompoundDescription: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
    strImageSource: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    strImageAttribution: {
      type: Sequelize.STRING,
      allowNull: true,
    },
  });

  sequelize.sync().then(() => {
    console.log('chemical compound table created successfully!');
 }).catch((error) => {
    console.error('Unable to create table : ', error);
 });




export default ChemicalCompound;
