const Sequelize = require("sequelize");
const sequelize = require("../configs/db.configs");

const Tracker = sequelize.define("tracker", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
});

module.exports = Tracker;
