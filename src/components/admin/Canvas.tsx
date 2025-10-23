'use client';

import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import SortableItem from './SortableItem';
import ElementRenderer from './ElementRenderer';

interface CanvasProps {
  elements: any[];
  selectedElement: any | null;
  onSelectElement: (element: any) => void;
  onUpdateElement: (id: string, updates: any) => void;
  onDeleteElement: (id: string) => void;
  onDuplicateElement: (element: any) => void;
}

export default function Canvas({ 
  elements, 
  selectedElement, 
  onSelectElement, 
  onUpdateElement, 
  onDeleteElement, 
  onDuplicateElement 
}: CanvasProps) {
  const [hoveredElement, setHoveredElement] = useState<string | null>(null);

  const handleDuplicate = (element: any) => {
    const duplicated = {
      ...element,
      id: uuidv4(),
      props: { ...element.props }
    };
    onDuplicateElement(duplicated);
  };

  return (
    <div className="h-full bg-white">
      {/* Canvas Header */}
      <div className="border-b border-gray-200 p-4">
        <h2 className="text-lg font-semibold text-gray-900">Canvas</h2>
        <p className="text-sm text-gray-500">Drag elements from the sidebar to build your section</p>
      </div>

      {/* Canvas Content */}
      <div className="h-full overflow-y-auto p-6">
        {elements.length === 0 ? (
          <div className="h-full flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg">
            <div className="text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Start Building</h3>
              <p className="text-gray-500 mb-4">Drag elements from the sidebar to create your section</p>
              <div className="text-sm text-gray-400">
                <p>• Click elements to select and edit them</p>
                <p>• Use drag handles to reorder elements</p>
                <p>• Hover over elements to see action buttons</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-4 max-w-4xl mx-auto">
            {elements.map((element) => (
              <SortableItem
                key={element.id}
                id={element.id}
                isSelected={selectedElement?.id === element.id}
                onSelect={() => onSelectElement(element)}
                onEdit={() => onSelectElement(element)}
                onDuplicate={() => handleDuplicate(element)}
                onDelete={() => onDeleteElement(element.id)}
                onPreview={() => {
                  // Preview functionality can be added here
                  console.log('Preview element:', element);
                }}
              >
                <div
                  onMouseEnter={() => setHoveredElement(element.id)}
                  onMouseLeave={() => setHoveredElement(null)}
                >
                  <ElementRenderer 
                    element={element} 
                    isPreview={false}
                    isSelected={selectedElement?.id === element.id}
                  />
                </div>
              </SortableItem>
            ))}
          </div>
        )}
      </div>

      {/* Canvas Footer */}
      {elements.length > 0 && (
        <div className="border-t border-gray-200 p-4 bg-gray-50">
          <div className="flex items-center justify-between text-sm text-gray-500">
            <span>{elements.length} element{elements.length !== 1 ? 's' : ''}</span>
            <span>Click elements to edit • Drag to reorder</span>
          </div>
        </div>
      )}
    </div>
  );
}
