const express = require("express");
const router = express.Router();

const { getAllUsers, userSignIn, userSignUp } = require("../controller/user");

// DEV -- GET all user
router.get("/", getAllUsers);

// SignUp Users
router.post("/signup", userSignUp);

// SignUp Users
router.post("/signin", userSignIn);

module.exports = router;
