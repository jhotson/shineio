import React, { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import AvatarCard from '../components/AvatarCard';
import CategoryFilter from '../components/CategoryFilter';
import CreateListing from '../components/CreateListing';

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

export default function Marketplace() {
  const { isAuthenticated, isLoading } = useAuth0();
  const [showCreateListing, setShowCreateListing] = useState(false);

  return (
    <>
      {/* Hero Section */}
      <div className="bg-indigo-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Licensed Digital Twins for Your Projects
            </h1>
            <p className="text-lg md:text-xl text-indigo-100 mb-8 max-w-2xl mx-auto">
              Access thousands of authentic AI avatars from real people who've licensed their likeness for your creative needs.
            </p>
            {!isLoading && (
              <button 
                onClick={() => isAuthenticated ? setShowCreateListing(true) : window.location.href = '#featured'}
                className="bg-white text-indigo-600 px-8 py-3 rounded-full font-semibold hover:bg-indigo-50 transition-colors"
              >
                {isAuthenticated ? 'Create Your Avatar' : 'Browse Avatars'}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {showCreateListing && isAuthenticated ? (
          <CreateListing />
        ) : (
          <>
            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-6">Browse Categories</h2>
              <CategoryFilter />
            </div>

            <div className="mb-12" id="featured">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Featured Avatars</h2>
                <button className="text-indigo-600 hover:text-indigo-700 font-semibold">
                  View All
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {featuredAvatars.map((avatar) => (
                  <AvatarCard key={avatar.id} {...avatar} />
                ))}
              </div>
            </div>
          </>
        )}
      </main>
    </>
  );
}