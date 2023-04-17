import axios from 'axios';
import {API_BASE} from "../API_BASE";
const POSTS_API = `${API_BASE}/posts`;

export const createPost = async (post) => {
  const response = await axios.post(POSTS_API, post);
  return response.data;
};

export const findAllPosts = async () => {
    const response = await axios.get(POSTS_API);
    const posts = response.data;
    return posts;
};

export const findPostById = async (id) => {
    const response = await axios.get(`${POSTS_API}/${id}`);
    const post = response.data;
    return post;
};

export const deletePost = async (id) => {
    const response = await axios.delete(`${POSTS_API}/${id}`);
    return response.data;
};

export const updatePost = async (post) => {
    const response = await axios.put(`${POSTS_API}/${post._id}`, post);
    return response.data;
};