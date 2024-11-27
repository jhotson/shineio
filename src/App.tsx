import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Marketplace from './pages/Marketplace';
import BrowsePage from './pages/BrowsePage';
import ProductDetail from './pages/ProductDetail';
import AccountPage from './pages/AccountPage';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import AuthGuard from './components/AuthGuard';

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navigation />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Marketplace />} />
          <Route path="/browse" element={<BrowsePage />} />
          <Route path="/avatar/:id" element={<ProductDetail />} />
          <Route
            path="/account/*"
            element={
              <AuthGuard>
                <AccountPage />
              </AuthGuard>
            }
          />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}