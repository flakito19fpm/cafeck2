import React, { useState, useEffect } from 'react';
import { maintenanceChecklists } from '../mock/maintenanceChecklists';

const MaintenanceForm = ({ clients = [], equipment = [], onSubmit = () => {} }) => {
  const [clientId, setClientId] = useState('');
  const [equipmentId, setEquipmentId] = useState('');
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');
  const [maintenanceType, setMaintenanceType] = useState('');
  const [status, setStatus] = useState('Pendiente');
  const [checklist, setChecklist] = useState({});
  const [nextServiceObservations, setNextServiceObservations] = useState('');
  const [technician, setTechnician] = useState('');

  const technicians = ['Jonathan Quintal Valencia', 'Carlos Hernandez Valencia'];

  // Determine the specific checklist based on maintenance type and equipment type
  const getSpecificChecklist = (mType, eqType) => {
    let key = mType;
    if (mType === 'Mantenimiento Preventivo' || mType === 'Mantenimiento General' || mType === 'Reconstrucción') {
      if (eqType && eqType.includes('Cafetera')) {
        key = `${mType} - Cafetera`;
      } else if (eqType && eqType.includes('Molino')) {
        key = `${mType} - Molino`;
      }
    }
    return maintenanceChecklists[key];
  };

  useEffect(() => {
    const selectedEquipment = equipment.find(eq => eq.id === equipmentId);
    const eqType = selectedEquipment ? selectedEquipment.type : '';
    const specificChecklistItems = getSpecificChecklist(maintenanceType, eqType);

    if (specificChecklistItems) {
      const initialChecklist = {};
      specificChecklistItems.forEach(item => {
        initialChecklist[item] = false;
      });
      setChecklist(initialChecklist);
    } else {
      setChecklist({});
    }
  }, [maintenanceType, equipmentId, equipment]); // Re-run when equipmentId or maintenanceType changes

  const handleChecklistItemChange = (item) => {
    setChecklist(prevChecklist => ({
      ...prevChecklist,
      [item]: !prevChecklist[item]
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ clientId, equipmentId, date, description, type: maintenanceType, status, checklist, nextServiceObservations, technician });
    setClientId('');
    setEquipmentId('');
    setDate('');
    setDescription('');
    setMaintenanceType('');
    setStatus('Pendiente');
    setChecklist({});
    setNextServiceObservations('');
    setTechnician('');
  };

  const filteredEquipment = equipment.filter(item => item.clientId === clientId);

  return (
    <div className="p-6 max-w-2xl mx-auto bg-white rounded-xl shadow-lg border border-gray-100">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Registrar Nuevo Mantenimiento</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="client" className="block text-sm font-medium text-gray-700">Cliente</label>
          <select
            id="client"
            value={clientId}
            onChange={(e) => setClientId(e.target.value)}
            className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-500 transition"
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
            className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-500 transition"
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
          <label htmlFor="maintenanceType" className="block text-sm font-medium text-gray-700">Tipo de Mantenimiento</label>
          <select
            id="maintenanceType"
            value={maintenanceType}
            onChange={(e) => setMaintenanceType(e.target.value)}
            className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-500 transition"
            required
          >
            <option value="">Selecciona un tipo</option>
            <option value="Mantenimiento Preventivo">Mantenimiento Preventivo</option>
            <option value="Mantenimiento General">Mantenimiento General</option>
            <option value="Reconstrucción">Reconstrucción</option>
          </select>
        </div>

        {maintenanceType && getSpecificChecklist(maintenanceType, equipment.find(eq => eq.id === equipmentId)?.type) && (
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <h3 className="text-lg font-medium text-gray-800 mb-3">Checklist de {maintenanceType}</h3>
            <div className="space-y-2">
              {getSpecificChecklist(maintenanceType, equipment.find(eq => eq.id === equipmentId)?.type).map((item, index) => (
                <div key={index} className="flex items-center">
                  <input
                    type="checkbox"
                    id={`checklist-${index}`}
                    checked={checklist[item] || false}
                    onChange={() => handleChecklistItemChange(item)}
                    className="h-4 w-4 text-amber-700 focus:ring-amber-700 border-gray-300 rounded"
                  />
                  <label htmlFor={`checklist-${index}`} className="ml-2 text-sm text-gray-700">{item}</label>
                </div>
              ))}
            </div>
          </div>
        )}

        <div>
          <label htmlFor="date" className="block text-sm font-medium text-gray-700">Fecha del Mantenimiento</label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-500 transition"
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
            className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-500 transition resize-none"
            placeholder="Detalles del mantenimiento realizado..."
            required
          ></textarea>
        </div>
        <div>
          <label htmlFor="nextServiceObservations" className="block text-sm font-medium text-gray-700">Observaciones para el Próximo Servicio</label>
          <textarea
            id="nextServiceObservations"
            value={nextServiceObservations}
            onChange={(e) => setNextServiceObservations(e.target.value)}
            rows="3"
            className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-500 transition resize-none"
            placeholder="Notas importantes para el siguiente mantenimiento..."
          ></textarea>
        </div>
        <div>
          <label htmlFor="technician" className="block text-sm font-medium text-gray-700">Técnico Responsable</label>
          <select
            id="technician"
            value={technician}
            onChange={(e) => setTechnician(e.target.value)}
            className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-500 transition"
            required
          >
            <option value="">Selecciona un técnico</option>
            {technicians.map((tech) => (
              <option key={tech} value={tech}>{tech}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="status" className="block text-sm font-medium text-gray-700">Estado</label>
          <select
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-500 transition"
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
          className="w-full mt-4 bg-amber-700 text-white py-2 rounded-lg hover:bg-amber-800 transition-colors font-medium"
        >
          Registrar Mantenimiento
        </button>
      </form>
    </div>
  );
};

export default MaintenanceForm;