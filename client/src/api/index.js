import axios from "axios";

export const BASE_URL = 'http://localhost:5005/';

export const ENDPOINTS = {
    product: 'product',
}

export const createAPIEndpoint = endpoint => {
    let url = BASE_URL + 'api/' + endpoint;
    return {
        fetch: (search, pageNumber) => axios.get(url, search, pageNumber),
        fetchById: id => axios.get(url + '/' + id),
        post: newRecord => axios.post(url, newRecord)
    }
}