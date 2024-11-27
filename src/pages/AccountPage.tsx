import React, { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Settings, CreditCard, Image, DollarSign, BarChart } from 'lucide-react';
import ListingManager from '../components/account/ListingManager';
import PayoutSettings from '../components/account/PayoutSettings';
import AccountSettings from '../components/account/AccountSettings';
import Analytics from '../components/account/Analytics';

type TabType = 'listings' | 'payouts' | 'settings' | 'analytics';

export default function AccountPage() {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const [activeTab, setActiveTab] = useState<TabType>('listings');

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated || !user) {
    return <div>Please log in to access your account.</div>;
  }

  const tabs = [
    { id: 'listings', label: 'My Listings', icon: Image },
    { id: 'payouts', label: 'Payouts', icon: DollarSign },
    { id: 'analytics', label: 'Analytics', icon: BarChart },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar */}
        <div className="md:w-64 flex-shrink-0">
          <div className="bg-white rounded-lg shadow-sm p-6 space-y-6">
            <div className="flex items-center gap-4">
              <img
                src={user.picture}
                alt={user.name}
                className="w-16 h-16 rounded-full"
              />
              <div>
                <h2 className="font-semibold">{user.name}</h2>
                <p className="text-sm text-gray-500">{user.email}</p>
              </div>
            </div>

            <nav className="space-y-1">
              {tabs.map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => setActiveTab(id as TabType)}
                  className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    activeTab === id
                      ? 'bg-indigo-50 text-indigo-600'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {label}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          <div className="bg-white rounded-lg shadow-sm p-6">
            {activeTab === 'listings' && <ListingManager />}
            {activeTab === 'payouts' && <PayoutSettings />}
            {activeTab === 'analytics' && <Analytics />}
            {activeTab === 'settings' && <AccountSettings />}
          </div>
        </div>
      </div>
    </div>
  );
}