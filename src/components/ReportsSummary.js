import React from 'react';

const ReportsSummary = ({ services = [], clients = [], equipment = [] }) => {
  const totalServices = services.length;
  const completedServices = services.filter(s => s.status === 'Completado').length;
  const pendingServices = services.filter(s => s.status === 'Pendiente').length;
  const inProgressServices = services.filter(s => s.status === 'En Progreso').length;

  const servicesByClient = clients.map(client => {
    const clientServices = services.filter(s => s.clientId === client.id);
    return {
      clientName: client.name,
      total: clientServices.length,
      completed: clientServices.filter(s => s.status === 'Completado').length,
      pending: clientServices.filter(s => s.status === 'Pendiente').length,
    };
  });

  const servicesByEquipmentType = equipment.reduce((acc, item) => {
    if (!acc[item.type]) {
      acc[item.type] = { total: 0, completed: 0, pending: 0 };
    }
    const equipmentServices = services.filter(s => s.equipmentId === item.id);
    acc[item.type].total += equipmentServices.length;
    acc[item.type].completed += equipmentServices.filter(s => s.status === 'Completado').length;
    acc[item.type].pending += equipmentServices.filter(s => s.status === 'Pendiente').length;
    return acc;
  }, {});

  return (
    <div className="p-6 space-y-8">
      <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Resumen General de Servicios</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 bg-gray-50 rounded-lg">
            <h4 className="text-md font-medium text-gray-600">Total Servicios</h4>
            <p className="text-3xl font-bold text-gray-900">{totalServices}</p>
          </div>
          <div className="p-4 bg-green-50 rounded-lg">
            <h4 className="text-md font-medium text-green-700">Completados</h4>
            <p className="text-3xl font-bold text-green-800">{completedServices}</p>
          </div>
          <div className="p-4 bg-orange-50 rounded-lg">
            <h4 className="text-md font-medium text-orange-700">Pendientes</h4>
            <p className="text-3xl font-bold text-orange-800">{pendingServices}</p>
          </div>
          <div className="p-4 bg-blue-50 rounded-lg">
            <h4 className="text-md font-medium text-blue-700">En Progreso</h4>
            <p className="text-3xl font-bold text-blue-800">{inProgressServices}</p>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Servicios por Cliente</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Cliente</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Total</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Completados</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Pendientes</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {servicesByClient.map((data, index) => (
                <tr key={index} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{data.clientName}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{data.total}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{data.completed}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{data.pending}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Servicios por Tipo de Equipo</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Tipo de Equipo</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Total</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Completados</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Pendientes</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {Object.entries(servicesByEquipmentType).map(([type, data]) => (
                <tr key={type} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{type}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{data.total}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{data.completed}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{data.pending}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ReportsSummary;