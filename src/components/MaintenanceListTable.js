import React, { useState } from 'react';

const MaintenanceListTable = ({ services = [], clients = [], equipment = [], onUpdateServiceStatus = () => {}, onRegisterNewMaintenance = () => {}, onViewMaintenanceDetails = () => {} }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const getClientName = (clientId) => {
    const client = clients.find(c => c.id === clientId);
    return client ? client.name : 'Desconocido';
  };

  const getEquipmentDetails = (equipmentId) => {
    const eq = equipment.find(e => e.id === equipmentId);
    return eq ? `${eq.type} - ${eq.brand} ${eq.model} (${eq.serial})` : 'Desconocido';
  };

  const filteredServices = services.filter(service =>
    (service.status === 'Pendiente' || service.status === 'En Progreso') &&
    (getClientName(service.clientId).toLowerCase().includes(searchTerm.toLowerCase()) ||
    getEquipmentDetails(service.equipmentId).toLowerCase().includes(searchTerm.toLowerCase()) ||
    service.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    service.technician.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleStatusChange = (serviceId, newStatus) => {
    onUpdateServiceStatus(serviceId, newStatus);
  };

  return (
    <div className="p-6">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-4 space-y-4 sm:space-y-0 sm:space-x-4">
        <input
          type="text"
          placeholder="Buscar mantenimiento por cliente, equipo, tipo o técnico..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full sm:w-2/3 px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-500 transition"
        />
        <button
          onClick={onRegisterNewMaintenance}
          className="w-full sm:w-auto bg-amber-700 text-white py-2 px-4 rounded-lg hover:bg-amber-800 transition-colors font-medium"
        >
          Registrar Nuevo Mantenimiento
        </button>
      </div>
      <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Folio</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Cliente</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Equipo</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Tipo Mantenimiento</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Fecha</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Técnico</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Estado</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Acciones</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredServices.length === 0 ? (
                <tr>
                  <td colSpan="8" className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">No hay mantenimientos pendientes o en progreso.</td>
                </tr>
              ) : (
                filteredServices.map((service) => (
                  <tr key={service.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{service.folio}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{getClientName(service.clientId)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{getEquipmentDetails(service.equipmentId)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{service.type}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{service.date}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{service.technician}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        service.status === 'Pendiente' ? 'bg-orange-100 text-orange-800' : 'bg-blue-100 text-blue-800'
                      }`}>
                        {service.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <select
                        value={service.status}
                        onChange={(e) => handleStatusChange(service.id, e.target.value)}
                        className="px-2 py-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-500 transition"
                      >
                        <option value="Pendiente">Pendiente</option>
                        <option value="En Progreso">En Progreso</option>
                        <option value="Completado">Completado</option>
                        <option value="Cancelado">Cancelado</option>
                      </select>
                      <button
                        onClick={() => onViewMaintenanceDetails(service)}
                        className="ml-2 text-gray-600 hover:text-gray-900 transition-colors"
                      >
                        Ver Detalles
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MaintenanceListTable;