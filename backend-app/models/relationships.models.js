const User = require("./user.model");
const Pet = require("./pet.model");
const Tracker = require("./tracker.model");
const Appointment = require("./appointment.model");

User.hasMany(Pet, { foreignKey: "belongs_to" });
Pet.belongsTo(User, { foreignKey: "belongs_to" });

Pet.hasOne(Tracker, { foreignKey: "pet_id" });
Tracker.belongsTo(Pet, { foreignKey: "pet_id" });

Pet.hasMany(Appointment, { foreignKey: "pet_id" });
Appointment.belongsTo(Pet, { foreignKey: "pet_id" });
