import axios from 'axios';

const api = axios.create({
  baseURL: 'http://www.ufpe.br',
});

export default api;