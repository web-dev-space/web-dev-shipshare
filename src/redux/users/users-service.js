import axios from 'axios';
import {API_BASE} from '../API_BASE';

const USERS_URL = `${API_BASE}/users`;
const AUTH_URL = `${API_BASE}/auth`;

// User API
export const findAllUsers = async () => {
    const response = await axios.get(USERS_URL);
    return response.data;
}

export const findUserById = async (id) => {
    const response = await axios.get(`${USERS_URL}/${id}`);
    return response.data;
}

export const findUserByEmail = async (emailToFind) => {
    const response = await axios.get(`${USERS_URL}/email/${emailToFind}`);
    return response.data;
}

export const deleteUser = async (id) => {
    const response = await axios.delete(`${USERS_URL}/${id}`);
    return response.data;
}

export const updateUser = async (newUser) => {
    const id = newUser._id;
    const response = await axios.put(`${USERS_URL}/${id}`, newUser);
    return response.data;
}

// Authentication API
const api = axios.create({ withCredentials: true });

export const login = async ({ email, password }) => {
    const response = await api.post(`${AUTH_URL}/login`, {
        email,
        password,
    });
    return response.data;
};


export const signup = async ({ name, email, password, role, company, following}) => {
    const data = role === 'buyer' ? {name, email, password, role, following}
        : {name, email, password, role, company};
    const response = await api.post(`${AUTH_URL}/signup`, data);
    return response.data;
}

export const logout = async () => {
    const response = await api.post(`${AUTH_URL}/logout`);
    return response.data;
};


export const profile = async () => {
    axios.defaults.withCredentials = true;
    const response = await api.post(`${AUTH_URL}/profile`);
    return response.data;
};

export const changePassword = async ({oldPassword, newPassword}) => {
    const response = await api.put(`${AUTH_URL}/changePassword`, {
        oldPassword,
        newPassword
    });
    return response.data;
}

export const updateCurrentUser = async (newUser) => {
    const response = await axios.put(`${AUTH_URL}/update`, newUser);
    return response.data;
}
