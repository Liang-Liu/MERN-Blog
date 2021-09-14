import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	formData: {
		author: "",
		title: "",
		description: "",
		content: "",
		imgURL:
			"https://cdn.pixabay.com/photo/2017/11/10/04/47/image-2935360_960_720.png",
	},
};

export const formSlice = createSlice({
	name: "form",
	initialState,
	reducers: {
		dataChange: (state, action) => {
			state.formData = {
				...state.formData,
				[action.payload.key]: action.payload.value,
			};
		},
		editData: (state, action) => {
			state.formData = action.payload;
		},
		clearData: (state) => {
			state.formData = initialState.formData;
		},
	},
});

export const { dataChange, editData, clearData } = formSlice.actions;

export default formSlice.reducer;
