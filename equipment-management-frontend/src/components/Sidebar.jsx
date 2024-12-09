import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Package } from 'lucide-react';

const Sidebar = () => {
  return (
    <div className="w-64 h-screen bg-gray-900 text-white p-6">
      <h1 className="text-3xl font-bold mb-10">Axes</h1>
      <nav>
        <Link to="/" className="flex items-center mb-4 hover:text-blue-400">
          <Home className="mr-2" /> Home
        </Link>
        <Link to="/equipamentos" className="flex items-center mb-4 hover:text-blue-400">
          <Package className="mr-2" /> Equipamentos
        </Link>
      </nav>
    </div>
  );
};

export default Sidebar;