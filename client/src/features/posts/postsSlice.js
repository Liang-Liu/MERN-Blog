import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
const initialState = { posts: [], status: "idle" };

const baseUrl = "http://ll-mern-blog-app.herokuapp.com/";

export const fetchAllPostsAsync = createAsyncThunk(
	"posts/fetchAllPosts",
	async () => {
		const response = await fetch(`${baseUrl}posts`);
		const data = await response.json();
		return data;
	}
);

export const postsSlice = createSlice({
	name: "posts",
	initialState,
	reducers: {},

	extraReducers: (builder) => {
		builder
			.addCase(fetchAllPostsAsync.pending, (state) => {
				state.status = "loading";
			})
			.addCase(fetchAllPostsAsync.fulfilled, (state, action) => {
				state.status = "idle";
				state.posts = action.payload;
			})
			.addCase(fetchAllPostsAsync.rejected, (state, action) => {
				state.status = "rejected";
			});
	},
});

export const createPostAsync = (postObj) => async (dispatch, getState) => {
	const token = JSON.parse(localStorage.getItem("user")).token;
	await fetch(`${baseUrl}posts`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
		body: JSON.stringify(postObj),
	});
	dispatch(fetchAllPostsAsync());
};

export const updatePostAsync = (postObj) => async (dispatch, getState) => {
	const token = JSON.parse(localStorage.getItem("user")).token;

	await fetch(`${baseUrl}posts/${postObj._id}`, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
		body: JSON.stringify(postObj),
	});
	dispatch(fetchAllPostsAsync());
};

export const deletePostAsync = (postObj) => async (dispatch, getState) => {
	const token = JSON.parse(localStorage.getItem("user")).token;

	await fetch(`${baseUrl}posts/${postObj._id}`, {
		method: "DELETE",
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
	dispatch(fetchAllPostsAsync());
};

export default postsSlice.reducer;
