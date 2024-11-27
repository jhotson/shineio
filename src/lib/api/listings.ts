import { API_URL, getHeaders } from './config';

export interface Listing {
  id: number;
  name: string;
  description: string;
  price: number;
  isActive: boolean;
  images: string[];
  createdAt: string;
}

export interface CreateListingData {
  name: string;
  description: string;
  price: number;
  images: string[];
}

export const listingsApi = {
  getAll: async (token: string): Promise<Listing[]> => {
    const response = await fetch(`${API_URL}/listings`, {
      headers: getHeaders(token),
    });
    if (!response.ok) throw new Error('Failed to fetch listings');
    return response.json();
  },

  getUserListings: async (token: string): Promise<Listing[]> => {
    const response = await fetch(`${API_URL}/listings/user`, {
      headers: getHeaders(token),
    });
    if (!response.ok) throw new Error('Failed to fetch user listings');
    return response.json();
  },

  getListing: async (id: number, token: string): Promise<Listing> => {
    const response = await fetch(`${API_URL}/listings/${id}`, {
      headers: getHeaders(token),
    });
    if (!response.ok) throw new Error('Failed to fetch listing');
    return response.json();
  },

  createListing: async (data: CreateListingData, token: string): Promise<Listing> => {
    const response = await fetch(`${API_URL}/listings`, {
      method: 'POST',
      headers: getHeaders(token),
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Failed to create listing');
    return response.json();
  },

  updateListing: async (id: number, data: Partial<CreateListingData>, token: string): Promise<Listing> => {
    const response = await fetch(`${API_URL}/listings/${id}`, {
      method: 'PUT',
      headers: getHeaders(token),
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Failed to update listing');
    return response.json();
  },

  deleteListing: async (id: number, token: string): Promise<void> => {
    const response = await fetch(`${API_URL}/listings/${id}`, {
      method: 'DELETE',
      headers: getHeaders(token),
    });
    if (!response.ok) throw new Error('Failed to delete listing');
  },
};