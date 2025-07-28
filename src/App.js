import React, { useState, useEffect } from 'react';
import LayoutHeader from './components/LayoutHeader';
import DashboardOverview from './components/DashboardOverview';
import DashboardCharts from './components/DashboardCharts';
import ClientListTable from './components/ClientListTable';
import ClientForm from './components/ClientForm';
import AssignEquipmentForm from './components/AssignEquipmentForm';
import ClientDetailsPage from './components/ClientDetailsPage';
import EquipmentListTable from './components/EquipmentListTable';
import EquipmentForm from './components/EquipmentForm';
import MaintenanceForm from './components/MaintenanceForm';
import MaintenanceListTable from './components/MaintenanceListTable';
import MaintenanceHistoryTable from './components/MaintenanceHistoryTable';
import MaintenanceDetailsPage from './components/MaintenanceDetailsPage';
import ReportsSummary from './components/ReportsSummary';
import WelcomePage from './components/WelcomePage';

// Importar funciones de Firebase
import { getClients, addClient, updateClient, getEquipment, addEquipment, updateEquipment, getServices, addService, updateService } from './utils/firebase';

// Importar mock data como fallback si Firebase no está configurado o falla
import { defaultClients } from './mock/clients';
import { defaultEquipment } from './mock/equipment';
import { defaultServices } from './mock/services';

const App = () => {
  const [showWelcome, setShowWelcome] = useState(true);
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [clients, setClients] = useState([]);
  const [equipment, setEquipment] = useState([]);
  const [services, setServices] = useState([]);
  const [editingClient, setEditingClient] = useState(null);
  const [assigningEquipmentToClient, setAssigningEquipmentToClient] = useState(null);
  const [viewingClientDetails, setViewingClientDetails] = useState(null);
  const [viewingMaintenanceDetails, setViewingMaintenanceDetails] = useState(null);
  const [addingEquipmentType, setAddingEquipmentType] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const fetchedClients = await getClients();
        const fetchedEquipment = await getEquipment();
        const fetchedServices = await getServices();
        
        setClients(fetchedClients);
        setEquipment(fetchedEquipment);
        setServices(fetchedServices);
      } catch (err) {
        console.error("Error fetching data from Firebase:", err);
        setError("No se pudo conectar a Firebase. Usando datos de prueba.");
        // Fallback to mock data
        setClients(defaultClients);
        setEquipment(defaultEquipment);
        setServices(defaultServices);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleEnterApp = () => {
    setShowWelcome(false);
  };

  const handleAddClient = async (newClientData) => {
    try {
      const id = await addClient(newClientData);
      setClients([...clients, { id, ...newClientData }]);
      setCurrentPage('clients');
    } catch (err) {
      console.error("Error adding client to Firebase:", err);
      alert("Error al agregar cliente. Inténtalo de nuevo.");
    }
  };

  const handleUpdateClient = async (updatedClientData) => {
    try {
      await updateClient(updatedClientData.id, updatedClientData);
      setClients(clients.map(client => 
        client.id === updatedClientData.id ? updatedClientData : client
      ));
      setEditingClient(null);
      setCurrentPage('clients');
    } catch (err) {
      console.error("Error updating client in Firebase:", err);
      alert("Error al actualizar cliente. Inténtalo de nuevo.");
    }
  };

  const handleEditClient = (client) => {
    setEditingClient(client);
    setCurrentPage('editClient');
  };

  const handleCancelClientForm = () => {
    setEditingClient(null);
    setCurrentPage('clients');
  };

  const handleAssignEquipmentToClient = (client) => {
    setAssigningEquipmentToClient(client);
    setCurrentPage('assignEquipment');
  };

  const handleSaveAssignedEquipment = async ({ clientId, assignedCoffeeMachine, assignedGrinder }) => {
    try {
      // Get current client data to compare
      const currentClient = clients.find(c => c.id === clientId);
      
      // Update client's assigned equipment fields
      await updateClient(clientId, { assignedCoffeeMachine, assignedGrinder });
      setClients(clients.map(client => 
        client.id === clientId ? { ...client, assignedCoffeeMachine, assignedGrinder } : client
      ));

      // Logic to update old equipment's clientId to null if unassigned
      // And update new assigned equipment's clientId to the current client
      const equipmentUpdates = [];
      const updatedEquipmentState = [...equipment];

      // Handle old coffee machine unassignment
      if (currentClient?.assignedCoffeeMachine && currentClient.assignedCoffeeMachine !== assignedCoffeeMachine) {
        equipmentUpdates.push(updateEquipment(currentClient.assignedCoffeeMachine, { clientId: null }));
        const oldMachineIndex = updatedEquipmentState.findIndex(eq => eq.id === currentClient.assignedCoffeeMachine);
        if (oldMachineIndex !== -1) updatedEquipmentState[oldMachineIndex] = { ...updatedEquipmentState[oldMachineIndex], clientId: null };
      }
      // Handle old grinder unassignment
      if (currentClient?.assignedGrinder && currentClient.assignedGrinder !== assignedGrinder) {
        equipmentUpdates.push(updateEquipment(currentClient.assignedGrinder, { clientId: null }));
        const oldGrinderIndex = updatedEquipmentState.findIndex(eq => eq.id === currentClient.assignedGrinder);
        if (oldGrinderIndex !== -1) updatedEquipmentState[oldGrinderIndex] = { ...updatedEquipmentState[oldGrinderIndex], clientId: null };
      }

      // Handle new coffee machine assignment
      if (assignedCoffeeMachine && assignedCoffeeMachine !== currentClient?.assignedCoffeeMachine) {
        equipmentUpdates.push(updateEquipment(assignedCoffeeMachine, { clientId }));
        const newMachineIndex = updatedEquipmentState.findIndex(eq => eq.id === assignedCoffeeMachine);
        if (newMachineIndex !== -1) updatedEquipmentState[newMachineIndex] = { ...updatedEquipmentState[newMachineIndex], clientId };
      }
      // Handle new grinder assignment
      if (assignedGrinder && assignedGrinder !== currentClient?.assignedGrinder) {
        equipmentUpdates.push(updateEquipment(assignedGrinder, { clientId }));
        const newGrinderIndex = updatedEquipmentState.findIndex(eq => eq.id === assignedGrinder);
        if (newGrinderIndex !== -1) updatedEquipmentState[newGrinderIndex] = { ...updatedEquipmentState[newGrinderIndex], clientId };
      }

      await Promise.all(equipmentUpdates);
      setEquipment(updatedEquipmentState); // Update equipment state once after all changes

      setAssigningEquipmentToClient(null);
      setCurrentPage('clients');
    } catch (err) {
      console.error("Error assigning equipment:", err);
      alert("Error al asignar equipos. Inténtalo de nuevo.");
    }
  };

  const handleCancelAssignEquipment = () => {
    setAssigningEquipmentToClient(null);
    setCurrentPage('clients');
  };

  const handleViewClientDetails = (client) => {
    setViewingClientDetails(client);
    setCurrentPage('clientDetails');
  };

  const handleBackToClientList = () => {
    setViewingClientDetails(null);
    setCurrentPage('clients');
  };

  const handleAddEquipment = async (newEquipmentData) => {
    try {
      const id = await addEquipment(newEquipmentData);
      setEquipment([...equipment, { id, ...newEquipmentData }]);
      setAddingEquipmentType(null);
      setCurrentPage('equipment');
    } catch (err) {
      console.error("Error adding equipment to Firebase:", err);
      alert("Error al agregar equipo. Inténtalo de nuevo.");
    }
  };

  const handleCancelEquipmentForm = () => {
    setAddingEquipmentType(null);
    setCurrentPage('equipment');
  };

  const handleAddMaintenance = async (newMaintenanceData) => {
    try {
      // Generate folio
      const lastServiceFolio = services.reduce((maxFolio, service) => {
        const folioNum = parseInt(service.folio?.split('-')[1]) || 0;
        return Math.max(maxFolio, folioNum);
      }, 0);
      const newFolio = `MTTO-${String(lastServiceFolio + 1).padStart(3, '0')}`;

      const serviceToSave = { ...newMaintenanceData, folio: newFolio };
      const id = await addService(serviceToSave);
      setServices([...services, { id, ...serviceToSave }]);
      setCurrentPage('maintenanceList');
    } catch (err) {
      console.error("Error adding service to Firebase:", err);
      alert("Error al registrar mantenimiento. Inténtalo de nuevo.");
    }
  };

  const handleUpdateServiceStatus = async (serviceId, newStatus) => {
    try {
      await updateService(serviceId, { status: newStatus });
      setServices(services.map(service => 
        service.id === serviceId ? { ...service, status: newStatus } : service
      ));
    } catch (err) {
      console.error("Error updating service status in Firebase:", err);
      alert("Error al actualizar el estado del mantenimiento. Inténtalo de nuevo.");
    }
  };

  const handleViewMaintenanceDetails = (service) => {
    setViewingMaintenanceDetails(service);
    setCurrentPage('maintenanceDetails');
  };

  const handleBackToMaintenanceList = () => {
    setViewingMaintenanceDetails(null);
    setCurrentPage('maintenanceList');
  };

  const handleBackToServiceHistory = () => {
    setViewingMaintenanceDetails(null);
    setCurrentPage('serviceHistory');
  };

  const getPageTitle = () => {
    switch (currentPage) {
      case 'dashboard':
        return 'Dashboard';
      case 'clients':
        return 'Gestión de Clientes';
      case 'addClient':
        return 'Agregar Nuevo Cliente';
      case 'editClient':
        return 'Editar Cliente';
      case 'assignEquipment':
        return 'Asignar Equipos';
      case 'clientDetails':
        return 'Detalles del Cliente';
      case 'equipment':
        return 'Gestión de Equipos';
      case 'addCoffeeMachine':
        return 'Registrar Cafetera';
      case 'addGrinder':
        return 'Registrar Molino';
      case 'maintenance':
        return 'Registrar Mantenimiento';
      case 'maintenanceList':
        return 'Mantenimientos Pendientes';
      case 'serviceHistory':
        return 'Historial de Servicios';
      case 'maintenanceDetails':
        return 'Detalles del Mantenimiento';
      case 'reports':
        return 'Reportes y Estadísticas';
      default:
        return 'CoffeeSupport';
    }
  };

  const renderPage = () => {
    if (showWelcome) {
      return <WelcomePage onEnterApp={handleEnterApp} />;
    }

    if (loading) {
      return (
        <div className="flex justify-center items-center h-full p-6">
          <p className="text-gray-700 text-xl">Cargando datos...</p>
        </div>
      );
    }

    if (error) {
      return (
        <div className="p-6 text-center text-red-600 text-lg">
          <p>{error}</p>
          <p>Por favor, asegúrate de que tu configuración de Firebase en `utils/firebaseConfig.js` sea correcta y que las reglas de seguridad de Firestore permitan la lectura y escritura.</p>
        </div>
      );
    }

    switch (currentPage) {
      case 'dashboard':
        const pending = services.filter(s => s.status === 'Pendiente' || s.status === 'En Progreso').length;
        const completed = services.filter(s => s.status === 'Completado').length;
        return (
          <>
            <DashboardOverview
              clientsCount={clients.length}
              equipmentCount={equipment.length}
              pendingServices={pending}
              completedServices={completed}
            />
            <DashboardCharts services={services} equipment={equipment} />
          </>
        );
      case 'clients':
        return <ClientListTable clients={clients} onAddClient={() => setCurrentPage('addClient')} onEditClient={handleEditClient} onAssignEquipment={handleAssignEquipmentToClient} onViewDetails={handleViewClientDetails} />;
      case 'addClient':
        return <ClientForm onSubmit={handleAddClient} onCancel={handleCancelClientForm} />;
      case 'editClient':
        return <ClientForm client={editingClient} onSubmit={handleUpdateClient} onCancel={handleCancelClientForm} />;
      case 'assignEquipment':
        return <AssignEquipmentForm client={assigningEquipmentToClient} equipment={equipment} onSubmit={handleSaveAssignedEquipment} onCancel={handleCancelAssignEquipment} />;
      case 'clientDetails':
        return <ClientDetailsPage client={viewingClientDetails} equipment={equipment} onBackToList={handleBackToClientList} />;
      case 'equipment':
        return (
          <div className="p-6">
            <div className="flex flex-col sm:flex-row justify-end items-center mb-4 space-y-4 sm:space-y-0 sm:space-x-4">
              <button
                onClick={() => { setAddingEquipmentType('Cafetera'); setCurrentPage('addCoffeeMachine'); }}
                className="w-full sm:w-auto bg-amber-700 text-white py-2 px-4 rounded-lg hover:bg-amber-800 transition-colors font-medium"
              >
                Registrar Cafetera
              </button>
              <button
                onClick={() => { setAddingEquipmentType('Molino'); setCurrentPage('addGrinder'); }}
                className="w-full sm:w-auto bg-amber-700 text-white py-2 px-4 rounded-lg hover:bg-amber-800 transition-colors font-medium"
              >
                Registrar Molino
              </button>
            </div>
            <EquipmentListTable equipment={equipment} clients={clients} />
          </div>
        );
      case 'addCoffeeMachine':
        return <EquipmentForm clients={clients} type="Cafetera" onSubmit={handleAddEquipment} onCancel={handleCancelEquipmentForm} />;
      case 'addGrinder':
        return <EquipmentForm clients={clients} type="Molino" onSubmit={handleAddEquipment} onCancel={handleCancelEquipmentForm} />;
      case 'maintenance':
        return <MaintenanceForm clients={clients} equipment={equipment} onSubmit={handleAddMaintenance} />;
      case 'maintenanceList':
        return <MaintenanceListTable services={services} clients={clients} equipment={equipment} onUpdateServiceStatus={handleUpdateServiceStatus} onRegisterNewMaintenance={() => setCurrentPage('maintenance')} onViewMaintenanceDetails={handleViewMaintenanceDetails} />;
      case 'serviceHistory':
        return <MaintenanceHistoryTable services={services} clients={clients} equipment={equipment} onViewMaintenanceDetails={handleViewMaintenanceDetails} />;
      case 'maintenanceDetails':
        const selectedClient = clients.find(c => c.id === viewingMaintenanceDetails.clientId);
        return <MaintenanceDetailsPage service={viewingMaintenanceDetails} client={selectedClient} equipment={equipment} onBackToList={handleBackToServiceHistory} />;
      case 'reports':
        return <ReportsSummary services={services} clients={clients} equipment={equipment} />;
      default:
        return <h2 className="text-xl p-6">Página no encontrada.</h2>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {!showWelcome && <LayoutHeader title={getPageTitle()} onNavigate={setCurrentPage} />}
      <main className="flex-grow">
        {renderPage()}
      </main>
    </div>
  );
};

export default App;