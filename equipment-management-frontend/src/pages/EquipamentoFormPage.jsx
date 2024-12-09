import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { format } from 'date-fns';
import api from '../services/api';

export default function EquipamentoFormPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [equipment, setEquipment] = useState({
    nome: '',
    dataCompra: '',
    vidaUtil: '',
    setor: '',
    responsavel: ''
  });

  useEffect(() => {
    if (id) {
      fetchEquipment();
    }
  }, [id]);

  const fetchEquipment = async () => {
    try {
      const response = await api.get(`/equipment/${id}`);
      const data = response.data;
      setEquipment({
        ...data,
        dataCompra: format(new Date(data.dataCompra), 'yyyy-MM-dd'),
        vidaUtil: format(new Date(data.vidaUtil), 'yyyy-MM-dd')
      });
    } catch (error) {
      console.error('Erro ao buscar equipamento:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await api.patch(`/equipment/${id}`, equipment);
      } else {
        await api.post('/equipment', equipment);
      }
      navigate('/equipamentos');
    } catch (error) {
      console.error('Erro ao salvar equipamento:', error);
    }
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <button
          onClick={() => navigate('/equipamentos')}
          className="flex items-center gap-2 text-gray-600"
        >
          ← Voltar
        </button>
      </div>

      <h1 className="text-2xl font-bold mb-6">
        {id ? 'Editar Equipamento' : 'Cadastro de Equipamento'}
      </h1>

      <form onSubmit={handleSubmit} className="max-w-3xl">
        <div className="space-y-6">
          <div>
            <label className="block mb-2">
              Nome do equipamento*
              <input
                type="text"
                value={equipment.nome}
                onChange={(e) => setEquipment({ ...equipment, nome: e.target.value })}
                className="w-full px-4 py-2 mt-1 border rounded-md"
                maxLength={50}
                required
              />
            </label>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <label className="block">
              Data de Aquisição*
              <input
                type="date"
                value={equipment.dataCompra}
                onChange={(e) => setEquipment({ ...equipment, dataCompra: e.target.value })}
                className="w-full px-4 py-2 mt-1 border rounded-md"
                required
              />
            </label>

            <label className="block">
              Vida útil*
              <input
                type="date"
                value={equipment.vidaUtil}
                onChange={(e) => setEquipment({ ...equipment, vidaUtil: e.target.value })}
                className="w-full px-4 py-2 mt-1 border rounded-md"
                required
              />
            </label>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <label className="block">
              Setor*
              <input
                type="text"
                value={equipment.setor}
                onChange={(e) => setEquipment({ ...equipment, setor: e.target.value })}
                className="w-full px-4 py-2 mt-1 border rounded-md"
                required
              />
            </label>

            <label className="block">
              Responsável
              <input
                type="text"
                value={equipment.responsavel}
                onChange={(e) => setEquipment({ ...equipment, responsavel: e.target.value })}
                className="w-full px-4 py-2 mt-1 border rounded-md"
              />
            </label>
          </div>
        </div>

        <div className="mt-8 flex justify-end gap-4">
          <button
            type="button"
            onClick={() => navigate('/equipamentos')}
            className="px-6 py-2 border rounded-md hover:bg-gray-50"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
          >
            {id ? 'Salvar' : 'Cadastrar'}
          </button>
        </div>
      </form>
    </div>
  );
}