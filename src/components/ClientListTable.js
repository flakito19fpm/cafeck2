import React, { useState } from 'react';

const ClientListTable = ({ clients = [], onAddClient = () => {}, onEditClient = () => {}, onAssignEquipment = () => {}, onViewDetails = () => {} }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredClients = clients.filter(client =>
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.contact.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.phone.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.zone.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-4 space-y-4 sm:space-y-0 sm:space-x-4">
        <input
          type="text"
          placeholder="Buscar cliente..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full sm:w-2/3 px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-500 transition"
        />
        <button
          onClick={onAddClient}
          className="w-full sm:w-auto bg-amber-700 text-white py-2 px-4 rounded-lg hover:bg-amber-800 transition-colors font-medium"
        >
          Agregar Cliente
        </button>
      </div>
      <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Nombre Comercial</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Contacto</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Teléfono</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Zona</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Estado</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Acciones</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredClients.map((client) => (
                <tr key={client.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{client.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{client.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{client.contact}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{client.phone}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{client.zone}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      client.status === 'Activo' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {client.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                    <button
                      onClick={() => onEditClient(client)}
                      className="text-amber-700 hover:text-amber-900 transition-colors"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => onAssignEquipment(client)}
                      className="text-blue-600 hover:text-blue-800 transition-colors"
                    >
                      Asignar Equipos
                    </button>
                    <button
                      onClick={() => onViewDetails(client)}
                      className="text-gray-600 hover:text-gray-900 transition-colors"
                    >
                      Detalles
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

export default ClientListTable;