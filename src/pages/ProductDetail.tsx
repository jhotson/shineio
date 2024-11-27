import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { Star, Download, Shield, Heart } from 'lucide-react';

// Initialize Stripe (replace with your publishable key)
const stripePromise = loadStripe('pk_test_your_key');

const featuredAvatars = [
  {
    id: "1",
    name: "Emma Anderson",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80",
    price: 299,
    rating: 4.9,
    downloads: 12.5,
    category: "Influencer",
    description: "Professional AI avatar perfect for content creation and social media presence."
  },
  {
    id: "2",
    name: "David Chen",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80",
    price: 349,
    rating: 4.8,
    downloads: 8.2,
    category: "Professional",
    description: "Corporate-ready AI avatar ideal for business presentations and professional networking."
  },
  {
    id: "3",
    name: "Sarah Williams",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80",
    price: 399,
    rating: 4.9,
    downloads: 15.7,
    category: "Educator",
    description: "Engaging educator avatar designed for online learning and educational content."
  }
];

export default function ProductDetail() {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  
  const avatar = featuredAvatars.find(a => a.id === id);

  if (!avatar) {
    return <div>Avatar not found</div>;
  }

  const handleCheckout = async () => {
    setIsLoading(true);
    const stripe = await stripePromise;

    // Here you would typically make an API call to your backend to create a Stripe checkout session
    // For demonstration, we'll simulate the response
    const session = {
      id: 'cs_test_...',
    };

    // Redirect to Stripe Checkout
    if (stripe) {
      const { error } = await stripe.redirectToCheckout({
        sessionId: session.id,
      });

      if (error) {
        console.error('Error:', error);
      }
    }
    setIsLoading(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Image Section */}
        <div className="space-y-4">
          <div className="aspect-square rounded-2xl overflow-hidden bg-gray-100">
            <img
              src={avatar.image}
              alt={avatar.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="grid grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="aspect-square rounded-lg overflow-hidden bg-gray-100">
                <img
                  src={avatar.image}
                  alt={`${avatar.name} preview ${i + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Content Section */}
        <div className="space-y-6">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold">{avatar.name}</h1>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                <span className="font-medium">{avatar.rating}</span>
              </div>
              <div className="flex items-center gap-1 text-gray-600">
                <Download className="w-5 h-5" />
                <span>{avatar.downloads}k downloads</span>
              </div>
            </div>
          </div>

          <div className="border-t border-b border-gray-200 py-6">
            <div className="text-3xl font-bold mb-4">
              ${avatar.price}
              <span className="text-sm font-normal text-gray-600 ml-2">One-time purchase</span>
            </div>
            <div className="space-y-4">
              <button
                onClick={handleCheckout}
                disabled={isLoading}
                className="w-full bg-indigo-600 text-white py-3 px-4 rounded-lg hover:bg-indigo-700 transition-colors disabled:bg-indigo-400"
              >
                {isLoading ? 'Processing...' : 'Buy Now'}
              </button>
              <button className="w-full border border-gray-300 py-3 px-4 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
                <Heart className="w-5 h-5" />
                Add to Wishlist
              </button>
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Description</h2>
            <p className="text-gray-600">{avatar.description}</p>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-semibold">License Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start gap-3">
                <Shield className="w-5 h-5 text-green-600 mt-1" />
                <div>
                  <h3 className="font-medium">Commercial License</h3>
                  <p className="text-sm text-gray-600">Use in commercial projects and applications</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Download className="w-5 h-5 text-green-600 mt-1" />
                <div>
                  <h3 className="font-medium">Lifetime Access</h3>
                  <p className="text-sm text-gray-600">Download and use forever</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}