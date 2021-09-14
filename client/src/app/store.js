import { configureStore } from "@reduxjs/toolkit";
import postsReducer from "../features/posts/postsSlice";
import formReducer from "../features/form/formSlice";
import userReducer from "../features/user/userSlice";

export const store = configureStore({
	reducer: {
		posts: postsReducer,
		form: formReducer,
		user: userReducer,
	},
});
