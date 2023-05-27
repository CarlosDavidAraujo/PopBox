import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://localhost:3002' //coloquem aqui a mesma porta que está rodando o servidor do express
});

