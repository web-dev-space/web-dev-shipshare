import axios from 'axios';
import { API_BASE } from '../API_BASE';
const WAREHOUSE_API = `${API_BASE}/warehouse`;

export const createWarehouse = async (warehouse) => {
    const response = await axios.post(WAREHOUSE_API, warehouse);
    return response.data;
}

export const findAllWarehouses = async () => {
    const response = await axios.get(WAREHOUSE_API);
    return response.data;
}

export const findWarehouseById = async (id) => {
    const response = await axios.get(`${WAREHOUSE_API}/${id}`);
    return response.data;
}

export const findWarehouseByCompany = async (company) => {
    const response = await axios.get(`${WAREHOUSE_API}/company/${company}`);
    return response.data;
}

export const updateWarehouse = async (newWarehouse) => {
    const id = newWarehouse._id;
    const response = await axios.put(`${WAREHOUSE_API}/${id}`, newWarehouse);
    return response.data;
}

export const deleteWarehouse = async (id) => {
    const response = await axios.delete(`${WAREHOUSE_API}/${id}`);
    return response.data;
}