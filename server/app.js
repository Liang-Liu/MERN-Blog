const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const postsRouter = require("./routers/posts.js");
const userRouter = require("./routers/user.js");

const app = express();
app.use(cors());
app.use(express.json({ limit: "30mb" })); // for parsing application/json
app.use(express.urlencoded({ limit: "30mb", extended: true })); // for parsing application/x-www-form-urlencoded

const PORT = process.env.PORT || 5000;

const MONGODB_URI =
	"mongodb+srv://user1:liujiaxi@blogappcluster01.tknoq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

mongoose.connect(MONGODB_URI, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
	console.log("connected to mongoDB!");
});

app.use("/posts", postsRouter);
app.use("/user", userRouter);

app.get("/", (req, res) => {
	res.json("hi");
});

app.listen(PORT, () => console.log(`Server running on ${PORT}...`));
