import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Auth0Provider } from '@auth0/auth0-react';
import App from './App.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Auth0Provider
        domain="dev-ryb2nxovei76xysy.us.auth0.com"
        clientId="j0zwtU35sPbthDq38N2TZUF6brCJDoA6"
        authorizationParams={{
          redirect_uri: window.location.origin,
          audience: "https://api.avatarai.com"
        }}
      >
        <App />
      </Auth0Provider>
    </BrowserRouter>
  </StrictMode>
);