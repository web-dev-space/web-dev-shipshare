import axios from 'axios';

import {API_BASE} from '../API_BASE';
const SHIPGROUPS_API = `${API_BASE}/shipGroups`;

export const createShipGroup = async (shipGroup) => {
    const response = await axios.post(SHIPGROUPS_API, shipGroup);
    return response.data;
}

export const findAllShipGroups = async () => {
    console.debug("SHIPGROUPS_API: ", SHIPGROUPS_API);
    const response = await axios.get(SHIPGROUPS_API);
    const shipGroups = response.data;
    console.debug("findAllShipGroups() response.data: ", response.data);
    return shipGroups;
}

export const findShipGroupById = async (id) => {
    const response = await axios.get(`${SHIPGROUPS_API}/${id}`);
    const shipGroup = response.data;
    return shipGroup;
}

export const findShipGroupByTrackingNumber = async (trackingNumber) => {
    const response = await axios.get(`${SHIPGROUPS_API}/trackingNumber/${trackingNumber}`);
    const shipGroup = response.data;
    return shipGroup;
}

export const deleteShipGroup = async (id) => {
    const response = await axios.delete(`${SHIPGROUPS_API}/${id}`);
    return response.data;
}

export const updateShipGroup = async (shipGroup) => {
    const id = shipGroup._id;
    const response = await axios.put(`${SHIPGROUPS_API}/${id}`, shipGroup);
    return response.data;
}