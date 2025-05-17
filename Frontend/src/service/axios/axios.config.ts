import axios, { AxiosInstance } from 'axios'

// class AxiosWithAuth{
//     private axiosInstance:AxiosInstance;
//     constructor(){
//         this.axiosInstance
//     }
// }

export const axiosWithAuth = axios.create({
    baseURL: "http://localhost:8080/",
        timeout: 180_000,
});
