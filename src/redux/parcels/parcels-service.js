import axios from 'axios';

import { API_BASE, TRACKTRY_API_KEY } from '../API_BASE';
const PARCELS_API = `${API_BASE}/parcels`;

export const createParcel = async (parcel) => {
    const response = await axios.post(PARCELS_API, parcel);
    return response.data;
}

export const findAllParcels = async () => {
    const response = await axios.get(PARCELS_API);
    const parcels = response.data;
    return parcels;
}

export const findParcelById = async (id) => {
    const response = await axios.get(`${PARCELS_API}/${id}`);
    const parcel = response.data;
    return parcel;
}

export const findParcelByTrackingNumber = async (trackingNumber) => {
    const response = await axios.get(`${PARCELS_API}/trackingNumber/${trackingNumber}`);
    const parcel = response.data;
    return parcel;
}

export const deleteParcel = async (id) => {
    const response = await axios.delete(`${PARCELS_API}/${id}`);
    return response.data;
}

export const updateParcel = async (parcel) => {
    const id = parcel._id;
    const response = await axios.put(`${PARCELS_API}/${id}`, parcel);
    return response.data;
}

export const getParcelTracking = async ({ trackingNumber, courier }) => {
    try {
        const options = {
            method: 'GET',
            url: `${API_BASE}/tracking/trackings/${courier}/${trackingNumber}`,
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
