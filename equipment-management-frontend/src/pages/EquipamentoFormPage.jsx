import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';

const EquipamentoFormPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [equipment, setEquipment] = useState({
    nome: '',
    dataCompra: '',
    vidaUtil: '',
    setor: '',
    responsavel: '',
  });

  useEffect(() => {
    if (id) {
      // Carregar dados do equipamento para edição
      const fetchEquipment = async () => {
        try {
          const response = await api.get(`/equipment/${id}`);
          setEquipment(response.data);
        } catch (error) {
          console.error('Erro ao carregar equipamento:', error);
        }
      };
      fetchEquipment();
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        // Atualizar equipamento existente
        await api.put(`/equipment/${id}`, equipment);
      } else {
        // Criar novo equipamento
        await api.post('/equipment', equipment);
      }
      navigate('/equipamentos');
    } catch (error) {
      console.error('Erro ao salvar equipamento:', error);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">{id ? 'Editar Equipamento' : 'Novo Equipamento'}</h1>
      <form onSubmit={handleSubmit} className="mt-4">
        <div className="grid grid-cols-1 gap-4">
          <input
            type="text"
            placeholder="Nome"
            value={equipment.nome}
            onChange={(e) => setEquipment({ ...equipment, nome: e.target.value })}
            className="border px-4 py-2 rounded"
          />
          <input
            type="date"
            value={equipment.dataCompra}
            onChange={(e) => setEquipment({ ...equipment, dataCompra: e.target.value })}
            className="border px-4 py-2 rounded"
          />
          <input
            type="date"
            value={equipment.vidaUtil}
            onChange={(e) => setEquipment({ ...equipment, vidaUtil: e.target.value })}
            className="border px-4 py-2 rounded"
          />
          <input
            type="text"
            placeholder="Setor"
            value={equipment.setor}
            onChange={(e) => setEquipment({ ...equipment, setor: e.target.value })}
            className="border px-4 py-2 rounded"
          />
          <input
            type="text"
            placeholder="Responsável"
            value={equipment.responsavel}
            onChange={(e) => setEquipment({ ...equipment, responsavel: e.target.value })}
            className="border px-4 py-2 rounded"
          />
        </div>
        <button type="submit" className="mt-4 bg-teal-500 text-white px-4 py-2 rounded">
          {id ? 'Salvar Alterações' : 'Cadastrar'}
        </button>
      </form>
    </div>
  );
};

export default EquipamentoFormPage;
