import React, { useState } from 'react';

const LoginPage = ({ onLogin = () => {} }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');
    // Simple hardcoded login for demonstration
    if (username === 'admin' && password === 'admin') {
      onLogin(true);
    } else {
      setError('Usuario o contraseña incorrectos.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-200 w-full max-w-md">
        <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-6">Acceso a CoffeeCare Pro</h2>
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">Usuario</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-1 block w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-black transition"
              placeholder="Ingresa tu usuario"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Contraseña</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-black transition"
              placeholder="Ingresa tu contraseña"
              required
            />
          </div>
          {error && (
            <p className="text-red-600 text-sm text-center">{error}</p>
          )}
          <button
            type="submit"
            className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition-colors font-semibold text-lg shadow-md"
          >
            Iniciar Sesión
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;