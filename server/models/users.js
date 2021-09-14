const mongoose = require("mongoose");

const schema = new mongoose.Schema({
	firstName: String,
	lastName: String,
	email: String,
	password: String,
	imgURL: String,
});

const Users = mongoose.model("Users", schema);

module.exports = Users;
