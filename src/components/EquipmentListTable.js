import React, { useState } from 'react';

const EquipmentListTable = ({ equipment = [], clients = [], onAddEquipment = () => {} }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const getClientName = (clientId) => {
    const client = clients.find(c => c.id === clientId);
    return client ? client.name : 'Desconocido';
  };

  const filteredEquipment = equipment.filter(item =>
    item.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.serial.toLowerCase().includes(searchTerm.toLowerCase()) ||
    getClientName(item.clientId).toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6">
      <div className="flex flex-col sm:flex-row justify-end items-center mb-4 space-y-4 sm:space-y-0 sm:space-x-4">
        <input
          type="text"
          placeholder="Buscar equipo..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full sm:w-2/3 px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-black transition"
        />
        <button
          onClick={onAddEquipment}
          className="w-full sm:w-auto bg-black text-white py-2 px-4 rounded-lg hover:bg-gray-800 transition-colors font-medium"
        >
          Agregar Equipo
        </button>
      </div>
      <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Cliente</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Tipo</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Marca</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Modelo</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Serie</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Estado</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Acciones</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredEquipment.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{getClientName(item.clientId)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{item.type}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{item.brand}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{item.model}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{item.serial}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      item.status === 'Activo' ? 'bg-green-100 text-green-800' :
                      item.status === 'En Mantenimiento' ? 'bg-yellow-100 text-yellow-800' :
                      item.status === 'En Reconstrucción' ? 'bg-blue-100 text-blue-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => console.log('Editar equipo', item.id)} // Placeholder for edit
                      className="text-black hover:text-gray-700 transition-colors"
                    >
                      Editar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default EquipmentListTable;