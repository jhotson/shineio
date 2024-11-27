import React, { useState } from 'react';
import { DndContext, closestCenter, DragEndEvent } from '@dnd-kit/core';
import { SortableContext, arrayMove, rectSortingStrategy } from '@dnd-kit/sortable';
import { ImagePlus, Trash2, Power, PowerOff } from 'lucide-react';
import SortableImage from './SortableImage';

interface ListingData {
  id: string;
  name: string;
  description: string;
  price: number;
  isActive: boolean;
  images: string[];
}

const mockListing: ListingData = {
  id: '1',
  name: 'Professional Business Avatar',
  description: 'Perfect for corporate presentations and professional networking.',
  price: 299,
  isActive: true,
  images: [
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80',
  ],
};

export default function ListingManager() {
  const [listing, setListing] = useState<ListingData>(mockListing);
  const [isEditing, setIsEditing] = useState(false);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (over && active.id !== over.id) {
      const oldIndex = listing.images.indexOf(active.id as string);
      const newIndex = listing.images.indexOf(over.id as string);
      
      setListing({
        ...listing,
        images: arrayMove(listing.images, oldIndex, newIndex),
      });
    }
  };

  const toggleStatus = () => {
    setListing({ ...listing, isActive: !listing.isActive });
  };

  const removeImage = (imageUrl: string) => {
    setListing({
      ...listing,
      images: listing.images.filter(img => img !== imageUrl),
    });
  };

  const addImage = (url: string) => {
    setListing({
      ...listing,
      images: [...listing.images, url],
    });
  };

  const handleSave = () => {
    setIsEditing(false);
    // Here you would typically save to your backend
    console.log('Saving listing:', listing);
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Manage Listing</h2>
        <button
          onClick={toggleStatus}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
            listing.isActive
              ? 'bg-red-50 text-red-600 hover:bg-red-100'
              : 'bg-green-50 text-green-600 hover:bg-green-100'
          }`}
        >
          {listing.isActive ? (
            <>
              <PowerOff className="w-4 h-4" />
              Deactivate
            </>
          ) : (
            <>
              <Power className="w-4 h-4" />
              Activate
            </>
          )}
        </button>
      </div>

      {/* Basic Information */}
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Name
          </label>
          <input
            type="text"
            value={listing.name}
            onChange={(e) => setListing({ ...listing, name: e.target.value })}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            value={listing.description}
            onChange={(e) => setListing({ ...listing, description: e.target.value })}
            rows={4}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Price (USD)
          </label>
          <input
            type="number"
            value={listing.price}
            onChange={(e) => setListing({ ...listing, price: Number(e.target.value) })}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
          />
        </div>
      </div>

      {/* Image Management */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Images</h3>
        <p className="text-sm text-gray-500 mb-4">
          Drag and drop to reorder images. The first image will be your main display image.
        </p>
        
        <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={listing.images} strategy={rectSortingStrategy}>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {listing.images.map((image) => (
                <SortableImage
                  key={image}
                  url={image}
                  onRemove={() => removeImage(image)}
                />
              ))}
              <button
                onClick={() => addImage('https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80')}
                className="aspect-square rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center hover:border-indigo-600 hover:bg-indigo-50 transition-colors"
              >
                <ImagePlus className="w-8 h-8 text-gray-400" />
              </button>
            </div>
          </SortableContext>
        </DndContext>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <button
          onClick={handleSave}
          className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}