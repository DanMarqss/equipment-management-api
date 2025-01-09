import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

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
    
    const TOKEN_EXPIRY_TIME = 5 * 60 * 1000; // 5 minutos em millisegundos
    return Date.now() - parseInt(timestamp) > TOKEN_EXPIRY_TIME;
  }
};

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = TokenService.getToken();
    if (token && !TokenService.isTokenExpired()) {
      navigate('/HomePage');
    }
  }, [navigate]);

  useEffect(() => {
    const handleBeforeUnload = () => {
      TokenService.removeToken();
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch('http://179.191.232.25:4000/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
  
      if (response.ok) {
        const { access_token } = await response.json();
        TokenService.setToken(access_token);
        navigate('/');
      } else {
        console.error('Erro de login:', response.status);
      }
    } catch (error) {
      console.error('Erro ao fazer login:', error);
    }
  };
   
  return (
    <div className="flex items-center justify-center h-screen">
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-md">
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="username">
            Usuário
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="username"
            type="text"
            placeholder="Usuário"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="password">
            Senha
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Entrar
          </button>
        </div>
      </form>
    </div>
  );
};

export const useAuthProtection = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = () => {
      if (!TokenService.getToken() || TokenService.isTokenExpired()) {
        TokenService.removeToken();
        navigate('/login');
      }
    };

    checkAuth();
    const interval = setInterval(checkAuth, 30000); // Verifica a cada 30 segundos
    return () => clearInterval(interval);
  }, [navigate]);
};

export default LoginPage;