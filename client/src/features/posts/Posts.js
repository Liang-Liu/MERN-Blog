import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Post from "./post/Post";
import { fetchAllPostsAsync } from "../posts/postsSlice";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles((theme) => ({
	grid: {
		paddingTop: theme.spacing(8),
		paddingBottom: theme.spacing(8),
	},
	cardGrid: {
		minHeight: "100%",
		// backgroundColor: "black",
	},
	circularProgress: {
		display: "flex",
		"& > * + *": {
			marginLeft: theme.spacing(2),
		},
	},
}));

function Posts() {
	const posts = useSelector((state) => state.posts);
	const status = useSelector((state) => state.posts.status);
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(fetchAllPostsAsync());
	}, [dispatch]);

	const classes = useStyles();

	if (status === "loading") {
		return (
			<div className={classes.root}>
				<CircularProgress />
			</div>
		);
	}

	return (
		<div>
			<main>
				<Container className={classes.grid} maxWidth="lg">
					<Grid container spacing={4}>
						{posts.posts.map((ele) => (
							<Grid item xs={12} sm={6} md={4} key={ele._id}>
								<Post postData={ele} />
							</Grid>
						))}
					</Grid>
				</Container>
			</main>
		</div>
	);
}

export default Posts;
