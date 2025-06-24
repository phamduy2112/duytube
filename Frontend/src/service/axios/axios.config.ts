import axios, { AxiosInstance } from 'axios'

// class AxiosWithAuth{
//     private axiosInstance:AxiosInstance;
//     constructor(){
//         this.axiosInstance
//     }
// }

export const axiosWithAuth = axios.create({
    // baseURL: "localhost:8080/",
    baseURL:"https://duytube.onrender.com/",
        timeout: 180_000,
});
