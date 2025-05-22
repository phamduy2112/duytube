import axios, { AxiosInstance } from 'axios'

// class AxiosWithAuth{
//     private axiosInstance:AxiosInstance;
//     constructor(){
//         this.axiosInstance
//     }
// }

export const axiosWithAuth = axios.create({
    baseURL: "https://05ac-123-21-155-211.ngrok-free.app/",
        timeout: 180_000,
});