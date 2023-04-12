import axios from "axios";

import {API_BASE} from '../API_BASE';
const GROUPS_API = `${API_BASE}/groups`;

export const createGroup = async (group) => {
    const response = await axios.post(GROUPS_API, group);
    return response.data;
}

export const findAllGroups = async () => {
    const response = await axios.get(GROUPS_API);
    const groups = response.data;
    return groups;
}

export const findGroupById = async (id) => {
    const response = await axios.get(`${GROUPS_API}/${id}`);
    const group = response.data;
    return group;
}

export const findGroupByName = async (name) => {
    const response = await axios.get(`${GROUPS_API}/name/${name}`);
    const group = response.data;
    return group;
}

export const deleteGroup = async (id) => {
    const response = await axios.delete(`${GROUPS_API}/${id}`);
    return response.data;
}

export const updateGroup = async (group) => {
    const id = group._id;
    const response = await axios.put(`${GROUPS_API}/${id}`, group);
    return response.data;
}