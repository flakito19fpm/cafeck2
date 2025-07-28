import React from 'react';

const ClientDetailsPage = ({ client, equipment, onBackToList }) => {
  const assignedCoffeeMachine = equipment.find(eq => eq.id === client.assignedCoffeeMachine);
  const assignedGrinder = equipment.find(eq => eq.id === client.assignedGrinder);

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white rounded-xl shadow-lg border border-gray-100">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800">Detalles del Cliente: {client.name}</h2>
        <button
          onClick={onBackToList}
          className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors font-medium"
        >
          Volver a la lista
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
          <h3 className="text-xl font-semibold text-gray-700 mb-3">Información del Cliente</h3>
          <p className="text-gray-600"><span className="font-medium">ID:</span> {client.id}</p>
          <p className="text-gray-600"><span className="font-medium">Contacto:</span> {client.contact}</p>
          <p className="text-gray-600"><span className="font-medium">Teléfono:</span> {client.phone}</p>
          <p className="text-gray-600"><span className="font-medium">Correo:</span> {client.email || 'N/A'}</p>
          <p className="text-gray-600"><span className="font-medium">Dirección:</span> {client.address}</p>
          <p className="text-gray-600"><span className="font-medium">Zona:</span> {client.zone}</p>
          <p className="text-gray-600"><span className="font-medium">Estado:</span> {client.status}</p>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
          <h3 className="text-xl font-semibold text-gray-700 mb-3">Equipos Asignados</h3>
          <div className="space-y-4">
            <div>
              <h4 className="font-medium text-gray-800">Cafetera:</h4>
              {assignedCoffeeMachine ? (
                <p className="text-gray-600">
                  {assignedCoffeeMachine.brand} {assignedCoffeeMachine.model} ({assignedCoffeeMachine.serial})
                </p>
              ) : (
                <p className="text-gray-500">No hay cafetera asignada.</p>
              )}
            </div>
            <div>
              <h4 className="font-medium text-gray-800">Molino:</h4>
              {assignedGrinder ? (
                <p className="text-gray-600">
                  {assignedGrinder.brand} {assignedGrinder.model} ({assignedGrinder.serial})
                </p>
              ) : (
                <p className="text-gray-500">No hay molino asignado.</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Aquí podrías añadir más secciones como historial de mantenimientos, etc. */}
    </div>
  );
};

export default ClientDetailsPage;