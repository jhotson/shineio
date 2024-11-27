import React from 'react';

interface RangeSliderProps {
  min: number;
  max: number;
  value: [number, number];
  onChange: (value: [number, number]) => void;
}

export default function RangeSlider({ min, max, value, onChange }: RangeSliderProps) {
  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMin = Math.min(Number(e.target.value), value[1] - 1);
    onChange([newMin, value[1]]);
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMax = Math.max(Number(e.target.value), value[0] + 1);
    onChange([value[0], newMax]);
  };

  const getBackgroundSize = (value: number, type: 'min' | 'max') => {
    const percentage = ((value - min) / (max - min)) * 100;
    return type === 'min' ? percentage : 100 - percentage;
  };

  return (
    <div className="relative h-2">
      <input
        type="range"
        min={min}
        max={max}
        value={value[0]}
        onChange={handleMinChange}
        className="absolute w-full h-1 bg-gray-200 rounded appearance-none cursor-pointer"
        style={{
          background: `linear-gradient(to right, #e5e7eb ${getBackgroundSize(
            value[0],
            'min'
          )}%, #4f46e5 ${getBackgroundSize(value[0], 'min')}%, #4f46e5 ${getBackgroundSize(
            value[1],
            'max'
          )}%, #e5e7eb ${getBackgroundSize(value[1], 'max')}%)`
        }}
      />
      <input
        type="range"
        min={min}
        max={max}
        value={value[1]}
        onChange={handleMaxChange}
        className="absolute w-full h-1 bg-transparent appearance-none cursor-pointer"
      />
    </div>
  );
}