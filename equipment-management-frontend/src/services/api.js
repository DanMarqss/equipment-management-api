import axios from 'axios';

const TOKEN_EXPIRY_TIME = 5 * 60 * 1000; // 5 minutos

const TokenService = {
  getToken: () => sessionStorage.getItem('authToken'),
  setToken: (token) => {
    sessionStorage.setItem('authToken', token);
    sessionStorage.setItem('tokenTimestamp', Date.now().toString());
  },
  removeToken: () => {
    sessionStorage.removeItem('authToken');
    sessionStorage.removeItem('tokenTimestamp');
  },
  isTokenExpired: () => {
    const timestamp = sessionStorage.getItem('tokenTimestamp');
    if (!timestamp) return true;
    return Date.now() - parseInt(timestamp) > TOKEN_EXPIRY_TIME;
  }
};

const api = axios.create({
  baseURL: 'http://localhost',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para adicionar token
api.interceptors.request.use((config) => {
  const token = TokenService.getToken();
  if (token && !TokenService.isTokenExpired()) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Interceptor para tratamento de erros
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      TokenService.removeToken();
      window.location.href = '/login';
    }
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);

export const authApi = {
  login: async (username, password) => {
    const response = await api.post('/auth/login', { username, password });
    TokenService.setToken(response.data.access_token);
    return response;
  },
  logout: () => {
    TokenService.removeToken();
  }
};

export const equipmentApi = {
  getAll: () => api.get('/equipment'),
  getOne: (id) => api.get(`/equipment/${id}`),
  create: (data) => api.post('/equipment', data),
  update: (id, data) => api.patch(`/equipment/${id}`, data),
  delete: (id) => api.delete(`/equipment/${id}`),
};

export { TokenService };
export default api;
