import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import EquipamentosPage from './pages/EquipamentosPage';
import EquipamentoFormPage from './pages/EquipamentoFormPage';
import EquipamentoViewPage from './pages/EquipamentoViewPage';
import Sidebar from './components/Sidebar';

const PrivateRoute = ({ children }) => {
  const isAuthenticated = !!localStorage.getItem('authToken');
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

const ProtectedLayout = () => {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 overflow-auto bg-gray-50">
        <Routes>
          <Route index element={<HomePage />} />
          <Route path="equipamentos" element={<EquipamentosPage />} />
          <Route path="equipamentos/novo" element={<EquipamentoFormPage />} />
          <Route path="equipamentos/:id" element={<EquipamentoViewPage />} />
        </Routes>
      </div>
    </div>
  );
};

const App = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/*"
        element={
          <PrivateRoute>
            <ProtectedLayout />
          </PrivateRoute>
        }
      />
    </Routes>
  );
};

export default App;