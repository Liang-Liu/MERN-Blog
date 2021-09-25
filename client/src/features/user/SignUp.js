import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import { Link } from "react-router-dom";

import { signUpUserAsync, updateUser } from "./userSlice";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";

import logo from "../../images/logo.jpg";

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
		marginTop: theme.spacing(3),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
	link: {
		textDecoration: "none",
		color: "#1565c0",
		"&:hover": {
			textDecoration: "underline",
		},
	},
}));

export default function SignUp() {
	const [userData, setUserData] = useState({
		imgURL:
			"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
	});
	const [form, setForm] = useState({
		firstName: { error: false, errorMsg: "" },
		lastName: { error: false, errorMsg: "" },
		email: { error: false, errorMsg: "" },
		password: { error: false, errorMsg: "" },
	});
	const dispatch = useDispatch();
	let history = useHistory();
	const classes = useStyles();

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

	function previewFile(e) {
		const file = e.target.files[0];
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onloadend = function (e) {
			console.log(reader.result);
			setUserData((prev) => ({ ...prev, imgURL: reader.result }));
		};
	}

	const handleChange = (e) => {
		setUserData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
	};

	const formValidation = () => {
		if (!userData.firstName) {
			setForm((prev) => ({
				...prev,
				firstName: {
					error: true,
					errorMsg: "firstName can't be empty",
				},
			}));
		} else {
			setForm((prev) => ({
				...prev,
				firstName: { error: false, errorMsg: "" },
			}));
		}
		if (!userData.lastName) {
			setForm((prev) => ({
				...prev,
				lastName: {
					error: true,
					errorMsg: "lastName can't be empty",
				},
			}));
		} else {
			setForm((prev) => ({
				...prev,
				lastName: { error: false, errorMsg: "" },
			}));
		}
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
					Sign up
				</Typography>
				<form className={classes.form} noValidate>
					<Grid container spacing={2}>
						<Grid item xs={12} sm={6}>
							<TextField
								error={form.firstName.error}
								helperText={form.firstName.errorMsg}
								autoComplete="fname"
								name="firstName"
								variant="outlined"
								required
								fullWidth
								id="firstName"
								label="First Name"
								autoFocus
								onChange={handleChange}
								value={userData.firstName}
							/>
						</Grid>
						<Grid item xs={12} sm={6}>
							<TextField
								error={form.lastName.error}
								helperText={form.lastName.errorMsg}
								variant="outlined"
								required
								fullWidth
								id="lastName"
								label="Last Name"
								name="lastName"
								autoComplete="lname"
								onChange={handleChange}
								value={userData.lastName}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								error={form.email.error}
								helperText={form.email.errorMsg}
								variant="outlined"
								required
								fullWidth
								id="email"
								label="Email Address"
								name="email"
								autoComplete="email"
								onChange={handleChange}
								value={userData.email}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								error={form.password.error}
								helperText={form.password.errorMsg}
								variant="outlined"
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
						</Grid>
						<Grid item xs={12}>
							<div>
								<img src={userData.imgURL} height="200" alt="ImgPreview..." />
								<div>
									<Button
										className={classes.button}
										variant="contained"
										component="label"
										size="small"
										startIcon={<CloudUploadIcon />}
									>
										Upload image
										<input
											id="imgURL"
											type="file"
											hidden
											onChange={(e) => {
												previewFile(e);
											}}
										/>
									</Button>
								</div>
							</div>
						</Grid>
					</Grid>

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
							if (
								validateEmail(userData.email) &&
								userData.password &&
								userData.firstName &&
								userData.lastName
							) {
								const loggedIn = await dispatch(signUpUserAsync(userData));
								if (loggedIn) {
									history.push("/");
								}
							}
						}}
					>
						Sign Up
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

					<Grid container justifyContent="flex-end">
						<Grid item>
							<Link to="/login" className={classes.link}>
								Already have an account? Sign in
							</Link>
						</Grid>
					</Grid>
				</form>
			</div>
		</Container>
	);
}
