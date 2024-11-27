import { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useLocation, useNavigate } from 'react-router-dom';

export function useAuthRedirect() {
  const { isAuthenticated } = useAuth0();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const from = (location.state as any)?.from?.pathname || '/';
    if (isAuthenticated) {
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, location, navigate]);
}