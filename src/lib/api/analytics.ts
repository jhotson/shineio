import { API_URL, getHeaders } from './config';

export interface AnalyticsOverview {
  revenue: number;
  sales: number;
  views: number;
  conversionRate: number;
}

export interface TimeseriesData {
  date: string;
  amount?: number;
  count?: number;
}

export const analyticsApi = {
  getOverview: async (token: string): Promise<AnalyticsOverview> => {
    const response = await fetch(`${API_URL}/analytics/overview`, {
      headers: getHeaders(token),
    });
    if (!response.ok) throw new Error('Failed to fetch analytics overview');
    return response.json();
  },

  getRevenue: async (startDate: string, endDate: string, token: string): Promise<TimeseriesData[]> => {
    const response = await fetch(
      `${API_URL}/analytics/revenue?startDate=${startDate}&endDate=${endDate}`,
      { headers: getHeaders(token) }
    );
    if (!response.ok) throw new Error('Failed to fetch revenue data');
    return response.json();
  },

  getSales: async (startDate: string, endDate: string, token: string): Promise<TimeseriesData[]> => {
    const response = await fetch(
      `${API_URL}/analytics/sales?startDate=${startDate}&endDate=${endDate}`,
      { headers: getHeaders(token) }
    );
    if (!response.ok) throw new Error('Failed to fetch sales data');
    return response.json();
  },
};