import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import { createPostAsync, updatePostAsync } from "../posts/postsSlice";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { dataChange, clearData } from "./formSlice";

import DeleteIcon from "@material-ui/icons/Delete";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import SendIcon from "@material-ui/icons/Send";
import CancelIcon from "@material-ui/icons/Cancel";

const useStyles = makeStyles((theme) => ({
	root: {
		"& .MuiTextField-root": {
			margin: theme.spacing(1),
			width: "50ch",
		},
	},
	button: {
		margin: theme.spacing(1),
	},
	largeButton: {
		marginTop: theme.spacing(1),
		marginBottom: theme.spacing(3),
	},
}));

function Form() {
	const formData = useSelector((state) => state.form.formData);
	const [form, setForm] = useState({
		title: { error: false, errorMsg: "" },
		description: { error: false, errorMsg: "" },
	});
	const user = useSelector((state) => state.user.loggedInUserData);

	const dispatch = useDispatch();
	let history = useHistory();

	const classes = useStyles();

	function previewFile(e) {
		const file = e.target.files[0];
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onloadend = function (e) {
			dispatch(dataChange({ key: "imgURL", value: reader.result }));
		};
	}

	const formValidation = () => {
		if (!formData.title) {
			setForm((prev) => ({
				...prev,
				title: {
					error: true,
					errorMsg: "title can't be empty",
				},
			}));
		} else {
			setForm((prev) => ({
				...prev,
				title: { error: false, errorMsg: "" },
			}));
		}
		if (!formData.description) {
			setForm((prev) => ({
				...prev,
				description: {
					error: true,
					errorMsg: "description can't be empty",
				},
			}));
		} else {
			setForm((prev) => ({
				...prev,
				description: { error: false, errorMsg: "" },
			}));
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		// Form Validation=============================
		formValidation();
		// Submit Form====================================
		if (formData.title && formData.description) {
			await dispatch(createPostAsync({ formData: formData, user: user }));
			history.push("/");
			dispatch(clearData());
		}
	};

	return (
		<div>
			<form
				className={classes.root}
				noValidate
				autoComplete="off"
				onSubmit={handleSubmit}
			>
				<div>
					<TextField
						error={form.title.error}
						helperText={form.title.errorMsg}
						id="title"
						label="Title"
						fullWidth
						value={formData.title}
						onChange={(e) => {
							dispatch(dataChange({ key: e.target.id, value: e.target.value }));
						}}
					/>
				</div>
				<div>
					<TextField
						error={form.description.error}
						helperText={form.description.errorMsg}
						id="description"
						label="Description"
						multiline
						rows={2}
						value={formData.description}
						variant="outlined"
						onChange={(e) => {
							dispatch(dataChange({ key: e.target.id, value: e.target.value }));
						}}
					/>
				</div>
				<div>
					<TextField
						id="author"
						label="Author"
						disabled
						value={`${user.firstName} ${user.lastName}`}
						fullWidth
					/>
				</div>
				<div>
					<TextField
						id="content"
						label="Content"
						multiline
						minRows={8}
						maxRows={25}
						variant="outlined"
						value={formData.content}
						onChange={(e) => {
							dispatch(dataChange({ key: e.target.id, value: e.target.value }));
						}}
					/>
				</div>
				<div>
					<img src={formData.imgURL} height="200" alt="ImgPreview..." />
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

				<div>
					<Button
						className={classes.largeButton}
						variant="contained"
						component="label"
						size="small"
						startIcon={<DeleteIcon />}
						onClick={(e) => {
							dispatch(clearData());
						}}
					>
						Clear All
					</Button>
				</div>

				<div>
					{formData._id ? (
						<Button
							className={classes.button}
							variant="contained"
							component="label"
							startIcon={<SendIcon />}
							color="primary"
							size="large"
							onClick={(e) => {
								dispatch(updatePostAsync(formData));
								dispatch(clearData());
								history.push("/");
							}}
						>
							Update
						</Button>
					) : (
						<Button
							className={classes.button}
							variant="contained"
							component="label"
							startIcon={<SendIcon />}
							color="primary"
							size="large"
						>
							Submit
							<input type="submit" hidden value="Submit"></input>
						</Button>
					)}
				</div>

				<div>
					<Button
						className={classes.button}
						variant="contained"
						component="label"
						onClick={(e) => {
							dispatch(clearData());
							history.push("/");
						}}
						startIcon={<CancelIcon />}
						color="secondary"
					>
						Cancel
					</Button>
				</div>
			</form>
		</div>
	);
}

export default Form;
