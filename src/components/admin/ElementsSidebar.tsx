'use client';

import { useState } from 'react';
import { ChevronDown, ChevronRight, Search, Type, Image, Video, MousePointer, Grid, Clock, Mail, Download } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';

const ELEMENT_CATEGORIES = [
  {
    name: 'Basic',
    icon: Type,
    elements: [
      { type: 'heading', label: 'Heading', icon: Type },
      { type: 'text', label: 'Text Block', icon: Type },
      { type: 'image', label: 'Image', icon: Image },
      { type: 'video', label: 'Video Embed', icon: Video },
      { type: 'button', label: 'Button / CTA', icon: MousePointer },
      { type: 'hero', label: 'Hero Section', icon: Grid },
    ]
  },
  {
    name: 'Media',
    icon: Grid,
    elements: [
      { type: 'cardGrid', label: 'Card / Grid', icon: Grid },
      { type: 'timeline', label: 'Timeline', icon: Clock },
      { type: 'mediaKit', label: 'Media Kit Download', icon: Download },
    ]
  },
  {
    name: 'Special',
    icon: Mail,
    elements: [
      { type: 'newsletter', label: 'Newsletter Signup', icon: Mail },
      { type: 'keynotes', label: 'Keynotes Embed', icon: Video },
    ]
  }
];

interface ElementsSidebarProps {
  onAddElement: (element: any) => void;
}

export default function ElementsSidebar({ onAddElement }: ElementsSidebarProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedCategories, setExpandedCategories] = useState<string[]>(['Basic']);

  const toggleCategory = (categoryName: string) => {
    setExpandedCategories(prev => 
      prev.includes(categoryName) 
        ? prev.filter(name => name !== categoryName)
        : [...prev, categoryName]
    );
  };

  const getDefaultProps = (type: string) => {
    const defaults: Record<string, any> = {
      heading: { text: 'New Heading', level: 2, alignment: 'left', style: {} },
      text: { text: 'New paragraph text...', style: {} },
      image: { src: '', alt: '', caption: '', style: {} },
      video: { url: '', title: '', style: {} },
      button: { label: 'Learn More', href: '#', variant: 'primary', openInNewTab: false, style: {} },
      hero: { 
        title: 'Hero Title', 
        titleStyle: {}, 
        content: 'Hero content text goes here. Add your description and details.', 
        contentStyle: {},
        image: '', 
        imageAlt: '',
        layout: 'image-right',
        style: {} 
      },
      cardGrid: { items: [], columns: 3, alignment: 'start', style: {} },
      timeline: { items: [], style: {} },
      newsletter: { heading: 'Subscribe to Our Newsletter', subtext: 'Get the latest updates delivered to your inbox.', style: {} },
      mediaKit: { label: 'Download Media Kit', href: '#', style: {} },
      keynotes: { title: 'Keynote Presentations', items: [], style: {} },
    };
    return defaults[type] || { style: {} };
  };

  const handleAddElement = (type: string) => {
    const element = {
      id: uuidv4(),
      type,
      props: getDefaultProps(type)
    };
    onAddElement(element);
  };

  const filteredCategories = ELEMENT_CATEGORIES.map(category => ({
    ...category,
    elements: category.elements.filter(element => 
      element.label.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(category => category.elements.length > 0);

  return (
    <div className="h-full flex flex-col bg-gray-50">
      {/* Search Bar */}
      <div className="p-4 border-b border-gray-200">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search elements..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Elements List */}
      <div className="flex-1 overflow-y-auto p-4">
        <h3 className="text-sm font-semibold text-gray-700 mb-4">Elements</h3>
        
        {filteredCategories.map((category) => (
          <div key={category.name} className="mb-4">
            <button
              onClick={() => toggleCategory(category.name)}
              className="w-full flex items-center justify-between p-2 text-left hover:bg-gray-100 rounded-lg transition-colors"
            >
              <div className="flex items-center space-x-2">
                <category.icon className="w-4 h-4 text-gray-600" />
                <span className="text-sm font-medium text-gray-700">{category.name}</span>
              </div>
              {expandedCategories.includes(category.name) ? (
                <ChevronDown className="w-4 h-4 text-gray-500" />
              ) : (
                <ChevronRight className="w-4 h-4 text-gray-500" />
              )}
            </button>

            {expandedCategories.includes(category.name) && (
              <div className="mt-2 space-y-1">
                {category.elements.map((element) => (
                  <button
                    key={element.type}
                    onClick={() => handleAddElement(element.type)}
                    className="w-full flex items-center space-x-3 p-3 text-left bg-white border border-gray-200 rounded-lg hover:bg-orange-50 hover:border-orange-200 transition-all duration-200 group"
                  >
                    <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center group-hover:bg-orange-100 transition-colors">
                      <element.icon className="w-4 h-4 text-gray-600 group-hover:text-orange-600" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-900">{element.label}</div>
                      <div className="text-xs text-gray-500">Drag to canvas</div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}

        {filteredCategories.length === 0 && (
          <div className="text-center py-8">
            <Search className="w-8 h-8 text-gray-400 mx-auto mb-2" />
            <p className="text-sm text-gray-500">No elements found</p>
          </div>
        )}
      </div>
    </div>
  );
}
