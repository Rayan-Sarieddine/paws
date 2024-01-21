const User = require("./user.model");
const Pet = require("./pet.model");
const Tracker = require("./tracker.model");

//User can have many pets, but a pet can belong to only one user
User.hasMany(Pet, { foreignKey: "belongs_to" });
Pet.belongsTo(User, { foreignKey: "belongs_to" });

//Each pet can have 1 tracker, and a tracker can belong to only one pet
Pet.hasOne(Tracker, { foreignKey: "pet_id" });
Tracker.belongsTo(Pet, { foreignKey: "pet_id" });
