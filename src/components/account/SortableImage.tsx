import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Trash2, GripVertical } from 'lucide-react';

interface SortableImageProps {
  url: string;
  onRemove: () => void;
}

export default function SortableImage({ url, onRemove }: SortableImageProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: url });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="relative group aspect-square"
    >
      <img
        src={url}
        alt="Avatar"
        className="w-full h-full object-cover rounded-lg"
      />
      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-opacity rounded-lg">
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            className="p-2 bg-white rounded-full text-red-600 hover:bg-red-50 mr-2"
            onClick={onRemove}
          >
            <Trash2 className="w-5 h-5" />
          </button>
          <div
            {...attributes}
            {...listeners}
            className="p-2 bg-white rounded-full text-gray-600 hover:bg-gray-50 cursor-move"
          >
            <GripVertical className="w-5 h-5" />
          </div>
        </div>
      </div>
    </div>
  );
}