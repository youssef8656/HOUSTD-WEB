export type Role = 'student' | 'owner' | 'admin';
export type ApartmentStatus = 'Pending' | 'Approved' | 'Rejected';
export type RequestStatus = 'Pending' | 'Approved' | 'Rejected';

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  password: string;
}

export interface Apartment {
  id: string;
  ownerId: string;
  ownerName: string;
  title: string;
  address: string;
  price: number;
  beds: number;
  rating: number;
  imageUrl: string;
  description: string;
  status: ApartmentStatus;
  createdAt: number;
}

export interface ApartmentRequest {
  id: string;
  studentId: string;
  studentName: string;
  studentEmail: string;
  apartmentId: string;
  apartmentTitle: string;
  status: RequestStatus;
  createdAt: number;
  message: string;
}
