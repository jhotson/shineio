import { API_URL, getHeaders } from './config';

export interface User {
  id: string;
  email: string;
  name: string;
  bio: string;
  createdAt: string;
}

export interface NotificationPreferences {
  sales: boolean;
  messages: boolean;
  marketing: boolean;
}

export const usersApi = {
  getProfile: async (token: string): Promise<User> => {
    const response = await fetch(`${API_URL}/users/profile`, {
      headers: getHeaders(token),
    });
    if (!response.ok) throw new Error('Failed to fetch profile');
    return response.json();
  },

  updateProfile: async (data: Partial<User>, token: string): Promise<User> => {
    const response = await fetch(`${API_URL}/users/profile`, {
      method: 'PUT',
      headers: getHeaders(token),
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Failed to update profile');
    return response.json();
  },

  updateNotifications: async (preferences: NotificationPreferences, token: string): Promise<NotificationPreferences> => {
    const response = await fetch(`${API_URL}/users/notifications`, {
      method: 'PUT',
      headers: getHeaders(token),
      body: JSON.stringify({ preferences }),
    });
    if (!response.ok) throw new Error('Failed to update notifications');
    return response.json();
  },
};