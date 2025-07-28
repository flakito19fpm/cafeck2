import React, { useState, useEffect } from 'react';

const ClientForm = ({ client = null, onSubmit = () => {}, onCancel = () => {} }) => {
  const [name, setName] = useState(client ? client.name : '');
  const [contact, setContact] = useState(client ? client.contact : '');
  const [phone, setPhone] = useState(client ? client.phone : '');
  const [email, setEmail] = useState(client ? client.email : '');
  const [address, setAddress] = useState(client ? client.address : '');
  const [zone, setZone] = useState(client ? (['Playa del Carmen', 'Tulum', 'Cancun'].includes(client.zone) ? client.zone : 'Otro') : '');
  const [otherZone, setOtherZone] = useState(client ? (['Playa del Carmen', 'Tulum', 'Cancun'].includes(client.zone) ? '' : client.zone) : '');
  const [status, setStatus] = useState(client ? client.status : 'Activo');

  useEffect(() => {
    if (client) {
      setName(client.name);
      setContact(client.contact);
      setPhone(client.phone);
      setEmail(client.email);
      setAddress(client.address);
      if (['Playa del Carmen', 'Tulum', 'Cancun'].includes(client.zone)) {
        setZone(client.zone);
        setOtherZone('');
      } else {
        setZone('Otro');
        setOtherZone(client.zone);
      }
      setStatus(client.status);
    }
  }, [client]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const finalZone = zone === 'Otro' ? otherZone : zone;
    onSubmit({ ...client, name, contact, phone, email, address, zone: finalZone, status });
  };

  return (
    <div className="p-6 max-w-2xl mx-auto bg-white rounded-xl shadow-lg border border-gray-100">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">{client ? 'Editar Cliente' : 'Agregar Nuevo Cliente'}</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nombre Comercial</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-500 transition"
            required
          />
        </div>
        <div>
          <label htmlFor="contact" className="block text-sm font-medium text-gray-700">Titular o Representante</label>
          <input
            type="text"
            id="contact"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-500 transition"
            required

          />
        </div>
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Teléfono</label>
          <input
            type="tel"
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-500 transition"
            required
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Correo (Opcional)</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-500 transition"
          />
        </div>
        <div>
          <label htmlFor="address" className="block text-sm font-medium text-gray-700">Dirección o Ubicación</label>
          <textarea
            id="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            rows="3"
            className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-500 transition resize-none"
            required
          ></textarea>
        </div>
        <div>
          <label htmlFor="zone" className="block text-sm font-medium text-gray-700">Zona</label>
          <select
            id="zone"
            value={zone}
            onChange={(e) => setZone(e.target.value)}
            className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-500 transition"
            required
          >
            <option value="">Selecciona una zona</option>
            <option value="Playa del Carmen">Playa del Carmen</option>
            <option value="Tulum">Tulum</option>
            <option value="Cancun">Cancun</option>
            <option value="Otro">Otro</option>
          </select>
        </div>
        {zone === 'Otro' && (
          <div>
            <label htmlFor="otherZone" className="block text-sm font-medium text-gray-700">Especifica la Zona</label>
            <input
              type="text"
              id="otherZone"
              value={otherZone}
              onChange={(e) => setOtherZone(e.target.value)}
              className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-500 transition"
              required
            />
          </div>
        )}
        <div>
          <label htmlFor="status" className="block text-sm font-medium text-gray-700">Estado</label>
          <select
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-500 transition"
            required
          >
            <option value="Activo">Activo</option>
            <option value="Dado de Baja">Dado de Baja</option>
          </select>
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
            {client ? 'Actualizar Cliente' : 'Guardar Cliente'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ClientForm;