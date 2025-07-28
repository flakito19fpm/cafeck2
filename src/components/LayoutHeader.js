import React, { useState } from 'react';

const LayoutHeader = ({ title = 'Dashboard', onNavigate = () => {} }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleNavigation = (page) => {
    onNavigate(page);
    setIsMenuOpen(false); // Close menu on navigation
  };

  return (
    <header className="w-full bg-white p-4 border-b border-gray-200 flex items-center justify-between shadow-lg relative">
      <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">{title}</h1>
      
      {/* Mobile menu button */}
      <button onClick={toggleMenu} className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
        </svg>
      </button>

      {/* Desktop navigation */}
      <nav className="hidden md:flex space-x-6">
        <button onClick={() => handleNavigation('dashboard')} className="text-gray-700 hover:text-amber-700 transition-colors text-lg font-medium">Inicio</button>
        <button onClick={() => handleNavigation('clients')} className="text-gray-700 hover:text-amber-700 transition-colors text-lg font-medium">Clientes</button>
        <button onClick={() => handleNavigation('equipment')} className="text-gray-700 hover:text-amber-700 transition-colors text-lg font-medium">Equipos</button>
        <button onClick={() => handleNavigation('maintenanceList')} className="text-gray-700 hover:text-amber-700 transition-colors text-lg font-medium">Mantenimientos Pendientes</button>
        <button onClick={() => handleNavigation('serviceHistory')} className="text-gray-700 hover:text-amber-700 transition-colors text-lg font-medium">Historial de Servicios</button>
        <button onClick={() => handleNavigation('reports')} className="text-gray-700 hover:text-amber-700 transition-colors text-lg font-medium">Reportes</button>
      </nav>

      {/* Mobile menu overlay */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white border-t border-gray-200 shadow-lg z-10">
          <nav className="flex flex-col p-4 space-y-2">
            <button onClick={() => handleNavigation('dashboard')} className="block text-left py-2 px-4 text-gray-800 hover:bg-gray-100 rounded-lg transition-colors">Inicio</button>
            <button onClick={() => handleNavigation('clients')} className="block text-left py-2 px-4 text-gray-800 hover:bg-gray-100 rounded-lg transition-colors">Clientes</button>
            <button onClick={() => handleNavigation('equipment')} className="block text-left py-2 px-4 text-gray-800 hover:bg-gray-100 rounded-lg transition-colors">Equipos</button>
            <button onClick={() => handleNavigation('maintenanceList')} className="block text-left py-2 px-4 text-gray-800 hover:bg-gray-100 rounded-lg transition-colors">Mantenimientos Pendientes</button>
            <button onClick={() => handleNavigation('serviceHistory')} className="block text-left py-2 px-4 text-gray-800 hover:bg-gray-100 rounded-lg transition-colors">Historial de Servicios</button>
            <button onClick={() => handleNavigation('reports')} className="block text-left py-2 px-4 text-gray-800 hover:bg-gray-100 rounded-lg transition-colors">Reportes</button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default LayoutHeader;