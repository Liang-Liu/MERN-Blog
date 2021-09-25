const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
	try {
		const token = req.headers.authorization.split(" ")[1];

		const googleToken = token.length > 500;
		if (token && !googleToken) {
			const decoded = jwt.verify(token, "tokenKey");
			next();
			return;
		}
		if (token && googleToken) {
			const decoded = jwt.decode(token);
			next();
			return;
		}
	} catch (e) {
		console.log(e);
		res.status(401).json({ msg: "unauthorized" });
	}
};

module.exports = {
	auth,
};
