import axios, { AxiosInstance } from 'axios'

// class AxiosWithAuth{
//     private axiosInstance:AxiosInstance;
//     constructor(){
//         this.axiosInstance
//     }
// }

export const axiosWithAuth = axios.create({
    baseURL: "https://duytube-production.up.railway.app/",
        timeout: 180_000,
});