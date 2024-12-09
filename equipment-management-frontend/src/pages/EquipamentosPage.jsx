import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, Pencil, Trash2 } from 'lucide-react';
import { format } from 'date-fns';
import api from '../services/api';

export default function EquipamentosPage() {
  const navigate = useNavigate();
  const [equipments, setEquipments] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(15);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchEquipments();
  }, [currentPage]);

  const fetchEquipments = async () => {
    try {
      const response = await api.get(`/equipment?page=${currentPage}&limit=${itemsPerPage}`);
      setEquipments(response.data);
    } catch (error) {
      console.error('Erro ao buscar equipamentos:', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Deseja realmente excluir este equipamento?')) {
      try {
        await api.delete(`/equipment/${id}`);
        fetchEquipments();
      } catch (error) {
        console.error('Erro ao deletar equipamento:', error);
      }
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Equipamentos</h1>
        <div className="flex gap-4">
          <input
            type="text"
            placeholder="Pesquisa"
            className="px-4 py-2 border rounded-md"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button
            onClick={() => navigate('/equipamentos/novo')}
            className="bg-teal-500 text-white px-4 py-2 rounded-md flex items-center gap-2"
          >
            + Cadastrar Equipamento
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow">
        <table className="w-full">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="px-6 py-3 text-left">Nome</th>
              <th className="px-6 py-3 text-left">Data de Aquisição</th>
              <th className="px-6 py-3 text-left">Vida Útil</th>
              <th className="px-6 py-3 text-left">Setor</th>
              <th className="px-6 py-3 text-left">Responsável</th>
              <th className="px-6 py-3 text-center">Ações</th>
            </tr>
          </thead>
          <tbody>
            {equipments.map((equipment) => (
              <tr key={equipment.id} className="border-b hover:bg-gray-50">
                <td className="px-6 py-4">{equipment.nome}</td>
                <td className="px-6 py-4">
                  {format(new Date(equipment.dataCompra), 'dd/MM/yyyy')}
                </td>
                <td className="px-6 py-4">
                  {format(new Date(equipment.vidaUtil), 'dd/MM/yyyy')}
                </td>
                <td className="px-6 py-4">{equipment.setor}</td>
                <td className="px-6 py-4">{equipment.responsavel}</td>
                <td className="px-6 py-4">
                  <div className="flex justify-center gap-2">
                    <button
                      onClick={() => navigate(`/equipamentos/${equipment.id}`)}
                      className="p-1 hover:bg-gray-100 rounded"
                    >
                      <Eye className="w-5 h-5 text-gray-600" />
                    </button>
                    <button
                      onClick={() => navigate(`/equipamentos/${equipment.id}/editar`)}
                      className="p-1 hover:bg-gray-100 rounded"
                    >
                      <Pencil className="w-5 h-5 text-gray-600" />
                    </button>
                    <button
                      onClick={() => handleDelete(equipment.id)}
                      className="p-1 hover:bg-gray-100 rounded"
                    >
                      <Trash2 className="w-5 h-5 text-gray-600" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex justify-between items-center">
        <span className="text-sm text-gray-600">
          Total de itens: {equipments.length}
        </span>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">Itens por página:</span>
          <select
            value={itemsPerPage}
            onChange={(e) => setItemsPerPage(Number(e.target.value))}
            className="border rounded px-2 py-1"
          >
            <option value={15}>15</option>
            <option value={30}>30</option>
            <option value={50}>50</option>
          </select>
          <div className="flex gap-1">
            <button
              onClick={() => setCurrentPage(1)}
              disabled={currentPage === 1}
              className="px-3 py-1 border rounded hover:bg-gray-100 disabled:opacity-50"
            >
              «
            </button>
            <button
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-3 py-1 border rounded hover:bg-gray-100 disabled:opacity-50"
            >
              ‹
            </button>
            <button className="px-3 py-1 border rounded bg-teal-500 text-white">
              {currentPage}
            </button>
            <button
              onClick={() => setCurrentPage(currentPage + 1)}
              className="px-3 py-1 border rounded hover:bg-gray-100"
            >
              ›
            </button>
            <button
              onClick={() => setCurrentPage(10)}
              className="px-3 py-1 border rounded hover:bg-gray-100"
            >
              »
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}