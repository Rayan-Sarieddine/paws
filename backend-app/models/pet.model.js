const Sequelize = require("sequelize");
const sequelize = require("../configs/db.configs");

const Pet = sequelize.define("pet", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  belongs_to: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  date_of_birth: {
    type: Sequelize.DATEONLY,
    allowNull: false,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  type: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  breed: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  image: {
    type: Sequelize.STRING,
    defaultValue: "default_pet_image.png",
  },
});

module.exports = Pet;
