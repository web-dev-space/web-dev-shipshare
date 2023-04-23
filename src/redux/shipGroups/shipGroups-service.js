import axios from 'axios';

import { API_BASE, TRACKTRY_API_KEY } from '../API_BASE';
const SHIPGROUPS_API = `${API_BASE}/shipGroups`;
const TRACKING_API = `${API_BASE}/trackParcels`;

export const createShipGroup = async (shipGroup) => {
    const response = await axios.post(SHIPGROUPS_API, shipGroup);
    return response.data;
}

export const findAllShipGroups = async () => {

    const response = await axios.get(SHIPGROUPS_API);
    const shipGroups = response.data;
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

export const updateShipGroup = async (shipGroup, shipGroupBeforeUpdate) => {
    const id = shipGroup._id;
    const response = await axios.put(`${SHIPGROUPS_API}/${id}`, shipGroup);

    if (shipGroup.trackingNumber !== shipGroupBeforeUpdate.trackingNumber) {
        await postNewTracking({trackingNumber: shipGroup.trackingNumber, courier: 'dhl'});
    }
    return response.data;
}

export const getShipmentTracking = async ({ trackingNumber, courier = 'dhl' }) => {
    try {
        if (!trackingNumber) {
            console.error("getShipmentTracking: missing trackingNumber");
        }

        const options = {
            method: 'GET',
            url: `${API_BASE}/trackParcels/${courier}/${trackingNumber}`,
            headers: {
                'Content-Type': 'application/json',
                'Tracktry-Api-Key': TRACKTRY_API_KEY
            }
        };

        const response = await axios.request(options);

        return { trackingNumber, trackingDetail: response.data.data[0] };
    } catch (error) {
        console.error("error in getParcelTracking", error, error?.response?.data);
        throw error;
    }
}

export const postNewTracking = async ({trackingNumber, courier}) => {
    return await axios.post(`${TRACKING_API}/tracking`, {trackingNumber, courier});
}
