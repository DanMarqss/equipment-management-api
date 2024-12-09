import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000', // Verificar a disponibilidade da porta na VM
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para tratamento de erros
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);

// Funções para autenticação
export const authApi = {
  login: (username, password) => {
    return api.post('/auth/login', { username, password });
  },
};

// Funções para interagir com o equipamento
export const equipmentApi = {
  // Buscar todos os equipamentos
  getAll: () => api.get('/equipment'),
  
  // Buscar um equipamento específico
  getOne: (id) => api.get(`/equipment/${id}`),
  
  // Criar um novo equipamento
  create: (data) => api.post('/equipment', data),
  
  // Atualizar um equipamento
  update: (id, data) => api.patch(`/equipment/${id}`, data),
  
  // Deletar um equipamento
  delete: (id) => api.delete(`/equipment/${id}`),
};

export default api;