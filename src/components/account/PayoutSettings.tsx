import React, { useState } from 'react';
import { CreditCard, Plus, Trash2 } from 'lucide-react';

interface PaymentMethod {
  id: string;
  last4: string;
  brand: string;
  isDefault: boolean;
}

export default function PayoutSettings() {
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([
    { id: '1', last4: '4242', brand: 'visa', isDefault: true },
    { id: '2', last4: '5555', brand: 'mastercard', isDefault: false },
  ]);

  const setDefaultMethod = (id: string) => {
    setPaymentMethods(methods =>
      methods.map(method => ({
        ...method,
        isDefault: method.id === id,
      }))
    );
  };

  const removeMethod = (id: string) => {
    setPaymentMethods(methods =>
      methods.filter(method => method.id !== id)
    );
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Payout Settings</h2>
        <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
          <Plus className="w-4 h-4" />
          Add Payment Method
        </button>
      </div>

      <div className="space-y-4">
        {paymentMethods.map((method) => (
          <div
            key={method.id}
            className="flex items-center justify-between p-4 border border-gray-200 rounded-lg"
          >
            <div className="flex items-center gap-4">
              <CreditCard className={`w-8 h-8 ${
                method.brand === 'visa' ? 'text-blue-600' : 'text-red-600'
              }`} />
              <div>
                <p className="font-medium">
                  {method.brand.charAt(0).toUpperCase() + method.brand.slice(1)} ****{method.last4}
                </p>
                {method.isDefault && (
                  <span className="text-sm text-gray-500">Default payment method</span>
                )}
              </div>
            </div>
            <div className="flex items-center gap-2">
              {!method.isDefault && (
                <>
                  <button
                    onClick={() => setDefaultMethod(method.id)}
                    className="text-sm text-indigo-600 hover:text-indigo-700"
                  >
                    Set as default
                  </button>
                  <button
                    onClick={() => removeMethod(method.id)}
                    className="p-2 text-gray-400 hover:text-red-600"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="bg-gray-50 rounded-lg p-6">
        <h3 className="font-semibold mb-2">Payout Schedule</h3>
        <p className="text-sm text-gray-600 mb-4">
          Payments are automatically processed every Monday for the previous week's earnings.
        </p>
        <div className="flex items-center gap-4">
          <select className="px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-600 focus:border-transparent">
            <option value="weekly">Weekly</option>
            <option value="biweekly">Bi-weekly</option>
            <option value="monthly">Monthly</option>
          </select>
          <button className="text-indigo-600 hover:text-indigo-700 font-medium">
            Update Schedule
          </button>
        </div>
      </div>
    </div>
  );
}