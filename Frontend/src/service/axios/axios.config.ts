import axios, { AxiosInstance } from 'axios'

// class AxiosWithAuth{
//     private axiosInstance:AxiosInstance;
//     constructor(){
//         this.axiosInstance
//     }
// }

export const axiosWithAuth = axios.create({
    baseURL: "https://duytube-production.up.railway.app/",
    // baseURL:"http://localhost:8080/",
        timeout: 180_000,
});
