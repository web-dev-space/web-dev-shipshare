import { createSlice } from '@reduxjs/toolkit';
import {
    findAllReviewsThunk,
    createReviewThunk,
    updateReviewThunk,
    deleteReviewThunk,
    findReviewByIdThunk
} from "redux/reviews/reviews-thunks.js";

const initialState = {
    reviews: [],
    loading: false,
}

const templateReview = {
    title: 'new review',
    body: 'review body',
    userId: 1,
}

const reviewsSlice = createSlice({
    name: 'reviews',
    initialState,
    extraReducers: {
        [findAllReviewsThunk.pending]: (state) => {
            state.loading = true;
            state.reviews = [];
        },
        [findAllReviewsThunk.fulfilled]: (state, { payload }) => {
            state.loading = false;
            state.reviews = payload;
        },
        [findAllReviewsThunk.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.error;
        },
        [deleteReviewThunk.fulfilled]: (state, { payload }) => {
            state.reviews = state.reviews.filter(review => review._id !== payload);
        },
        [createReviewThunk.fulfilled]: (state, { payload }) => {
            state.loading = false;
            state.reviews.push(payload);
        },
        [findReviewByIdThunk.fulfilled]: (state, { payload }) => {
            state.loading = false;
            const index = state.reviews.findIndex(review => review._id === payload._id);
            if (index === -1) {
                state.reviews.push(payload);
            } else {
                state.reviews[index] = {
                    ...state.reviews[index],
                    ...payload,
                };
            }
            console.log(state.reviews);
        },
        [updateReviewThunk.fulfilled]: (state, { payload }) => {
            state.loading = false;
            console.log(payload);
            const index = state.reviews.findIndex(review => review._id === payload._id);
            state.reviews[index] = {
                ...state.reviews[index],
                ...payload,
            };
        },
    },
    reducers: {}
});

export default reviewsSlice.reducer;
