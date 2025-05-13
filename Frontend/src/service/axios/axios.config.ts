import axios from 'axios'

export const axiosWithAuth = axios.create({
    baseURL: `localhost:3000/`,
    timeout: 180_000,
});
