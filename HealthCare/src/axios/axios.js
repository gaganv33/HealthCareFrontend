import axios from "axios";

const axiosInstance = axios.create({
   baseURL: 'http://localhost:8080/',
   headers: {
     'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
      withCredentials: true
   },
});

axiosInstance.interceptors.request.use(request => {
      const access_token = localStorage.getItem('access_token').slice(1, -1);
      console.log(access_token)
      if (access_token) {
      request.headers['Authorization'] = `Bearer ${access_token}`;
      }
      return request;
   }, error => {
   return Promise.reject(error);
   }
);

export { axiosInstance }
