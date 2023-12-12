
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';

const apiClient = axios.create({
   withCredentials: false,
  // adding a custom language header   
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Headers': 'content-Type',
  },
});
//setup interceptors here
export default apiClient;