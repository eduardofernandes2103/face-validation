import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL
});

api.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

export default api;
