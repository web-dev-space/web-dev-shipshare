import axios from 'axios';
import {API_BASE} from "redux/API_BASE";
const REVIEWS_API = `${API_BASE}/reviews`;

export const createReview = async (review) => {
  const response = await axios.review(REVIEWS_API, review);
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
