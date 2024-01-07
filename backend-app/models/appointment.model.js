const Sequelize = require("sequelize");
const sequelize = require("../configs/db.configs");

const Appointment = sequelize.define("tracker", {
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
  date: {
    type: Sequelize.DATE,
    allowNull: false,
  },
  status: {
    type: Sequelize.ENUM("PENDING", "FINISHED", "CANCELED"),
    allowNull: false,
  },
});

module.exports = Appointment;
