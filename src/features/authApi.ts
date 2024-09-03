import axios from 'axios';

export const loginApi = async (username: string, password: string) => {
  const response = await axios.post('/api/users?login', { username, password });
  return response.data;
};

export const registerApi = async (username: string, password: string) => {
  const response = await axios.post('/api/users?register', { username, password });
  return response.data;
};