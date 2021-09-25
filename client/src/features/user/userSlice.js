import { createSlice } from "@reduxjs/toolkit";
import { baseUrl } from "../../util/url";

const initialState = { loggedInUserData: {} };

const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		updateUser: (state, action) => {
			const data = action.payload;
			localStorage.setItem("user", JSON.stringify(data));
			state.loggedInUserData = action.payload.existingUser;
		},
		signOut: (state, action) => {
			localStorage.removeItem("user");
			state.loggedInUserData = initialState.loggedInUserData;
		},
	},
});

export const loginUserAsync = (userData) => async (dispatch) => {
	const res = await fetch(`${baseUrl}user/signin`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(userData),
	});

	const data = await res.json();

	if (data.existingUser) {
		dispatch(updateUser(data));
		return true;
	} else {
		alert(data.msg);
		return false;
	}
};

export const signUpUserAsync = (userData) => async (dispatch) => {
	const res = await fetch(`${baseUrl}user/signup`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(userData),
	});
	const data = await res.json();

	if (data.existingUser) {
		dispatch(updateUser(data));
		return true;
	} else {
		alert(data.msg);
		return false;
	}
};

export const { updateUser, signOut } = userSlice.actions;

export default userSlice.reducer;
