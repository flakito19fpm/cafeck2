import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, addDoc, updateDoc, doc, deleteDoc } from 'firebase/firestore';

// Importa la configuración de Firebase desde firebaseConfig.js
import { firebaseConfig } from './firebaseConfig';

// Inicializa Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Funciones para interactuar con Firestore

// Clientes
export const getClients = async () => {
  const clientsCol = collection(db, 'clients');
  const clientSnapshot = await getDocs(clientsCol);
  const clientList = clientSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  return clientList;
};

export const addClient = async (clientData) => {
  const docRef = await addDoc(collection(db, 'clients'), clientData);
  return docRef.id;
};

export const updateClient = async (id, clientData) => {
  const clientRef = doc(db, 'clients', id);
  await updateDoc(clientRef, clientData);
};

export const deleteClient = async (id) => {
  const clientRef = doc(db, 'clients', id);
  await deleteDoc(clientRef);
};

// Equipos
export const getEquipment = async () => {
  const equipmentCol = collection(db, 'equipment');
  const equipmentSnapshot = await getDocs(equipmentCol);
  const equipmentList = equipmentSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  return equipmentList;
};

export const addEquipment = async (equipmentData) => {
  const docRef = await addDoc(collection(db, 'equipment'), equipmentData);
  return docRef.id;
};

export const updateEquipment = async (id, equipmentData) => {
  const equipmentRef = doc(db, 'equipment', id);
  await updateDoc(equipmentRef, equipmentData);
};

export const deleteEquipment = async (id) => {
  const equipmentRef = doc(db, 'equipment', id);
  await deleteDoc(equipmentRef);
};

// Servicios/Mantenimientos
export const getServices = async () => {
  const servicesCol = collection(db, 'services');
  const serviceSnapshot = await getDocs(servicesCol);
  const serviceList = serviceSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  return serviceList;
};

export const addService = async (serviceData) => {
  const docRef = await addDoc(collection(db, 'services'), serviceData);
  return docRef.id;
};

export const updateService = async (id, serviceData) => {
  const serviceRef = doc(db, 'services', id);
  await updateDoc(serviceRef, serviceData);
};

export const deleteService = async (id) => {
  const serviceRef = doc(db, 'services', id);
  await deleteDoc(serviceRef);
};