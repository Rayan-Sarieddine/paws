const Sequalize = require("sequelize");
const sequalize = new Sequalize("db_paws_app", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

module.exports = sequalize;
