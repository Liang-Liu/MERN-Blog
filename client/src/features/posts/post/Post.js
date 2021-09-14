import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import { editData } from "../../form/formSlice";
import { deletePostAsync } from "../postsSlice";
import PostModal from "./PostModal";

import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import Typography from "@material-ui/core/Typography";

import { makeStyles } from "@material-ui/core/styles";
import "./post.css";

import Modal from "react-modal";

const useStyles = makeStyles((theme) => ({
	card: {
		height: "100%",
		display: "flex",
		flexDirection: "column",
	},
	cardMedia: {
		paddingTop: "56.25%", // 16:9
	},
	cardContent: {
		flexGrow: 1,
	},
	iconBtn: {
		"&:hover": {
			color: "#000",
		},
	},
}));

function Post({ postData }) {
	const loggedInUser = useSelector((state) => state.user.loggedInUserData);
	const [showModal, setShowModal] = useState(false);
	const dispatch = useDispatch();
	let history = useHistory();
	const classes = useStyles();

	const handleShowModal = () => {
		setShowModal(true);
	};
	const handleCloseModal = () => {
		setShowModal(false);
	};

	const { title, description, imgURL, user } = postData;
	return (
		<>
			<Card className={classes.card}>
				<div
					onClick={() => {
						handleShowModal();
					}}
					className="container_card"
				>
					<CardMedia
						className={classes.cardMedia}
						image={imgURL}
						title={title}
						id="post_img"
					/>
				</div>

				<CardContent className={classes.cardContent}>
					<Typography gutterBottom variant="h5" component="h2" id="post-title">
						{title}
					</Typography>
					<Typography>{description}</Typography>
				</CardContent>

				<div className="post-footer">
					<div className="post-details">
						<img src={user?.imgURL} id="user-avatar" alt="user" />
						<div>
							<Typography>
								{user?.firstName} {user?.lastName}
							</Typography>
						</div>
					</div>
					<CardActions>
						{loggedInUser?._id === user?._id && (
							<>
								<IconButton
									className={classes.iconBtn}
									aria-label="upload picture"
									component="span"
									size="small"
									onClick={(e) => {
										dispatch(editData(postData));
										history.push("/post");
									}}
								>
									<EditIcon />
								</IconButton>

								<IconButton
									className={classes.iconBtn}
									aria-label="upload picture"
									component="span"
									size="small"
									onClick={(e) => {
										dispatch(deletePostAsync(postData));
									}}
								>
									<DeleteIcon />
								</IconButton>
							</>
						)}
					</CardActions>
				</div>
			</Card>

			<Modal isOpen={showModal} ariaHideApp={false}>
				<section>
					<div className="right-align-container">
						<IconButton
							// color="primary"
							className={classes.iconBtn}
							aria-label="upload picture"
							component="span"
							onClick={() => {
								handleCloseModal();
							}}
						>
							<CloseIcon />
						</IconButton>
					</div>

					<PostModal postData={postData} />
				</section>
			</Modal>
		</>
	);
}

export default Post;
