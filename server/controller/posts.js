const Posts = require("../models/posts");

// GET all posts
const getAllPosts = async (req, res) => {
	const posts = await Posts.find({});
	res.json(posts);
};

// GET post by ID
const getAllPostByID = async (req, res) => {
	const id = req.params.id;
	try {
		const postReturn = await Posts.findById(id);
		res.json(postReturn);
	} catch (error) {
		res.status(404).json({ msg: "No post with '" + id + "' found", error });
	}
};

// POST Post
const CreatePost = async (req, res) => {
	
	const { formData, user } = req.body;
	const {
		title,
		description,
		content,
		author,
		// data,
		imgURL,
	} = formData;

	const Post = new Posts({
		// id: productId,
		title,
		description,
		content,
		author,
		// data,
		imgURL,
		user,
	});
	Post.save(function (err) {
		if (err) return handleError(err);
		console.log("saved!");
	});

	res.status(201).json({ msg: "Post created", Post });
};

// PUT posts by ID
const updatePost = async (req, res) => {
	const id = req.params.id;
	try {
		const postReturn = await Posts.updateOne({ _id: id }, { ...req.body });
		res.json(postReturn);
	} catch (error) {
		res.status(404).json({ msg: "No posts with '" + id + "' found", error });
	}
};

// DELETE posts by ID
const deletePost = async (req, res) => {
	const id = req.params.id;
	try {
		const postReturn = await Posts.deleteOne({ _id: id });
		res.json(postReturn);
	} catch (error) {
		res.status(404).json({ msg: "No posts with '" + id + "' found", error });
	}
};

module.exports = {
	getAllPosts,
	getAllPostByID,
	CreatePost,
	updatePost,
	deletePost,
};
