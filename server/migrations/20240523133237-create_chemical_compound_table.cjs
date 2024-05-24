'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:*/
    await queryInterface.createTable('ChemicalCompound', { id: {
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
    createdAt:Sequelize.DATE,
    updatedAt:Sequelize.DATE
  });
     
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
