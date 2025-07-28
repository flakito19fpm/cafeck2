import React from 'react';

const DashboardOverview = ({ clientsCount = 0, equipmentCount = 0, pendingServices = 0, completedServices = 0 }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-6">
      <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 transform transition-transform hover:scale-105">
        <h3 className="text-lg font-semibold text-gray-600">Clientes Registrados</h3>
        <p className="mt-1 text-4xl font-bold text-gray-900">{clientsCount}</p>
      </div>
      <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 transform transition-transform hover:scale-105">
        <h3 className="text-lg font-semibold text-gray-600">Equipos Activos</h3>
        <p className="mt-1 text-4xl font-bold text-gray-900">{equipmentCount}</p>
      </div>
      <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 transform transition-transform hover:scale-105">
        <h3 className="text-lg font-semibold text-gray-600">Mantenimientos Pendientes</h3>
        <p className="mt-1 text-4xl font-bold text-amber-600">{pendingServices}</p>
      </div>
      <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 transform transition-transform hover:scale-105">
        <h3 className="text-lg font-semibold text-gray-600">Mantenimientos Completados</h3>
        <p className="mt-1 text-4xl font-bold text-green-600">{completedServices}</p>
      </div>
    </div>
  );
};

export default DashboardOverview;