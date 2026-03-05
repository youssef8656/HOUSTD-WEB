import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import type { Apartment, ApartmentRequest, ApartmentStatus, RequestStatus } from '../types';

interface DataContextType {
  apartments: Apartment[];
  requests: ApartmentRequest[];
  addApartment: (apt: Omit<Apartment, 'id' | 'createdAt'>) => void;
  updateApartmentStatus: (id: string, status: ApartmentStatus) => void;
  deleteApartment: (id: string) => void;
  addRequest: (req: Omit<ApartmentRequest, 'id' | 'createdAt'>) => void;
  updateRequestStatus: (id: string, status: RequestStatus) => void;
  savedApartments: string[];
  toggleSaved: (id: string) => void;
}

const DataContext = createContext<DataContextType | null>(null);

const APARTMENT_IMAGES = [
  'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=600&h=400&fit=crop',
  'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600&h=400&fit=crop',
  'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&h=400&fit=crop',
  'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=600&h=400&fit=crop',
  'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=600&h=400&fit=crop',
  'https://images.unsplash.com/photo-1536376072261-38c75010e6c9?w=600&h=400&fit=crop',
];

const SEED_APARTMENTS: Apartment[] = [
  {
    id: 'apt-1', ownerId: 'owner-1', ownerName: 'Ahmed Al-Rashid',
    title: 'Modern Studio Near Campus', address: '123 University Ave, Downtown',
    price: 450, beds: 1, rating: 4.5, imageUrl: APARTMENT_IMAGES[0],
    description: 'A cozy modern studio apartment just 5 minutes walk from the university campus. Fully furnished with high-speed internet, air conditioning, and a small kitchen.', status: 'Approved', createdAt: Date.now() - 86400000 * 10
  },
  {
    id: 'apt-2', ownerId: 'owner-1', ownerName: 'Ahmed Al-Rashid',
    title: 'Spacious 2BR Student Flat', address: '45 College Road, West Side',
    price: 700, beds: 2, rating: 4.2, imageUrl: APARTMENT_IMAGES[1],
    description: 'Perfect for sharing! Two separate bedrooms with a shared living room and kitchen. Close to public transportation and grocery stores.', status: 'Approved', createdAt: Date.now() - 86400000 * 8
  },
  {
    id: 'apt-3', ownerId: 'owner-2', ownerName: 'Sara Mansour',
    title: 'Luxury Penthouse Suite', address: '78 Park Lane, City Center',
    price: 1200, beds: 3, rating: 4.8, imageUrl: APARTMENT_IMAGES[2],
    description: 'Premium penthouse with stunning city views. Three bedrooms, two bathrooms, fully equipped kitchen, and a private terrace.', status: 'Approved', createdAt: Date.now() - 86400000 * 5
  },
  {
    id: 'apt-4', ownerId: 'owner-2', ownerName: 'Sara Mansour',
    title: 'Budget Room in Shared House', address: '12 Elm Street, North Quarter',
    price: 280, beds: 1, rating: 3.9, imageUrl: APARTMENT_IMAGES[3],
    description: 'Affordable private room in a shared house with 3 other students. Shared kitchen, bathroom, and living area. All bills included.', status: 'Pending', createdAt: Date.now() - 86400000 * 3
  },
  {
    id: 'apt-5', ownerId: 'owner-1', ownerName: 'Ahmed Al-Rashid',
    title: 'Renovated Apartment with Balcony', address: '99 Sunset Boulevard, East End',
    price: 550, beds: 2, rating: 4.4, imageUrl: APARTMENT_IMAGES[4],
    description: 'Recently renovated apartment with a beautiful balcony. Two bedrooms, modern bathroom, and a fully equipped kitchen. Quiet neighborhood.', status: 'Pending', createdAt: Date.now() - 86400000 * 1
  },
  {
    id: 'apt-6', ownerId: 'owner-2', ownerName: 'Sara Mansour',
    title: 'Cozy Loft Near Library', address: '33 Scholar Way, Academic District',
    price: 380, beds: 1, rating: 4.1, imageUrl: APARTMENT_IMAGES[5],
    description: 'Charming loft-style apartment right next to the university library. Perfect for focused students who love a quiet environment.', status: 'Approved', createdAt: Date.now() - 86400000 * 7
  },
];

const SEED_REQUESTS: ApartmentRequest[] = [
  {
    id: 'req-1', studentId: 'student-1', studentName: 'Youssef Khalil', studentEmail: 'youssef@houstd.com',
    apartmentId: 'apt-1', apartmentTitle: 'Modern Studio Near Campus',
    status: 'Pending', createdAt: Date.now() - 86400000 * 2, message: 'I am a 3rd year CS student looking for accommodation near campus.'
  },
  {
    id: 'req-2', studentId: 'student-2', studentName: 'Nour Hassan', studentEmail: 'nour@houstd.com',
    apartmentId: 'apt-2', apartmentTitle: 'Spacious 2BR Student Flat',
    status: 'Approved', createdAt: Date.now() - 86400000 * 4, message: 'My friend and I would love to share this apartment for the upcoming semester.'
  },
];

export function DataProvider({ children }: { children: React.ReactNode }) {
  const [apartments, setApartments] = useState<Apartment[]>([]);
  const [requests, setRequests] = useState<ApartmentRequest[]>([]);
  const [savedApartments, setSavedApartments] = useState<string[]>([]);

  useEffect(() => {
    const storedApts = localStorage.getItem('houstd_apartments');
    const storedReqs = localStorage.getItem('houstd_requests');
    const storedSaved = localStorage.getItem('houstd_saved');
    if (storedApts) setApartments(JSON.parse(storedApts));
    else {
      setApartments(SEED_APARTMENTS);
      localStorage.setItem('houstd_apartments', JSON.stringify(SEED_APARTMENTS));
    }
    if (storedReqs) setRequests(JSON.parse(storedReqs));
    else {
      setRequests(SEED_REQUESTS);
      localStorage.setItem('houstd_requests', JSON.stringify(SEED_REQUESTS));
    }
    if (storedSaved) setSavedApartments(JSON.parse(storedSaved));
  }, []);

  const persist = useCallback((key: string, data: unknown) => {
    localStorage.setItem(key, JSON.stringify(data));
  }, []);

  const addApartment = useCallback((apt: Omit<Apartment, 'id' | 'createdAt'>) => {
    const newApt: Apartment = { ...apt, id: `apt-${Date.now()}`, createdAt: Date.now() };
    setApartments(prev => {
      const updated = [newApt, ...prev];
      persist('houstd_apartments', updated);
      return updated;
    });
  }, [persist]);

  const updateApartmentStatus = useCallback((id: string, status: ApartmentStatus) => {
    setApartments(prev => {
      const updated = prev.map(a => a.id === id ? { ...a, status } : a);
      persist('houstd_apartments', updated);
      return updated;
    });
  }, [persist]);

  const deleteApartment = useCallback((id: string) => {
    setApartments(prev => {
      const updated = prev.filter(a => a.id !== id);
      persist('houstd_apartments', updated);
      return updated;
    });
  }, [persist]);

  const addRequest = useCallback((req: Omit<ApartmentRequest, 'id' | 'createdAt'>) => {
    const newReq: ApartmentRequest = { ...req, id: `req-${Date.now()}`, createdAt: Date.now() };
    setRequests(prev => {
      const updated = [newReq, ...prev];
      persist('houstd_requests', updated);
      return updated;
    });
  }, [persist]);

  const updateRequestStatus = useCallback((id: string, status: RequestStatus) => {
    setRequests(prev => {
      const updated = prev.map(r => r.id === id ? { ...r, status } : r);
      persist('houstd_requests', updated);
      return updated;
    });
  }, [persist]);

  const toggleSaved = useCallback((id: string) => {
    setSavedApartments(prev => {
      const updated = prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id];
      persist('houstd_saved', updated);
      return updated;
    });
  }, [persist]);

  return (
    <DataContext.Provider value={{ apartments, requests, addApartment, updateApartmentStatus, deleteApartment, addRequest, updateRequestStatus, savedApartments, toggleSaved }}>
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const ctx = useContext(DataContext);
  if (!ctx) throw new Error('useData must be used within DataProvider');
  return ctx;
}
