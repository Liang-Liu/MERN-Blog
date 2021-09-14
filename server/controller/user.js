const Users = require("../models/users");
const jwt = require("jsonwebtoken");

// DEV -- GET all user
const getAllUsers = async (req, res) => {
	const users = await Users.find({});
	res.json(users);
};

// SignUp Users
const userSignUp = async (req, res) => {
	try {
		const { firstName, lastName, email, password, imgURL } = req.body;

		const existingUser = await Users.findOne({ email });
		// console.log(existingUser);
		if (existingUser) {
			return res.status(400).json({ msg: `${email} already exist` });
		}

		const User = new Users({
			firstName,
			lastName,
			email,
			password,
			imgURL,
		});

		await User.save();

		const token = jwt.sign({ userId: User._id }, "tokenKey", {
			expiresIn: "1h",
		});

		res.json({ msg: "Users created", existingUser: User, token });

		// res.status(201).json({ msg: "Users created", User });
	} catch (e) {
		console.log(e);
	}
};

// SignIn Users
const userSignIn = async (req, res) => {
	const { firstName, lastName, email, password, imgURL } = req.body;
	try {
		const existingUser = await Users.findOne({ email });
		// console.log(existingUser);
		if (!existingUser) {
			return res.status(404).json({ msg: `email: ${email} is not found` });
		}

		if (existingUser.password !== password) {
			return res.status(400).json({ msg: "wrong password" });
		}

		const token = jwt.sign({ userId: existingUser._id }, "tokenKey", {
			expiresIn: "1h",
		});

		res.json({ existingUser, token });
	} catch (e) {
		console.log(e);
	}
};

module.exports = {
	getAllUsers,
	userSignIn,
	userSignUp,
};
