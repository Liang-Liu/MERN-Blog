const Users = require("../models/users");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

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
		if (existingUser) {
			return res.status(400).json({ msg: `${email} already exist` });
		}

		const hashedPW = await bcrypt.hash(password, 10);

		const User = new Users({
			firstName,
			lastName,
			email,
			password: hashedPW,
			imgURL,
		});

		await User.save();

		const token = jwt.sign({ userId: User._id }, "tokenKey", {
			expiresIn: "1h",
		});

		res.json({ msg: "Users created", existingUser: User, token });
	} catch (e) {
		console.log(e);
	}
};

// SignIn Users
const userSignIn = async (req, res) => {
	const { firstName, lastName, email, password, imgURL } = req.body;
	try {
		const existingUser = await Users.findOne({ email });
		if (!existingUser) {
			return res.status(404).json({ msg: `email: ${email} is not found` });
		}

		const correctPW = await bcrypt.compare(password, existingUser.password);

		if (!correctPW) {
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
