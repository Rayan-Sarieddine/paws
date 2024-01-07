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
    type: Sequelize.DECIMAL,
  },
  lat: {
    type: Sequelize.DECIMAL,
  },
});

module.exports = Tracker;