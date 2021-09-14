import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signOut } from "../features/user/userSlice";
import { useHistory } from "react-router-dom";
import decode from "jwt-decode";

import { Link } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

import navLogo from "../images/brandname.jpg";

import "./nav.css";

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
	menuButton: {
		marginRight: theme.spacing(2),
	},
	title: {
		flexGrow: 1,
	},
	link: {
		textDecoration: "none",
		color: "inherit",
	},
}));

function Nav() {
	const user = useSelector((state) => state.user);
	const classes = useStyles();
	const dispatch = useDispatch();

	useEffect(() => {
		const user = JSON.parse(localStorage.getItem("user"));

		if (user) {
			const info = decode(user.token);

			if (info.exp * 1000 < Date.now()) {
				dispatch(signOut());
			}
		}
	}, [dispatch]);

	let history = useHistory();

	const { firstName, lastName, imgURL } = user.loggedInUserData;

	return (
		<div className={classes.root}>
			<AppBar position="static" color="inherit">
				<Toolbar>
					<Link to="/" className={classes.link}>
						<img
							className="img-fluid"
							src={navLogo}
							alt="React Logo"
							id="navLogo"
						/>
					</Link>

					{user.loggedInUserData._id ? (
						<div className="nav_user_container">
							<img src={imgURL} id="user-avatar" alt="user" />
							<Typography variant="subtitle2">
								{firstName} {lastName}
							</Typography>
							<Button
								color="inherit"
								onClick={(e) => {
									e.preventDefault();
									dispatch(signOut());
									history.push("/");
								}}
							>
								Logout
							</Button>
						</div>
					) : (
						<div className="nav_user_container">
							<Link to="/login" className={classes.link}>
								<Button color="inherit">Login</Button>
							</Link>

							<Link to="/signup" className={classes.link}>
								<Button color="inherit">Signup</Button>
							</Link>
						</div>
					)}
				</Toolbar>
			</AppBar>
		</div>
	);
}

export default Nav;
