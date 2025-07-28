import React from 'react';

const MaintenanceDetailsPage = ({ service, client, equipment, onBackToList }) => {
  const getEquipmentDetails = (equipmentId) => {
    const eq = equipment.find(e => e.id === equipmentId);
    return eq ? `${eq.type} - ${eq.brand} ${eq.model} (${eq.serial})` : 'Desconocido';
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white rounded-xl shadow-lg border border-gray-100 print:shadow-none print:border-none">
      <div className="flex justify-between items-center mb-6 print:hidden">
        <h2 className="text-3xl font-bold text-gray-800">Detalles del Mantenimiento</h2>
        <div>
          <button
            onClick={handlePrint}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium mr-2"
          >
            Imprimir
          </button>
          <button
            onClick={onBackToList}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors font-medium"
          >
            Volver a la lista
          </button>
        </div>
      </div>

      <div className="space-y-6">
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
          <h3 className="text-xl font-semibold text-gray-700 mb-3">Información General</h3>
          <p className="text-gray-600"><span className="font-medium">Folio:</span> {service.folio}</p>
          <p className="text-gray-600"><span className="font-medium">ID Mantenimiento:</span> {service.id}</p>
          <p className="text-gray-600"><span className="font-medium">Cliente:</span> {client?.name || 'N/A'}</p>
          <p className="text-gray-600"><span className="font-medium">Equipo:</span> {getEquipmentDetails(service.equipmentId)}</p>
          <p className="text-gray-600"><span className="font-medium">Tipo de Mantenimiento:</span> {service.type}</p>
          <p className="text-gray-600"><span className="font-medium">Fecha:</span> {service.date}</p>
          <p className="text-gray-600"><span className="font-medium">Técnico Responsable:</span> {service.technician}</p>
          <p className="text-gray-600"><span className="font-medium">Estado:</span> {service.status}</p>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
          <h3 className="text-xl font-semibold text-gray-700 mb-3">Descripción del Servicio</h3>
          <p className="text-gray-600 whitespace-pre-wrap">{service.description}</p>
        </div>

        {service.checklist && Object.keys(service.checklist).length > 0 && (
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <h3 className="text-xl font-semibold text-gray-700 mb-3">Checklist Realizado</h3>
            <ul className="list-disc list-inside space-y-1">
              {Object.entries(service.checklist).map(([item, checked]) => (
                <li key={item} className={`text-gray-600 ${checked ? 'line-through text-green-700' : 'text-red-700'}`}>
                  {item} {checked ? '(Completado)' : '(Pendiente)'}
                </li>
              ))}
            </ul>
          </div>
        )}

        {service.nextServiceObservations && (
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <h3 className="text-xl font-semibold text-gray-700 mb-3">Observaciones para el Próximo Servicio</h3>
            <p className="text-gray-600 whitespace-pre-wrap">{service.nextServiceObservations}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MaintenanceDetailsPage;