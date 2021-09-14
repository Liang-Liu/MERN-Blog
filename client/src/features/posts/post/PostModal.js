import React from "react";
import CardMedia from "@material-ui/core/CardMedia";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";

import "./postModal.css";

function PostModal({ postData }) {
	const { title, description, content, imgURL, user } = postData;

	return (
		<Container maxWidth="lg">
			<div className="productModalContent">
				<Typography
					gutterBottom
					variant="h3"
					id="modal-title"
					color="textPrimary"
				>
					{title}
				</Typography>
				<Typography
					gutterBottom
					variant="h5"
					id="modal-description"
					color="textSecondary"
				>
					{description}
				</Typography>
				<div className="right-align-container">
					<div className="post-details">
						<img src={user.imgURL} id="user-avatar" alt="ImgPreview..." />
						<div>
							<Typography>
								{user?.firstName} {user?.lastName}
							</Typography>
							<Typography color="textSecondary">
								{user?.firstName} {user?.lastName}
							</Typography>
						</div>
					</div>
				</div>
				<CardMedia image={imgURL} title={title} />
				<img className="productModal" src={imgURL} alt="id" id="modal-img" />
				<div className="modelText">
					<Typography gutterBottom variant="h6" id="modal-content">
						{content}
					</Typography>
				</div>
			</div>
		</Container>
	);
}

export default PostModal;
