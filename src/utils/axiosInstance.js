import axios from "axios";
import { BASE_URL } from "./apipath";

const axiosInstance = axios.create({
    baseURL: BASE_URL,
   timeout:10000,
   headers: {
       "Content-Type": "application/json",
       Accept: "application/json",
   },
});

// Request interceptor 
  axiosInstance.interceptors.request.use(
    (config) => {
        const accessToken = localStorage.getItem("accessToken");
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor
axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {

        // Handle 401 Unauthorized errors
        if (error.response) {
            if(error.response.status === 401) {
                // you can redirect to login page or show a notification
                
                window.location.href = "/login";
            }else if(error.response.status === 500){
                console.error("Server Error , Please try again letter");
            }
        }else if(error.code === "ECONNABORTED"){
            console.error("Request timed out. Please try again.");
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;