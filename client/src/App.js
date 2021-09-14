import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "./features/user/userSlice";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Form from "./features/form/Form";
import Posts from "./features/posts/Posts";
import Login from "./features/user/Login";
import SignUp from "./features/user/SignUp";
import Nav from "./components/Nav";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import { Link } from "react-router-dom";

import "./App.css";

const useStyles = makeStyles((theme) => ({
	mainFeaturedPost: {
		position: "relative",
		backgroundColor: theme.palette.grey[800],
		color: theme.palette.common.white,
		marginBottom: theme.spacing(1),
		backgroundImage:
			"url(https://images.unsplash.com/photo-1432821596592-e2c18b78144f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80)",
		backgroundSize: "cover",
		backgroundRepeat: "no-repeat",
		backgroundPosition: "center",
		minHeight: "10rem",
		display: "flex",
	},
	link: {
		textDecoration: "none",
		color: "inherit",
	},
}));

function App() {
	const dispatch = useDispatch();
	const user = useSelector((state) => state.user);
	const classes = useStyles();

	useEffect(() => {
		const user = JSON.parse(localStorage.getItem("user"));

		if (user) {
			dispatch(updateUser(user));
		}
	}, [dispatch]);

	return (
		<div className="App">
			<Router>
				<nav>
					<Nav />
				</nav>

				<main className="App-main">
					<Switch>
						<Route exact path="/">
							<div className="post-banner">
								<Paper className={classes.mainFeaturedPost} id="banner">
									<div className="layer">
										<Typography variant="h2" gutterBottom id="heading-main">
											Share Your Moments
										</Typography>
										{user.loggedInUserData._id ? (
											<Link to="/post" className={classes.link}>
												<Button
													id="postBtn"
													variant="contained"
													className={classes.link}
												>
													Share
												</Button>
											</Link>
										) : (
											<Link to="/login" className={classes.link}>
												<Button
													id="postBtn"
													variant="contained"
													className={classes.link}
												>
													Share
												</Button>
											</Link>
										)}
									</div>
								</Paper>
							</div>
							<Posts />
						</Route>
						<Route path="/post">
							<Form />
						</Route>
						<Route path="/login">
							<Login />
						</Route>
						<Route path="/signup">
							<SignUp />
						</Route>
					</Switch>
				</main>
			</Router>
		</div>
	);
}

export default App;
