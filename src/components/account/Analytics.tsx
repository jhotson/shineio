import React from 'react';
import { DollarSign, Users, ShoppingCart, TrendingUp } from 'lucide-react';

const stats = [
  {
    label: 'Total Revenue',
    value: '$12,345',
    change: '+12%',
    icon: DollarSign,
    trend: 'up',
  },
  {
    label: 'Total Sales',
    value: '234',
    change: '+8%',
    icon: ShoppingCart,
    trend: 'up',
  },
  {
    label: 'Profile Views',
    value: '1,234',
    change: '+25%',
    icon: Users,
    trend: 'up',
  },
  {
    label: 'Conversion Rate',
    value: '3.2%',
    change: '-2%',
    icon: TrendingUp,
    trend: 'down',
  },
];

export default function Analytics() {
  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold">Analytics</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-white p-6 rounded-lg border border-gray-200"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-indigo-50 rounded-lg">
                <stat.icon className="w-6 h-6 text-indigo-600" />
              </div>
              <span className={`text-sm font-medium ${
                stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
              }`}>
                {stat.change}
              </span>
            </div>
            <h3 className="text-sm text-gray-500">{stat.label}</h3>
            <p className="text-2xl font-bold">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Placeholder for charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg border border-gray-200 h-80">
          <h3 className="font-semibold mb-4">Revenue Over Time</h3>
          <div className="h-64 bg-gray-50 rounded flex items-center justify-center text-gray-400">
            Revenue Chart
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg border border-gray-200 h-80">
          <h3 className="font-semibold mb-4">Sales by Category</h3>
          <div className="h-64 bg-gray-50 rounded flex items-center justify-center text-gray-400">
            Sales Chart
          </div>
        </div>
      </div>
    </div>
  );
}