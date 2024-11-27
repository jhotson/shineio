import React, { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { ImagePlus, Loader } from 'lucide-react';

interface ListingForm {
  name: string;
  photo: string;
  description: string;
  price: string;
}

export default function CreateListing() {
  const { isAuthenticated, user } = useAuth0();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState<ListingForm>({
    name: '',
    photo: '',
    description: '',
    price: '',
  });

  if (!isAuthenticated || !user) {
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Here you would typically send this data to your backend
    console.log('New listing:', {
      ...form,
      userId: user.sub,
      createdAt: new Date().toISOString()
    });
    
    // Reset form after submission
    setForm({ name: '', photo: '', description: '', price: '' });
    setIsSubmitting(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-6">Create Your Avatar Listing</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Avatar Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
            placeholder="Enter a name for your avatar"
          />
        </div>

        <div>
          <label htmlFor="photo" className="block text-sm font-medium text-gray-700 mb-1">
            Photo URL
          </label>
          <div className="flex gap-2">
            <input
              type="url"
              id="photo"
              name="photo"
              value={form.photo}
              onChange={handleChange}
              required
              className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
              placeholder="Enter the URL of your photo"
            />
            <button type="button" className="p-2 text-gray-500 hover:text-indigo-600">
              <ImagePlus className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={form.description}
            onChange={handleChange}
            required
            rows={4}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
            placeholder="Describe your avatar and its unique features"
          />
        </div>

        <div>
          <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
            Price (USD)
          </label>
          <input
            type="number"
            id="price"
            name="price"
            value={form.price}
            onChange={handleChange}
            required
            min="0"
            step="0.01"
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
            placeholder="Enter price in USD"
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors disabled:bg-indigo-400"
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center gap-2">
              <Loader className="w-4 h-4 animate-spin" />
              Creating...
            </span>
          ) : (
            'Create Listing'
          )}
        </button>
      </form>
    </div>
  );
}