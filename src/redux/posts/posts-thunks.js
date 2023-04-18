import {createAsyncThunk} from "@reduxjs/toolkit";
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
  async (post) => {
      return await service.updatePost(post);
  }
);

export const deletePostThunk = createAsyncThunk(
  "posts/deletePost",
  async (id) => {
      return await service.deletePost(id);
  }
);