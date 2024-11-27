import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Search, Menu, Bell, Sparkles, X } from 'lucide-react';
import { useAuth0 } from '@auth0/auth0-react';
import AuthButton from './AuthButton';
import UserProfile from './UserProfile';

export default function Navigation() {
  const { isAuthenticated } = useAuth0();
  const location = useLocation();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/browse?search=${encodeURIComponent(searchQuery)}`);
  };

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/browse', label: 'Browse' },
    { path: '/featured', label: 'Featured' },
    { path: '/how-it-works', label: 'How It Works' },
  ];

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link to="/" className="flex items-center gap-2">
            <Sparkles className="w-8 h-8 text-indigo-600" />
            <span className="text-xl font-bold">AvatarAI</span>
          </Link>
          
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map(({ path, label }) => (
              <Link
                key={path}
                to={path}
                className={`text-sm font-medium ${
                  location.pathname === path
                    ? 'text-indigo-600'
                    : 'text-gray-500 hover:text-gray-900'
                }`}
              >
                {label}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex flex-1 max-w-lg mx-8">
            <form onSubmit={handleSearch} className="w-full">
              <div className="relative w-full">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search licensed avatars..."
                  className="w-full px-4 py-2 pl-10 pr-4 rounded-full border border-gray-200 focus:outline-none focus:border-indigo-600"
                />
                <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
              </div>
            </form>
          </div>

          <div className="flex items-center gap-4">
            {isAuthenticated && (
              <Link
                to="/account"
                className="px-4 py-2 text-sm font-medium text-indigo-600 bg-indigo-50 rounded-full hover:bg-indigo-100"
              >
                My Account
              </Link>
            )}
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <Bell className="w-5 h-5" />
            </button>
            <UserProfile />
            <AuthButton />
            <button 
              className="md:hidden p-2 hover:bg-gray-100 rounded-full"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navLinks.map(({ path, label }) => (
              <Link
                key={path}
                to={path}
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  location.pathname === path
                    ? 'bg-indigo-50 text-indigo-600'
                    : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {label}
              </Link>
            ))}
          </div>
          <div className="px-4 py-3">
            <form onSubmit={handleSearch} className="w-full">
              <div className="relative w-full">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search licensed avatars..."
                  className="w-full px-4 py-2 pl-10 pr-4 rounded-full border border-gray-200 focus:outline-none focus:border-indigo-600"
                />
                <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
              </div>
            </form>
          </div>
        </div>
      )}
    </nav>
  );
}