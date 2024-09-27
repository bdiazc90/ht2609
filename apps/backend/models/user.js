const mongoose = require("mongoose");

const skillSchema = new mongoose.Schema({
	name: { type: String, require: true },
	level: { type: String, require: true },
});

const userSchema = new mongoose.Schema(
	{
		email: { type: String, require: true },
		phone: { type: String, require: true },
		fullname: { type: String, require: true },
		skills: [skillSchema],
	},
	{ collection: "user_skills" }
);

const userModel = new mongoose.model("User", userSchema);

module.exports = userModel;
