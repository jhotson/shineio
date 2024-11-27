import React from 'react';
import { Check } from 'lucide-react';

interface FilterSectionProps {
  title: string;
  options: string[];
  selected: string[];
  onChange: (selected: string[]) => void;
}

export default function FilterSection({
  title,
  options,
  selected,
  onChange,
}: FilterSectionProps) {
  const toggleOption = (option: string) => {
    const newSelected = selected.includes(option)
      ? selected.filter((item) => item !== option)
      : [...selected, option];
    onChange(newSelected);
  };

  return (
    <div className="space-y-2">
      <h3 className="font-medium text-sm">{title}</h3>
      <div className="space-y-1">
        {options.map((option) => (
          <label
            key={option}
            className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-1 rounded"
          >
            <div
              className={`w-4 h-4 rounded border flex items-center justify-center ${
                selected.includes(option)
                  ? 'bg-indigo-600 border-indigo-600'
                  : 'border-gray-300'
              }`}
            >
              {selected.includes(option) && (
                <Check className="w-3 h-3 text-white" />
              )}
            </div>
            <span className="text-sm text-gray-700">{option}</span>
          </label>
        ))}
      </div>
    </div>
  );
}