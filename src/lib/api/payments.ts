import { API_URL, getHeaders } from './config';

export interface PaymentMethod {
  id: number;
  last4: string;
  brand: string;
  isDefault: boolean;
  createdAt: string;
}

export interface PaymentIntent {
  clientSecret: string;
}

export const paymentsApi = {
  createPaymentIntent: async (amount: number, token: string): Promise<PaymentIntent> => {
    const response = await fetch(`${API_URL}/payments/create-intent`, {
      method: 'POST',
      headers: getHeaders(token),
      body: JSON.stringify({ amount }),
    });
    if (!response.ok) throw new Error('Failed to create payment intent');
    return response.json();
  },

  getPaymentMethods: async (token: string): Promise<PaymentMethod[]> => {
    const response = await fetch(`${API_URL}/payments/methods`, {
      headers: getHeaders(token),
    });
    if (!response.ok) throw new Error('Failed to fetch payment methods');
    return response.json();
  },

  addPaymentMethod: async (data: { paymentMethodId: string; last4: string; brand: string }, token: string): Promise<PaymentMethod> => {
    const response = await fetch(`${API_URL}/payments/methods`, {
      method: 'POST',
      headers: getHeaders(token),
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Failed to add payment method');
    return response.json();
  },

  setDefaultPaymentMethod: async (id: number, token: string): Promise<PaymentMethod> => {
    const response = await fetch(`${API_URL}/payments/methods/${id}/default`, {
      method: 'PUT',
      headers: getHeaders(token),
    });
    if (!response.ok) throw new Error('Failed to set default payment method');
    return response.json();
  },

  deletePaymentMethod: async (id: number, token: string): Promise<void> => {
    const response = await fetch(`${API_URL}/payments/methods/${id}`, {
      method: 'DELETE',
      headers: getHeaders(token),
    });
    if (!response.ok) throw new Error('Failed to delete payment method');
  },
};