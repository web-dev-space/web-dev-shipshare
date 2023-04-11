import axios from 'axios';

import {API_BASE} from '../API_BASE';
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
    const id = parcel.id;
    const response = await axios.put(`${PARCELS_API}/${id}`, parcel);
    return response.data;
}