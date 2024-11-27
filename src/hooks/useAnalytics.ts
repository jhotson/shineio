import { useApi } from './useApi';
import { analyticsApi } from '../lib/api/analytics';

export function useAnalytics() {
  const { execute: getOverview, ...overviewState } = useApi(analyticsApi.getOverview);
  const { execute: getRevenue, ...revenueState } = useApi(analyticsApi.getRevenue);
  const { execute: getSales, ...salesState } = useApi(analyticsApi.getSales);

  return {
    // Overview
    overview: overviewState.data,
    loadingOverview: overviewState.loading,
    overviewError: overviewState.error,
    fetchOverview: getOverview,

    // Revenue
    revenue: revenueState.data,
    loadingRevenue: revenueState.loading,
    revenueError: revenueState.error,
    fetchRevenue: (startDate: string, endDate: string) => getRevenue(startDate, endDate),

    // Sales
    sales: salesState.data,
    loadingSales: salesState.loading,
    salesError: salesState.error,
    fetchSales: (startDate: string, endDate: string) => getSales(startDate, endDate),
  };
}