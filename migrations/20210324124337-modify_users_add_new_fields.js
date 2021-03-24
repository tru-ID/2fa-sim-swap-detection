"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn("Users", "fullyVerified", { type: Sequelize.BOOLEAN, allowNull: true }),
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    // logic for reverting changes
    return Promise.all([queryInterface.removeColumn("Users", "fullyVerified")]);
  },
};
