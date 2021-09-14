const mongoose = require("mongoose");

const schema = new mongoose.Schema({
	title: String,
	description: String,
	content: String,
	author: String,
	// data: Number,
	imgURL: String,
	user: mongoose.Schema.Types.Mixed,
});

const Posts = mongoose.model("Posts", schema);

module.exports = Posts;
