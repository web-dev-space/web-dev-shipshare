import axios from 'axios';

import { API_BASE } from '../API_BASE';
const PARCELS_API = `${API_BASE}/parcels`;
const TRACKING_API = `${API_BASE}/trackParcels`;

export const createParcel = async (parcel) => {
    const response = await axios.post(PARCELS_API, parcel);
    // While creating a parcel, we also need to create a tracking for it
    await postNewTracking(
        {
            trackingNumber: parcel.trackingNumber,
            courier: parcel.courier
        }).then(r => console.log("tracking created", r)).catch(e => console.error("error in creating tracking", e));
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
    const response = await axios.get(`${TRACKING_API}/${courier}/${trackingNumber}`);

    return { trackingNumber, trackingDetail: response.data.data[0] };
}

export const postNewTracking = async ({trackingNumber, courier}) => {
    return await axios.post(`${TRACKING_API}/tracking`, {trackingNumber, courier});
}

export const getParcelByShipGroupId = async (shipGroupId) => {
    const response = await axios.get(`${PARCELS_API}?shipGroupId=${shipGroupId}`);
    const parcels = response.data;
    return parcels;
}

export const getParcelByShipGroupIdAndUserEmail = async (shipGroupId, userEmail) => {
    const response = await axios.get(`${PARCELS_API}?shipGroupId=${shipGroupId}&userEmail=${userEmail}`);
    const parcels = response.data;
    return parcels;
}
