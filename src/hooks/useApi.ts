import { useState, useCallback } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

interface ApiState<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
}

interface UseApiOptions {
  onSuccess?: (data: any) => void;
  onError?: (error: Error) => void;
}

export function useApi<T>(
  apiFunction: (token: string, ...args: any[]) => Promise<T>,
  options: UseApiOptions = {}
) {
  const { getAccessTokenSilently } = useAuth0();
  const [state, setState] = useState<ApiState<T>>({
    data: null,
    loading: false,
    error: null,
  });

  const execute = useCallback(
    async (...args: any[]) => {
      try {
        setState(prev => ({ ...prev, loading: true, error: null }));
        const token = await getAccessTokenSilently();
        const data = await apiFunction(token, ...args);
        setState({ data, loading: false, error: null });
        options.onSuccess?.(data);
        return data;
      } catch (error) {
        const err = error instanceof Error ? error : new Error('An error occurred');
        setState(prev => ({ ...prev, loading: false, error: err }));
        options.onError?.(err);
        throw err;
      }
    },
    [apiFunction, getAccessTokenSilently, options]
  );

  return {
    ...state,
    execute,
  };
}