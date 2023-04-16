import axios from 'axios';

import { API_BASE } from '../API_BASE';
const DASHBOARD_API = `${API_BASE}/stat/`;

export const getStatsMerchant = async () => {
    const response = await axios.get(DASHBOARD_API + 'merchant');
    return response.data;
}

export const getStatsAdmin = async () => {
    const response = await axios.get(DASHBOARD_API + 'admin');
    return response.data;
};
