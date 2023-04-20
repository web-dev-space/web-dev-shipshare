import axios from 'axios';
import { API_BASE } from "redux/API_BASE";
const REVIEWS_API = `${API_BASE}/reviews`;

export const createReview = async (review) => {
  if (!review.asin)
    throw new Error('Review must have a project id (asin)');

  if (!review.user)
    throw new Error('Review must have a user');

  const response = await axios.post(REVIEWS_API, review);
  return response.data;
};

export const findAllReviews = async () => {
  const response = await axios.get(REVIEWS_API);
  const reviews = response.data;
  return reviews;
};

export const findReviewById = async (id) => {
  const response = await axios.get(`${REVIEWS_API}/${id}`);
  const review = response.data;
  return review;
};

export const deleteReview = async (id) => {
  const response = await axios.delete(`${REVIEWS_API}/${id}`);
  return response.data;
};

export const updateReview = async (review) => {
  const response = await axios.put(`${REVIEWS_API}/${review._id}`, review);
  return response.data;
};

export const findReviewsForProject = async (asin) => {
  const response = await axios.get(`${REVIEWS_API}/project/${asin}`);
  const reviews = response.data;
  return reviews;
};

export const findReviewsByUserId = async (userId) => {
  const response = await axios.get(`${REVIEWS_API}?userId=${userId}`);
  const reviews = response.data;
  return reviews;
};
