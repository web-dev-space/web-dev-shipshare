import axios from 'axios';

import {API_BASE} from '../API_BASE';

const PRODUCTS_API = `${API_BASE}/products`;

export const getSearchResults = async (searchText) => {
    return await axios.get(`${PRODUCTS_API}/search/${searchText}`)
}

export const getProductDetails = async (asinID) => {
    const response = await axios.get(`${PRODUCTS_API}/details/${asinID}`);
    return response.data;
}