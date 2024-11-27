import React from 'react';
import { Filters } from '../../pages/BrowsePage';
import AvatarCard from '../AvatarCard';

interface AvatarGridProps {
  filters: Filters;
  sortBy: string;
}

// This would typically come from your API/database
const avatars = [
  {
    id: "1",
    name: "Emma Anderson",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80",
    price: 299,
    rating: 4.9,
    downloads: 12.5,
    category: "Influencer",
    gender: "Female",
    age: 28,
    eyeColor: "Blue",
    hairColor: "Blonde",
    hairType: "Straight",
    ethnicity: "White",
    location: "New York, USA"
  },
  {
    id: "2",
    name: "David Chen",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80",
    price: 349,
    rating: 4.8,
    downloads: 8.2,
    category: "Professional",
    gender: "Male",
    age: 35,
    eyeColor: "Brown",
    hairColor: "Black",
    hairType: "Straight",
    ethnicity: "Asian",
    location: "Singapore"
  },
  {
    id: "3",
    name: "Sarah Williams",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80",
    price: 399,
    rating: 4.9,
    downloads: 15.7,
    category: "Educator",
    gender: "Female",
    age: 42,
    eyeColor: "Green",
    hairColor: "Brown",
    hairType: "Wavy",
    ethnicity: "Mixed/Other",
    location: "London, UK"
  }
];

export default function AvatarGrid({ filters, sortBy }: AvatarGridProps) {
  // Filter avatars based on selected filters
  const filteredAvatars = avatars.filter(avatar => {
    if (filters.gender.length && !filters.gender.includes(avatar.gender)) return false;
    if (avatar.age < filters.ageRange[0] || avatar.age > filters.ageRange[1]) return false;
    if (filters.eyeColor.length && !filters.eyeColor.includes(avatar.eyeColor)) return false;
    if (filters.hairColor.length && !filters.hairColor.includes(avatar.hairColor)) return false;
    if (filters.hairType.length && !filters.hairType.includes(avatar.hairType)) return false;
    if (filters.ethnicity.length && !filters.ethnicity.includes(avatar.ethnicity)) return false;
    return true;
  });

  // Sort avatars based on selected sort option
  const sortedAvatars = [...filteredAvatars].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'rating':
        return b.rating - a.rating;
      default:
        return 0;
    }
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {sortedAvatars.map((avatar) => (
        <AvatarCard key={avatar.id} {...avatar} />
      ))}
    </div>
  );
}