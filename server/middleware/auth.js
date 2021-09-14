const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
	try {
		const token = req.headers.authorization.split(" ")[1];

		const decoded = jwt.verify(token, "tokenKey");

		console.log(decoded);

		next();
	} catch (e) {
		console.log(e);
		res.status(401).json({ msg: "unauthorized" });
	}
};

module.exports = {
	auth,
};
