import React from 'react';
import { X } from 'lucide-react';
import { Filters } from '../../pages/BrowsePage';
import FilterSection from './FilterSection';
import RangeSlider from './RangeSlider';

interface FilterSidebarProps {
  filters: Filters;
  onChange: (filters: Filters) => void;
}

const genderOptions = ['Male', 'Female', 'Non-binary'];
const eyeColorOptions = ['Brown', 'Blue', 'Green', 'Hazel', 'Gray'];
const hairColorOptions = ['Black', 'Brown', 'Blonde', 'Red', 'Gray', 'White'];
const hairTypeOptions = ['Straight', 'Wavy', 'Curly', 'Coily'];
const ethnicityOptions = [
  'Asian', 'Black', 'Hispanic/Latino', 'Middle Eastern', 
  'Pacific Islander', 'White', 'Mixed/Other'
];

export default function FilterSidebar({ filters, onChange }: FilterSidebarProps) {
  const handleClearAll = () => {
    onChange({
      gender: [],
      ageRange: [18, 65],
      eyeColor: [],
      hairColor: [],
      hairType: [],
      location: [],
      ethnicity: []
    });
  };

  const updateFilter = (key: keyof Filters, value: any) => {
    onChange({ ...filters, [key]: value });
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="font-semibold">Filters</h2>
        <button
          onClick={handleClearAll}
          className="text-sm text-gray-500 hover:text-gray-700"
        >
          Clear all
        </button>
      </div>

      <FilterSection
        title="Gender"
        options={genderOptions}
        selected={filters.gender}
        onChange={(value) => updateFilter('gender', value)}
      />

      <div className="space-y-2">
        <h3 className="font-medium text-sm">Age Range</h3>
        <RangeSlider
          min={18}
          max={65}
          value={filters.ageRange}
          onChange={(value) => updateFilter('ageRange', value)}
        />
        <div className="flex justify-between text-sm text-gray-600">
          <span>{filters.ageRange[0]}</span>
          <span>{filters.ageRange[1]}</span>
        </div>
      </div>

      <FilterSection
        title="Eye Color"
        options={eyeColorOptions}
        selected={filters.eyeColor}
        onChange={(value) => updateFilter('eyeColor', value)}
      />

      <FilterSection
        title="Hair Color"
        options={hairColorOptions}
        selected={filters.hairColor}
        onChange={(value) => updateFilter('hairColor', value)}
      />

      <FilterSection
        title="Hair Type"
        options={hairTypeOptions}
        selected={filters.hairType}
        onChange={(value) => updateFilter('hairType', value)}
      />

      <FilterSection
        title="Ethnicity"
        options={ethnicityOptions}
        selected={filters.ethnicity}
        onChange={(value) => updateFilter('ethnicity', value)}
      />
    </div>
  );
}