import { createAsyncThunk } from "@reduxjs/toolkit";
import * as service from "./users-service"

// find -- all / by id / by email
export const findAllUsersThunk = createAsyncThunk(
    'users/findAllUsers',
    async () => {
        const users = await service.findAllUsers();
        return users;
    }
);

export const findUserByIdThunk = createAsyncThunk(
    'users/findUserById',
    async (id) => {
        return await service.findUserById(id);
    }
);

export const findUserByEmailThunk = createAsyncThunk(
    'users/findUserByEmail',
    async (email) => {
        return await service.findUserByEmail(email);
    }
);

// delete parcel
export const deleteUserThunk = createAsyncThunk(
    'users/deleteUser',
    async (id) => {
        return await service.deleteUser(id);
    }
);

// update parcel
export const updateUserThunk = createAsyncThunk(
    'users/updateUser',
    async (parcel) => {
        return await service.updateUser(parcel);
    }
);

// Authentication
export const signupThunk = createAsyncThunk(
    "users/signup", async (credentials) => {
        return await service.signup(credentials);
    }
);
export const loginThunk = createAsyncThunk(
    "users/login", async (credentials) => {
        return await service.login(credentials);
    }
);

export const profileThunk = createAsyncThunk(
    "users/profile", async () => {
        return await service.profile();
    });


export const logoutThunk = createAsyncThunk(
    "users/logout", async () => {
        return await service.logout();
    });

// update parcel
export const updateCurrentUserThunk = createAsyncThunk(
    'users/updateCurrentUser',
    async (user) => {
        return await service.updateUser(user);
    }
);

export const changePasswordThunk = createAsyncThunk(
    "users/changePassword", async (credentials) => {
        return await service.changePassword(credentials);
    }
)

export const restoreAuthThunk = createAsyncThunk(
    "users/restoreAuth", async (currentUser) => {
        return currentUser;
    }
);
