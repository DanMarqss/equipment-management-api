import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import api from '../services/api';

const EquipamentoViewPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [equipment, setEquipment] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEquipment = async () => {
      try {
        const response = await api.get(`/equipment/${id}`);
        setEquipment(response.data);
      } catch (error) {
        console.error('Erro ao buscar equipamento:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEquipment();
  }, [id]);

  if (loading) {
    return (
      <div className="p-6 flex justify-center items-center">
        <div className="text-xl">Carregando...</div>
      </div>
    );
  }

  if (!equipment) {
    return (
      <div className="p-6">
        <div className="text-xl text-red-600">Equipamento não encontrado</div>
        <button
          onClick={() => navigate('/equipamentos')}
          className="mt-4 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
        >
          Voltar
        </button>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Detalhes do Equipamento</h1>
        <button
          onClick={() => navigate('/equipamentos')}
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
        >
          Voltar
        </button>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h3 className="text-gray-600">Nome</h3>
            <p className="font-medium">{equipment.nome}</p>
          </div>
          <div>
            <h3 className="text-gray-600">Data de Aquisição</h3>
            <p className="font-medium">
              {format(new Date(equipment.dataCompra), 'dd/MM/yyyy')}
            </p>
          </div>
          <div>
            <h3 className="text-gray-600">Vida Útil</h3>
            <p className="font-medium">
              {format(new Date(equipment.vidaUtil), 'dd/MM/yyyy')}
            </p>
          </div>
          <div>
            <h3 className="text-gray-600">Setor</h3>
            <p className="font-medium">{equipment.setor}</p>
          </div>
          <div>
            <h3 className="text-gray-600">Responsável</h3>
            <p className="font-medium">{equipment.responsavel}</p>
          </div>
        </div>

        <div className="mt-6 flex gap-4">
          <button
            onClick={() => navigate(`/equipamentos/${id}/editar`)}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Editar
          </button>
          <button
            onClick={() => {
              if (window.confirm('Deseja realmente excluir este equipamento?')) {
                api.delete(`/equipment/${id}`).then(() => {
                  navigate('/equipamentos');
                });
              }
            }}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Excluir
          </button>
        </div>
      </div>
    </div>
  );
};

export default EquipamentoViewPage;