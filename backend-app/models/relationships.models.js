const User = require("./user.model");
const Pet = require("./pet.model");
const Tracker = require("./tracker.model");
const Appointment = require("./appointment.model");

User.hasMany(Pet);
Pet.belongsTo(User);

Pet.hasOne(Tracker);
Tracker.belongsTo(Pet);

Pet.hasMany(Appointment);
Appointment.belongsTo(Pet);
