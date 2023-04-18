import axios from 'axios';

import { API_BASE, TRACKTRY_API_KEY } from '../API_BASE';
const PARCELS_API = `${API_BASE}/parcels`;

export const createParcel = async (parcel) => {
    const response = await axios.post(PARCELS_API, parcel);
    // While creating a parcel, we also need to create a tracking for it
    postNewTracking(
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

export const postNewTracking = async ({ trackingNumber, courier }) => {
    try {
        const options = {
            method: 'POST',
            url: `https://api.tracktry.com/v1/trackings/post`,
            headers: {
                'Content-Type': 'application/json',
                'Tracktry-Api-Key': TRACKTRY_API_KEY
            },
            data: {
                tracking_number: trackingNumber,
                carrier_code: courier
            }
        };

        return await axios.request(options);
    } catch (error) {
        console.error(error)
        console.error(error?.response?.data)
    }
}

export const getParcelByShipGroupId = async (shipGroupId) => {
    console.debug("get url", `${PARCELS_API}?shipGroupId=${shipGroupId}`)
    const response = await axios.get(`${PARCELS_API}?shipGroupId=${shipGroupId}`);
    const parcels = response.data;
    console.debug("getParcelByShipGroupId", parcels);
    return parcels;
}

export const getParcelByShipGroupIdAndUserEmail = async (shipGroupId, userEmail) => {
    const response = await axios.get(`${PARCELS_API}?shipGroupId=${shipGroupId}&userEmail=${userEmail}`);
    const parcels = response.data;
    return parcels;
}
