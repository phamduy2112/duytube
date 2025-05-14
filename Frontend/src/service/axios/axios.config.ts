import axios from 'axios'

export const axiosWithAuth = axios.create({
    baseURL: `http://localhost:8080`,
    timeout: 180_000,
});
