import React from 'react';

const DashboardCharts = ({ services = [], equipment = [] }) => {
  // Data for Service Status Chart (Pie Chart)
  const serviceStatusCounts = services.reduce((acc, service) => {
    acc[service.status] = (acc[service.status] || 0) + 1;
    return acc;
  }, {});

  const totalServices = services.length;
  const getPercentage = (count) => totalServices > 0 ? ((count / totalServices) * 100).toFixed(1) : 0;

  const statusData = [
    { status: 'Completado', count: serviceStatusCounts['Completado'] || 0, color: 'bg-green-600' },
    { status: 'Pendiente', count: serviceStatusCounts['Pendiente'] || 0, color: 'bg-amber-600' },
    { status: 'En Progreso', count: serviceStatusCounts['En Progreso'] || 0, color: 'bg-blue-600' },
    { status: 'Cancelado', count: serviceStatusCounts['Cancelado'] || 0, color: 'bg-red-600' },
  ];

  // Data for Equipment Type Distribution (Bar Chart)
  const equipmentTypeCounts = equipment.reduce((acc, item) => {
    acc[item.type] = (acc[item.type] || 0) + 1;
    return acc;
  }, {});

  const maxEquipmentCount = Math.max(...Object.values(equipmentTypeCounts), 1);

  return (
    <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Service Status Chart */}
      <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Estado de Servicios</h2>
        <div className="flex flex-col items-center justify-center h-64">
          {totalServices === 0 ? (
            <p className="text-gray-500">No hay servicios para mostrar.</p>
          ) : (
            <div className="relative w-48 h-48 rounded-full overflow-hidden shadow-inner">
              {/* Simple Pie Chart using TailwindCSS - for illustrative purposes */}
              {/* This would typically be a more complex SVG or library-based chart */}
              <div className="absolute inset-0 bg-green-600" style={{ clipPath: `polygon(50% 0%, 100% 0%, 100% ${getPercentage(serviceStatusCounts['Completado'])}%, 50% 50%)` }}></div>
              <div className="absolute inset-0 bg-amber-600" style={{ clipPath: `polygon(50% 0%, 100% ${getPercentage(serviceStatusCounts['Completado'])}%, 100% ${getPercentage(serviceStatusCounts['Completado']) + getPercentage(serviceStatusCounts['Pendiente'])}%, 50% 50%)` }}></div>
              {/* ... more slices for other statuses */}
            </div>
          )}
        </div>
        <div className="mt-6 space-y-2">
          {statusData.map((data, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center">
                <span className={`w-3 h-3 rounded-full ${data.color} mr-2`}></span>
                <span className="text-gray-700">{data.status}</span>
              </div>
              <span className="font-medium text-gray-900">{data.count} ({getPercentage(data.count)}%)</span>
            </div>
          ))}
        </div>
      </div>

      {/* Equipment Type Distribution Chart */}
      <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Distribución de Equipos por Tipo</h2>
        <div className="h-64 flex flex-col justify-end">
          {Object.keys(equipmentTypeCounts).length === 0 ? (
            <p className="text-gray-500 text-center">No hay equipos para mostrar.</p>
          ) : (
            <div className="flex items-end h-full w-full">
              {Object.entries(equipmentTypeCounts).map(([type, count], index) => (
                <div key={index} className="flex flex-col items-center mx-2 flex-grow">
                  <div
                    className="w-8 bg-blue-600 rounded-t-lg transition-all duration-500 ease-out"
                    style={{ height: `${(count / maxEquipmentCount) * 90 + 10}%` }} // Scale to 10-100% height
                  ></div>
                  <span className="mt-2 text-sm text-gray-600 text-center">{type} ({count})</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardCharts;