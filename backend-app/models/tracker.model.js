const Sequelize = require("sequelize");
const sequelize = require("../configs/db.configs");

const Tracker = sequelize.define("tracker", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  pet_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  long: {
    type: Sequelize.DECIMAL(10, 7),
    defaultValue: 33.8547,
  },
  lat: {
    type: Sequelize.DECIMAL(10, 7),
    defaultValue: 35.8623,
  },
});

module.exports = Tracker;
