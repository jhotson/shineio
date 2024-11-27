import React, { useState } from 'react';
import { Grid, SlidersHorizontal } from 'lucide-react';
import FilterSidebar from '../components/browse/FilterSidebar';
import AvatarGrid from '../components/browse/AvatarGrid';
import SortDropdown from '../components/browse/SortDropdown';

export interface Filters {
  gender: string[];
  ageRange: [number, number];
  eyeColor: string[];
  hairColor: string[];
  hairType: string[];
  location: string[];
  ethnicity: string[];
}

const initialFilters: Filters = {
  gender: [],
  ageRange: [18, 65],
  eyeColor: [],
  hairColor: [],
  hairType: [],
  location: [],
  ethnicity: []
};

export default function BrowsePage() {
  const [filters, setFilters] = useState<Filters>(initialFilters);
  const [showFilters, setShowFilters] = useState(true);
  const [sortBy, setSortBy] = useState('featured');

  const handleFilterChange = (newFilters: Filters) => {
    setFilters(newFilters);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Browse Avatars</h1>
        <div className="flex items-center gap-4">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900"
          >
            <SlidersHorizontal className="w-5 h-5" />
            <span className="hidden sm:inline">Filters</span>
          </button>
          <SortDropdown value={sortBy} onChange={setSortBy} />
          <button className="p-2 text-gray-600 hover:text-gray-900">
            <Grid className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="flex gap-8">
        {showFilters && (
          <div className="w-64 flex-shrink-0">
            <FilterSidebar filters={filters} onChange={handleFilterChange} />
          </div>
        )}
        <div className="flex-1">
          <AvatarGrid filters={filters} sortBy={sortBy} />
        </div>
      </div>
    </div>
  );
}