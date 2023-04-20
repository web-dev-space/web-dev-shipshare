import { createAsyncThunk } from "@reduxjs/toolkit";
import * as service from "redux/reviews/reviews-service";

export const findAllReviewsThunk = createAsyncThunk(
  "reviews/findAllReviews",
  async () => await service.findAllReviews()
);

export const findReviewByIdThunk = createAsyncThunk(
  "reviews/findReviewById",
  async (id) => {
    const response = await service.findReviewById(id);
    return response;
  }
);

export const createReviewThunk = createAsyncThunk(
  "reviews/createReview",
  async (review) => {
    return await service.createReview(review);
  }
);

export const updateReviewThunk = createAsyncThunk(
  "reviews/updateReview",
  async (review) => {
    return await service.updateReview(review);
  }
);

export const deleteReviewThunk = createAsyncThunk(
  "reviews/deleteReview",
  async (id) => {
    return await service.deleteReview(id);
  }
);

export const findReviewsForProjectThunk = createAsyncThunk(
  "reviews/findReviewsForProject",
  async (asin) => {
    return await service.findReviewsForProject(asin);
  }
);

export const findReviewsByUserIdThunk = createAsyncThunk(
  "reviews/findReviewsByUserId",
  async (userId) => {
    return {
      userId: userId,
      reviews: await service.findReviewsByUserId(userId),
    };
  }
);
