import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import { loginUserAsync, updateUser } from "./userSlice";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import { Link } from "react-router-dom";

import logo from "../../images/logo.jpg";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

import GoogleLogin from "react-google-login";
import GoogleButton from "react-google-button";

import "./login.css";

function validateEmail(email) {
	const re =
		/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return re.test(String(email).toLowerCase());
}

const useStyles = makeStyles((theme) => ({
	paper: {
		marginTop: theme.spacing(8),
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main,
	},
	form: {
		width: "100%",
		marginTop: theme.spacing(1),
	},
	submit: {
		margin: theme.spacing(2, 0, 2),
	},
	link: {
		textDecoration: "none",
		color: "#1565c0",
		"&:hover": {
			textDecoration: "underline",
		},
	},
}));

export default function Login() {
	const [userData, setUserData] = useState({});
	const [form, setForm] = useState({
		email: { error: false, errorMsg: "" },
		password: { error: false, errorMsg: "" },
	});
	const dispatch = useDispatch();
	let history = useHistory();
	const classes = useStyles();

	const handleChange = (e) => {
		setUserData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
	};

	const responseGoogleSuccess = (response) => {
		console.log(response);
		const { profileObj, tokenId } = response;

		const googleData = {
			existingUser: {
				firstName: profileObj.familyName,
				lastName: profileObj.givenName,
				email: profileObj.email,
				imgURL: profileObj.imageUrl,
				_id: profileObj.googleId,
			},
			token: tokenId,
		};
		dispatch(updateUser(googleData));
		history.push("/");
	};
	const responseGoogleFailure = (response) => {
		console.log(response?.error);
	};

	const formValidation = () => {
		if (!validateEmail(userData.email)) {
			setForm((prev) => ({
				...prev,
				email: { error: true, errorMsg: "Invalid email" },
			}));
		} else {
			setForm((prev) => ({
				...prev,
				email: { error: false, errorMsg: "" },
			}));
		}
		if (!userData.password) {
			setForm((prev) => ({
				...prev,
				password: {
					error: true,
					errorMsg: "Password can't be empty",
				},
			}));
		} else {
			setForm((prev) => ({
				...prev,
				password: { error: false, errorMsg: "" },
			}));
		}
	};

	return (
		<Container component="main" maxWidth="xs">
			<CssBaseline />
			<div className={classes.paper}>
				<Avatar alt="logo" src={logo}></Avatar>
				<Typography component="h1" variant="h5">
					Sign in
				</Typography>
				<form className={classes.form} noValidate>
					<TextField
						error={form.email.error}
						helperText={form.email.errorMsg}
						variant="outlined"
						margin="normal"
						required
						fullWidth
						id="email"
						label="Email Address"
						name="email"
						autoComplete="email"
						autoFocus
						type="email"
						onChange={handleChange}
						value={userData.email}
					/>

					<TextField
						error={form.password.error}
						helperText={form.password.errorMsg}
						variant="outlined"
						margin="normal"
						required
						fullWidth
						name="password"
						label="Password"
						type="password"
						id="password"
						autoComplete="current-password"
						onChange={handleChange}
						value={userData.password}
					/>

					<Button
						type="submit"
						fullWidth
						variant="contained"
						color="primary"
						className={classes.submit}
						onClick={async (e) => {
							e.preventDefault();
							// Form Validation=============================
							formValidation();
							// Submit Form====================================
							if (validateEmail(userData.email) && userData.password) {
								setForm((prev) => ({
									...prev,
									email: { error: false, errorMsg: "" },
									password: { error: false, errorMsg: "" },
								}));

								const loggedIn = await dispatch(loginUserAsync(userData));
								if (loggedIn) {
									history.push("/");
								}
							}
						}}
					>
						Sign In
					</Button>

					<Button
						type="submit"
						fullWidth
						variant="contained"
						style={{ color: "white", background: "#ff5722" }}
						className={classes.submit}
						onClick={async (e) => {
							e.preventDefault();
							const loggedIn = await dispatch(
								loginUserAsync({
									email: "johnnie11@yahoo.com",
									password: "123",
								})
							);
							if (loggedIn) {
								history.push("/");
							}
						}}
					>
						Sign In as Demo User
					</Button>

					<h4 style={{ margin: 0 }}>or</h4>
					<div id="googlediv">
						<GoogleLogin
							clientId="294405923730-goc4l72ko66ds4qjmt7dgdpusu27m5jp.apps.googleusercontent.com"
							render={(renderProps) => (
								<GoogleButton
									// type="light"
									onClick={(e) => {
										renderProps.onClick(e);
									}}
								/>
							)}
							buttonText="Login"
							onSuccess={responseGoogleSuccess}
							onFailure={responseGoogleFailure}
							cookiePolicy={"single_host_origin"}
						/>
					</div>

					<Grid container>
						<Grid item>
							<Link to="/signup" className={classes.link}>
								Don't have an account? Sign Up
							</Link>
						</Grid>
					</Grid>
				</form>
			</div>
		</Container>
	);
}
