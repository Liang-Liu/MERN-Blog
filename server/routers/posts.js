const express = require("express");
const router = express.Router();

const {
	getAllPosts,
	getAllPostByID,
	CreatePost,
	updatePost,
	deletePost,
} = require("../controller/posts");

const { auth } = require("../middleware/auth");

// GET all posts
router.get("/", getAllPosts);

// GET post by ID
router.get("/:id", getAllPostByID);

// POST Post
router.post("/", auth, CreatePost);

// PUT posts by ID
router.put("/:id", auth, updatePost);

// DELETE posts by ID
router.delete("/:id", auth, deletePost);

module.exports = router;
