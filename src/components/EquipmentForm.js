import React, { useState } from 'react';

const EquipmentForm = ({ clients = [], type = '', onSubmit = () => {}, onCancel = () => {} }) => {
  const [clientId, setClientId] = useState('');
  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');
  const [serial, setSerial] = useState('');
  const [purchaseDate, setPurchaseDate] = useState('');
  const [invoice, setInvoice] = useState('');
  const [condition, setCondition] = useState('');
  const [status, setStatus] = useState('Activo');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      clientId: clientId || null, // Ahora es opcional
      type,
      brand,
      model,
      serial,
      purchaseDate: purchaseDate || null, // Ahora es opcional
      invoice: invoice || null, // Ahora es opcional
      condition,
      status,
      lastService: '' // Initial last service date
    });
  };

  return (
    <div className="p-6 max-w-2xl mx-auto bg-white rounded-xl shadow-lg border border-gray-100">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Agregar {type === 'Cafetera' ? 'Cafetera' : 'Molino'}</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="client" className="block text-sm font-medium text-gray-700">Cliente (Opcional)</label>
          <select
            id="client"
            value={clientId}
            onChange={(e) => setClientId(e.target.value)}
            className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-500 transition"
          >
            <option value="">Selecciona un cliente (Opcional)</option>
            {clients.map((client) => (
              <option key={client.id} value={client.id}>{client.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="brand" className="block text-sm font-medium text-gray-700">Marca</label>
          <input
            type="text"
            id="brand"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-500 transition"
            required
          />
        </div>
        <div>
          <label htmlFor="model" className="block text-sm font-medium text-gray-700">Modelo</label>
          <input
            type="text"
            id="model"
            value={model}
            onChange={(e) => setModel(e.target.value)}
            className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-500 transition"
            required
          />
        </div>
        <div>
          <label htmlFor="serial" className="block text-sm font-medium text-gray-700">Serie</label>
          <input
            type="text"
            id="serial"
            value={serial}
            onChange={(e) => setSerial(e.target.value)}
            className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-500 transition"
            required
          />
        </div>
        <div>
          <label htmlFor="purchaseDate" className="block text-sm font-medium text-gray-700">Fecha de Compra (Opcional)</label>
          <input
            type="date"
            id="purchaseDate"
            value={purchaseDate}
            onChange={(e) => setPurchaseDate(e.target.value)}
            className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-500 transition"
          />
        </div>
        <div>
          <label htmlFor="invoice" className="block text-sm font-medium text-gray-700">Factura de Compra (Opcional)</label>
          <input
            type="text"
            id="invoice"
            value={invoice}
            onChange={(e) => setInvoice(e.target.value)}
            className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-500 transition"
          />
        </div>
        <div>
          <label htmlFor="condition" className="block text-sm font-medium text-gray-700">Condiciones Actuales</label>
          <textarea
            id="condition"
            value={condition}
            onChange={(e) => setCondition(e.target.value)}
            rows="3"
            className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-500 transition resize-none"
            placeholder="Describe el estado físico del equipo..."
            required
          ></textarea>
        </div>
        <div>
          <label htmlFor="status" className="block text-sm font-medium text-gray-700">Estado del Equipo</label>
          <select
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-500 transition"
            required
          >
            <option value="Activo">Activo</option>
            <option value="En Mantenimiento">En Mantenimiento</option>
            <option value="En Reconstrucción">En Reconstrucción</option>
            <option value="Dado de Baja">Dado de Baja</option>
          </select>
        </div>
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors font-medium"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-amber-700 text-white rounded-lg hover:bg-amber-800 transition-colors font-medium"
          >
            Guardar {type}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EquipmentForm;