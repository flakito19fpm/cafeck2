import React, { useState } from 'react';

const ServiceForm = ({ clients = [], equipment = [], onSubmit = () => {} }) => {
  const [clientId, setClientId] = useState('');
  const [equipmentId, setEquipmentId] = useState('');
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('Pendiente');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ clientId, equipmentId, date, description, status });
    setClientId('');
    setEquipmentId('');
    setDate('');
    setDescription('');
    setStatus('Pendiente');
  };

  const filteredEquipment = equipment.filter(item => item.clientId === clientId);

  return (
    <div className="p-6 max-w-2xl mx-auto bg-white rounded-xl shadow-md border border-gray-100">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Registrar Nuevo Servicio</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="client" className="block text-sm font-medium text-gray-700">Cliente</label>
          <select
            id="client"
            value={clientId}
            onChange={(e) => setClientId(e.target.value)}
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-black transition"
            required
          >
            <option value="">Selecciona un cliente</option>
            {clients.map((client) => (
              <option key={client.id} value={client.id}>{client.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="equipment" className="block text-sm font-medium text-gray-700">Equipo</label>
          <select
            id="equipment"
            value={equipmentId}
            onChange={(e) => setEquipmentId(e.target.value)}
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-black transition"
            required
            disabled={!clientId}
          >
            <option value="">Selecciona un equipo</option>
            {filteredEquipment.map((item) => (
              <option key={item.id} value={item.id}>{item.type} - {item.brand} {item.model}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="date" className="block text-sm font-medium text-gray-700">Fecha del Servicio</label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-black transition"
            required
          />
        </div>
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">Descripción</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows="4"
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-black transition resize-none"
            placeholder="Detalles del servicio realizado..."
            required
          ></textarea>
        </div>
        <div>
          <label htmlFor="status" className="block text-sm font-medium text-gray-700">Estado</label>
          <select
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-black transition"
            required
          >
            <option value="Pendiente">Pendiente</option>
            <option value="En Progreso">En Progreso</option>
            <option value="Completado">Completado</option>
            <option value="Cancelado">Cancelado</option>
          </select>
        </div>
        <button
          type="submit"
          className="w-full mt-4 bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition-colors font-medium"
        >
          Registrar Servicio
        </button>
      </form>
    </div>
  );
};

export default ServiceForm;