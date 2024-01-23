const Sequelize = require("sequelize");
const sequelize = new Sequelize("db_paws_app", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

module.exports = sequelize;
