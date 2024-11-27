import React, { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Save } from 'lucide-react';

export default function AccountSettings() {
  const { user } = useAuth0();
  const [form, setForm] = useState({
    displayName: user?.name || '',
    bio: '',
    email: user?.email || '',
    notifications: {
      sales: true,
      messages: true,
      marketing: false,
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically save to your backend
    console.log('Saving settings:', form);
  };

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold">Account Settings</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Display Name
            </label>
            <input
              type="text"
              value={form.displayName}
              onChange={(e) => setForm({ ...form, displayName: e.target.value })}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Bio
            </label>
            <textarea
              value={form.bio}
              onChange={(e) => setForm({ ...form, bio: e.target.value })}
              rows={4}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
              placeholder="Tell us about yourself..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
            />
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Notification Preferences</h3>
          <div className="space-y-2">
            {Object.entries(form.notifications).map(([key, value]) => (
              <label key={key} className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={value}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      notifications: {
                        ...form.notifications,
                        [key]: e.target.checked,
                      },
                    })
                  }
                  className="w-4 h-4 text-indigo-600 rounded focus:ring-indigo-500"
                />
                <span className="text-sm text-gray-700">
                  {key.charAt(0).toUpperCase() + key.slice(1)} notifications
                </span>
              </label>
            ))}
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="flex items-center gap-2 bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
          >
            <Save className="w-4 h-4" />
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}