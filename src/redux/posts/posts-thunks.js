import {createAsyncThunk}  from "@reduxjs/toolkit";
import * as service from "./posts-service";

export const findAllPostsThunk = createAsyncThunk(
  "posts/findAllPosts",
  async () =>  await service.findAllPosts()
);

export const findPostByIdThunk = createAsyncThunk(
  "posts/findPostById",
  async (id) => {
    const response = await service.findPostById(id);
    return response;
  }
);

export const createPostThunk = createAsyncThunk(
  "posts/createPost",
  async (post) => {
    return await service.createPost(post);
  }
);

export const updatePostThunk = createAsyncThunk(
  "posts/updatePost",
  async (id) => {
    const response = await service.updatePost(id);
    return response.data;
  }
);

export const deletePostThunk = createAsyncThunk(
  "posts/deletePost",
  async (id) => {
    const response = await service.deletePost(id);
    return response.data;
  }
);