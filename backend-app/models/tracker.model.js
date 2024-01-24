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
  },
  secret: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  long: {
    type: Sequelize.DECIMAL(15, 10),
    defaultValue: 35.495436,
  },
  lat: {
    type: Sequelize.DECIMAL(15, 10),
    defaultValue: 33.896899,
  },
});

module.exports = Tracker;
