import axios from 'axios';

const api = axios.create({
  baseURL: 'https://www.ufpe.br',
});

export default api;