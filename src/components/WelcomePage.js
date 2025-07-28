import React from 'react';

const WelcomePage = ({ onEnterApp = () => {} }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black p-4">
      <div className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg p-8 rounded-3xl shadow-2xl border border-gray-700 w-full max-w-3xl text-center transform transition-all duration-700 scale-95 hover:scale-100 relative overflow-hidden">
        {/* Background subtle gradient/pattern */}
        <div className="absolute inset-0 opacity-20" style={{ background: 'radial-gradient(circle at top left, rgba(255,255,255,0.1) 0%, transparent 50%), radial-gradient(circle at bottom right, rgba(255,255,255,0.1) 0%, transparent 50%)' }}></div>
        
        <div className="relative z-10">
          <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-6 tracking-tight leading-tight drop-shadow-md">
            Bienvenido a <span className="text-amber-500">CoffeeSupport</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 mb-10 leading-relaxed font-light">
            Tu plataforma definitiva para la gestión y mantenimiento de equipos de café.
            Optimiza tus operaciones y asegura la excelencia en cada taza.
          </p>
          <button
            onClick={onEnterApp}
            className="px-10 py-4 bg-amber-600 text-white rounded-full hover:bg-amber-700 transition-all duration-300 font-bold text-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 focus:outline-none focus:ring-4 focus:ring-amber-300 focus:ring-opacity-75"
          >
            Acceder al Sistema
          </button>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;