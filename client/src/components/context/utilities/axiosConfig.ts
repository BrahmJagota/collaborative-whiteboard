// import axios from 'axios';
// import { useAuthContext } from '../AuthContext';
// const { refreshToken } = useAuthContext();
// const instance = axios.create({
//   baseURL: '/api',
// });

// instance.interceptors.request.use(async (config) => {
//   const token = localStorage.getItem('token');
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// }, (error) => {
//   return Promise.reject(error);
// });

// instance.interceptors.response.use((response) => {
//   return response;
// }, async (error) => {
//   const originalRequest = error.config;
//   if (error.response.status === 401 && !originalRequest._retry) {
//     originalRequest._retry = true;
//     const newToken = await refreshToken();
//     if (newToken) {
//       axios.defaults.headers.common['Authorization'] = 'Bearer ' + newToken;
//       return axios(originalRequest);
//     }
//   }
//   return Promise.reject(error);
// });

// export default instance;

export const hello = "hello";