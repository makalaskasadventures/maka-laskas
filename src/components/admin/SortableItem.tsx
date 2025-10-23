'use client';

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical, Edit, Copy, Trash2, Eye } from 'lucide-react';

interface SortableItemProps {
  id: string;
  children: React.ReactNode;
  onSelect?: () => void;
  onEdit?: () => void;
  onDuplicate?: () => void;
  onDelete?: () => void;
  onPreview?: () => void;
  isSelected?: boolean;
}

export default function SortableItem({ 
  id, 
  children, 
  onSelect, 
  onEdit, 
  onDuplicate, 
  onDelete, 
  onPreview,
  isSelected = false 
}: SortableItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`relative group border-2 rounded-lg transition-all duration-200 ${
        isSelected 
          ? 'border-orange-500 bg-orange-50' 
          : 'border-gray-200 bg-white hover:border-gray-300'
      } ${isDragging ? 'opacity-50 shadow-lg' : ''}`}
    >
      {/* Drag Handle */}
      <div
        {...attributes}
        {...listeners}
        className="absolute -left-2 top-1/2 transform -translate-y-1/2 w-6 h-6 bg-gray-600 rounded-full flex items-center justify-center cursor-grab hover:bg-gray-700 transition-colors opacity-0 group-hover:opacity-100"
      >
        <GripVertical className="w-3 h-3 text-white" />
      </div>

      {/* Element Content */}
      <div 
        className="p-4 cursor-pointer"
        onClick={onSelect}
      >
        {children}
      </div>

      {/* Action Buttons */}
      <div className="absolute top-2 right-2 flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
        {onPreview && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onPreview();
            }}
            className="w-6 h-6 bg-blue-500 text-white rounded flex items-center justify-center hover:bg-blue-600 transition-colors"
            title="Preview"
          >
            <Eye className="w-3 h-3" />
          </button>
        )}
        
        {onEdit && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onEdit();
            }}
            className="w-6 h-6 bg-orange-500 text-white rounded flex items-center justify-center hover:bg-orange-600 transition-colors"
            title="Edit"
          >
            <Edit className="w-3 h-3" />
          </button>
        )}
        
        {onDuplicate && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDuplicate();
            }}
            className="w-6 h-6 bg-green-500 text-white rounded flex items-center justify-center hover:bg-green-600 transition-colors"
            title="Duplicate"
          >
            <Copy className="w-3 h-3" />
          </button>
        )}
        
        {onDelete && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
            className="w-6 h-6 bg-red-500 text-white rounded flex items-center justify-center hover:bg-red-600 transition-colors"
            title="Delete"
          >
            <Trash2 className="w-3 h-3" />
          </button>
        )}
      </div>
    </div>
  );
}
