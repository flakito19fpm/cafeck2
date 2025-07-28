import React, { useState } from 'react';

const AssignEquipmentForm = ({ client = null, equipment = [], onSubmit = () => {}, onCancel = () => {} }) => {
  const [selectedCoffeeMachine, setSelectedCoffeeMachine] = useState(client?.assignedCoffeeMachine || '');
  const [selectedGrinder, setSelectedGrinder] = useState(client?.assignedGrinder || '');

  // Filter available equipment: not assigned to any client, or currently assigned to this client
  const availableCoffeeMachines = equipment.filter(eq => 
    eq.type.includes('Cafetera') && (!eq.clientId || eq.clientId === client.id)
  );
  const availableGrinders = equipment.filter(eq => 
    eq.type.includes('Molino') && (!eq.clientId || eq.clientId === client.id)
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      clientId: client.id,
      assignedCoffeeMachine: selectedCoffeeMachine || null,
      assignedGrinder: selectedGrinder || null,
    });
  };

  const handleUnassignCoffeeMachine = () => {
    setSelectedCoffeeMachine('');
  };

  const handleUnassignGrinder = () => {
    setSelectedGrinder('');
  };

  return (
    <div className="p-6 max-w-2xl mx-auto bg-white rounded-xl shadow-lg border border-gray-100">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Asignar Equipos a {client?.name}</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="coffeeMachine" className="block text-sm font-medium text-gray-700">Cafetera</label>
          <div className="flex items-center space-x-2">
            <select
              id="coffeeMachine"
              value={selectedCoffeeMachine}
              onChange={(e) => setSelectedCoffeeMachine(e.target.value)}
              className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-500 transition"
            >
              <option value="">Selecciona una cafetera</option>
              {availableCoffeeMachines.map((machine) => (
                <option key={machine.id} value={machine.id}>{machine.brand} {machine.model} ({machine.serial})</option>
              ))}
            </select>
            {selectedCoffeeMachine && (
              <button
                type="button"
                onClick={handleUnassignCoffeeMachine}
                className="p-2 rounded-lg text-red-600 hover:bg-red-100 transition-colors"
                title="Desasignar cafetera"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
              </button>
            )}
          </div>
        </div>
        <div>
          <label htmlFor="grinder" className="block text-sm font-medium text-gray-700">Molino</label>
          <div className="flex items-center space-x-2">
            <select
              id="grinder"
              value={selectedGrinder}
              onChange={(e) => setSelectedGrinder(e.target.value)}
              className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-500 transition"
            >
              <option value="">Selecciona un molino</option>
              {availableGrinders.map((grinder) => (
                <option key={grinder.id} value={grinder.id}>{grinder.brand} {grinder.model} ({grinder.serial})</option>
              ))}
            </select>
            {selectedGrinder && (
              <button
                type="button"
                onClick={handleUnassignGrinder}
                className="p-2 rounded-lg text-red-600 hover:bg-red-100 transition-colors"
                title="Desasignar molino"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
              </button>
            )}
          </div>
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
            Guardar Asignación
          </button>
        </div>
      </form>
    </div>
  );
};

export default AssignEquipmentForm;