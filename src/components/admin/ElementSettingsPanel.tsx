'use client';

import { useState } from 'react';
import { Type, Image, Video, MousePointer, Grid, Clock, Mail, Download, Plus, Trash2 } from 'lucide-react';

interface ElementSettingsPanelProps {
  element: any | null;
  onUpdateElement: (id: string, updates: any) => void;
}

export default function ElementSettingsPanel({ element, onUpdateElement }: ElementSettingsPanelProps) {
  const [activeTab, setActiveTab] = useState<'content' | 'style'>('content');

  if (!element) {
    return (
      <div className="h-full flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
            <Type className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No Element Selected</h3>
          <p className="text-gray-500">Click on an element in the canvas to edit its properties</p>
        </div>
      </div>
    );
  }

  const updateProp = (key: string, value: any) => {
    onUpdateElement(element.id, {
      props: {
        ...element.props,
        [key]: value
      }
    });
  };

  const addArrayItem = (key: string, defaultItem: any) => {
    const currentItems = element.props[key] || [];
    updateProp(key, [...currentItems, defaultItem]);
  };

  const updateArrayItem = (key: string, index: number, field: string, value: any) => {
    const currentItems = [...(element.props[key] || [])];
    currentItems[index] = { ...currentItems[index], [field]: value };
    updateProp(key, currentItems);
  };

  const removeArrayItem = (key: string, index: number) => {
    const currentItems = [...(element.props[key] || [])];
    currentItems.splice(index, 1);
    updateProp(key, currentItems);
  };

  const updateStyle = (key: string, value: any) => {
    onUpdateElement(element.id, {
      props: {
        ...element.props,
        style: {
          ...element.props.style,
          [key]: value
        }
      }
    });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        updateProp('src', event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCardImageUpload = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        updateArrayItem('items', index, 'image', event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleHeroImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        updateProp('image', event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const updateTitleStyle = (key: string, value: any) => {
    onUpdateElement(element.id, {
      props: {
        ...element.props,
        titleStyle: {
          ...element.props.titleStyle,
          [key]: value
        }
      }
    });
  };

  const updateContentStyle = (key: string, value: any) => {
    onUpdateElement(element.id, {
      props: {
        ...element.props,
        contentStyle: {
          ...element.props.contentStyle,
          [key]: value
        }
      }
    });
  };

  const renderStyleSettings = () => {
    const style = element.props.style || {};

    if (element.type === 'heading' || element.type === 'text') {
      return (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Font Family</label>
            <select
              value={style.fontFamily || ''}
              onChange={(e) => updateStyle('fontFamily', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            >
              <option value="">Default (System)</option>
              <option value="Arial, sans-serif">Arial</option>
              <option value="'Helvetica Neue', Helvetica, sans-serif">Helvetica</option>
              <option value="'Times New Roman', Times, serif">Times New Roman</option>
              <option value="Georgia, serif">Georgia</option>
              <option value="'Courier New', Courier, monospace">Courier New</option>
              <option value="Verdana, sans-serif">Verdana</option>
              <option value="'Trebuchet MS', sans-serif">Trebuchet MS</option>
              <option value="'Comic Sans MS', cursive">Comic Sans MS</option>
              <option value="Impact, fantasy">Impact</option>
              <option value="'Palatino Linotype', 'Book Antiqua', Palatino, serif">Palatino</option>
              <option value="'Lucida Sans', 'Lucida Grande', sans-serif">Lucida Sans</option>
              <option value="Tahoma, sans-serif">Tahoma</option>
              <option value="'Gill Sans', sans-serif">Gill Sans</option>
              <option value="Garamond, serif">Garamond</option>
              <option value="'Century Gothic', sans-serif">Century Gothic</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Font Size (px)</label>
            <input
              type="number"
              value={style.fontSize || ''}
              onChange={(e) => updateStyle('fontSize', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              placeholder={element.type === 'heading' ? '32' : '16'}
              min="8"
              max="128"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Font Weight</label>
            <select
              value={style.fontWeight || ''}
              onChange={(e) => updateStyle('fontWeight', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            >
              <option value="">Default</option>
              <option value="300">Light (300)</option>
              <option value="400">Normal (400)</option>
              <option value="500">Medium (500)</option>
              <option value="600">Semibold (600)</option>
              <option value="700">Bold (700)</option>
              <option value="800">Extra Bold (800)</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Text Color</label>
            <div className="flex space-x-2">
              <input
                type="color"
                value={style.color || '#000000'}
                onChange={(e) => updateStyle('color', e.target.value)}
                className="w-12 h-10 border border-gray-300 rounded cursor-pointer"
              />
              <input
                type="text"
                value={style.color || ''}
                onChange={(e) => updateStyle('color', e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                placeholder="#000000"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Line Height</label>
            <input
              type="number"
              step="0.1"
              value={style.lineHeight || ''}
              onChange={(e) => updateStyle('lineHeight', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              placeholder="1.5"
              min="0.5"
              max="3"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Text Alignment</label>
            <select
              value={style.textAlign || ''}
              onChange={(e) => updateStyle('textAlign', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            >
              <option value="">Default</option>
              <option value="left">Left</option>
              <option value="center">Center</option>
              <option value="right">Right</option>
              <option value="justify">Justify</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Margin Bottom (px)</label>
            <input
              type="number"
              value={style.marginBottom || ''}
              onChange={(e) => updateStyle('marginBottom', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              placeholder="16"
              min="0"
              max="128"
            />
          </div>
        </div>
      );
    }

    if (element.type === 'image') {
      return (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Width (%)</label>
            <input
              type="number"
              value={style.width || ''}
              onChange={(e) => updateStyle('width', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              placeholder="100"
              min="10"
              max="100"
            />
            <p className="text-xs text-gray-500 mt-1">Leave empty for auto width</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Max Height (px)</label>
            <input
              type="number"
              value={style.maxHeight || ''}
              onChange={(e) => updateStyle('maxHeight', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              placeholder="400"
              min="100"
              max="1000"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Object Fit</label>
            <select
              value={style.objectFit || 'cover'}
              onChange={(e) => updateStyle('objectFit', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            >
              <option value="cover">Cover (crop to fit)</option>
              <option value="contain">Contain (fit entire image)</option>
              <option value="fill">Fill (stretch)</option>
              <option value="none">None (original size)</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Border Radius (px)</label>
            <input
              type="number"
              value={style.borderRadius || ''}
              onChange={(e) => updateStyle('borderRadius', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              placeholder="8"
              min="0"
              max="50"
            />
          </div>
        </div>
      );
    }

    return (
      <div className="text-center py-8">
        <p className="text-gray-500">No style settings available for this element type</p>
      </div>
    );
  };

  const renderContentSettings = () => {
    switch (element.type) {
      case 'heading':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Heading Text</label>
              <input
                type="text"
                value={element.props.text || ''}
                onChange={(e) => updateProp('text', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                placeholder="Enter heading text"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Heading Level</label>
              <select
                value={element.props.level || 2}
                onChange={(e) => updateProp('level', parseInt(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              >
                <option value={1}>H1</option>
                <option value={2}>H2</option>
                <option value={3}>H3</option>
                <option value={4}>H4</option>
                <option value={5}>H5</option>
                <option value={6}>H6</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Alignment</label>
              <select
                value={element.props.alignment || 'left'}
                onChange={(e) => updateProp('alignment', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              >
                <option value="left">Left</option>
                <option value="center">Center</option>
                <option value="right">Right</option>
              </select>
            </div>
          </div>
        );

      case 'text':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Text Content</label>
              <textarea
                value={element.props.text || ''}
                onChange={(e) => updateProp('text', e.target.value)}
                rows={6}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                placeholder="Enter text content"
              />
            </div>
          </div>
        );

      case 'image':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Upload Image</label>
              <input
                key={element.id}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm"
              />
              <p className="text-xs text-gray-500 mt-1">Or enter URL below</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Image URL</label>
              <input
                type="url"
                value={element.props.src || ''}
                onChange={(e) => updateProp('src', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                placeholder="https://example.com/image.jpg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Alt Text</label>
              <input
                type="text"
                value={element.props.alt || ''}
                onChange={(e) => updateProp('alt', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                placeholder="Describe the image"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Caption</label>
              <input
                type="text"
                value={element.props.caption || ''}
                onChange={(e) => updateProp('caption', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                placeholder="Image caption (optional)"
              />
            </div>
          </div>
        );

      case 'video':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Video URL</label>
              <input
                type="url"
                value={element.props.url || ''}
                onChange={(e) => updateProp('url', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                placeholder="https://youtube.com/watch?v=..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Video Title</label>
              <input
                type="text"
                value={element.props.title || ''}
                onChange={(e) => updateProp('title', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                placeholder="Video title"
              />
            </div>
          </div>
        );

      case 'button':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Button Text</label>
              <input
                type="text"
                value={element.props.label || ''}
                onChange={(e) => updateProp('label', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                placeholder="Button text"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Link URL</label>
              <input
                type="url"
                value={element.props.href || ''}
                onChange={(e) => updateProp('href', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                placeholder="https://example.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Button Style</label>
              <select
                value={element.props.variant || 'primary'}
                onChange={(e) => updateProp('variant', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              >
                <option value="primary">Primary</option>
                <option value="secondary">Secondary</option>
              </select>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="openInNewTab"
                checked={element.props.openInNewTab || false}
                onChange={(e) => updateProp('openInNewTab', e.target.checked)}
                className="w-4 h-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
              />
              <label htmlFor="openInNewTab" className="ml-2 block text-sm text-gray-700">
                Open in new tab
              </label>
            </div>
          </div>
        );

      case 'hero':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Layout</label>
              <select
                value={element.props.layout || 'image-right'}
                onChange={(e) => updateProp('layout', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              >
                <option value="image-right">Image on Right</option>
                <option value="image-left">Image on Left</option>
              </select>
            </div>
            
            <div className="border-t pt-4">
              <h4 className="text-sm font-semibold text-gray-700 mb-3">Title</h4>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Title Text</label>
                  <input
                    type="text"
                    value={element.props.title || ''}
                    onChange={(e) => updateProp('title', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder="Enter title"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Title Font Family</label>
                  <select
                    value={element.props.titleStyle?.fontFamily || ''}
                    onChange={(e) => updateTitleStyle('fontFamily', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  >
                    <option value="">Default (System)</option>
                    <option value="Arial, sans-serif">Arial</option>
                    <option value="'Helvetica Neue', Helvetica, sans-serif">Helvetica</option>
                    <option value="'Times New Roman', Times, serif">Times New Roman</option>
                    <option value="Georgia, serif">Georgia</option>
                    <option value="Verdana, sans-serif">Verdana</option>
                    <option value="'Trebuchet MS', sans-serif">Trebuchet MS</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Title Font Size (px)</label>
                  <input
                    type="number"
                    value={element.props.titleStyle?.fontSize || ''}
                    onChange={(e) => updateTitleStyle('fontSize', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder="48"
                    min="16"
                    max="128"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Title Font Weight</label>
                  <select
                    value={element.props.titleStyle?.fontWeight || ''}
                    onChange={(e) => updateTitleStyle('fontWeight', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  >
                    <option value="">Default</option>
                    <option value="300">Light (300)</option>
                    <option value="400">Normal (400)</option>
                    <option value="500">Medium (500)</option>
                    <option value="600">Semibold (600)</option>
                    <option value="700">Bold (700)</option>
                    <option value="800">Extra Bold (800)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Title Color</label>
                  <div className="flex space-x-2">
                    <input
                      type="color"
                      value={element.props.titleStyle?.color || '#000000'}
                      onChange={(e) => updateTitleStyle('color', e.target.value)}
                      className="w-12 h-10 border border-gray-300 rounded cursor-pointer"
                    />
                    <input
                      type="text"
                      value={element.props.titleStyle?.color || ''}
                      onChange={(e) => updateTitleStyle('color', e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      placeholder="#000000"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t pt-4">
              <h4 className="text-sm font-semibold text-gray-700 mb-3">Content</h4>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Content Text</label>
                  <textarea
                    value={element.props.content || ''}
                    onChange={(e) => updateProp('content', e.target.value)}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder="Enter content text"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Content Font Family</label>
                  <select
                    value={element.props.contentStyle?.fontFamily || ''}
                    onChange={(e) => updateContentStyle('fontFamily', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  >
                    <option value="">Default (System)</option>
                    <option value="Arial, sans-serif">Arial</option>
                    <option value="'Helvetica Neue', Helvetica, sans-serif">Helvetica</option>
                    <option value="'Times New Roman', Times, serif">Times New Roman</option>
                    <option value="Georgia, serif">Georgia</option>
                    <option value="Verdana, sans-serif">Verdana</option>
                    <option value="'Trebuchet MS', sans-serif">Trebuchet MS</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Content Font Size (px)</label>
                  <input
                    type="number"
                    value={element.props.contentStyle?.fontSize || ''}
                    onChange={(e) => updateContentStyle('fontSize', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder="16"
                    min="12"
                    max="48"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Content Font Weight</label>
                  <select
                    value={element.props.contentStyle?.fontWeight || ''}
                    onChange={(e) => updateContentStyle('fontWeight', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  >
                    <option value="">Default</option>
                    <option value="300">Light (300)</option>
                    <option value="400">Normal (400)</option>
                    <option value="500">Medium (500)</option>
                    <option value="600">Semibold (600)</option>
                    <option value="700">Bold (700)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Content Color</label>
                  <div className="flex space-x-2">
                    <input
                      type="color"
                      value={element.props.contentStyle?.color || '#000000'}
                      onChange={(e) => updateContentStyle('color', e.target.value)}
                      className="w-12 h-10 border border-gray-300 rounded cursor-pointer"
                    />
                    <input
                      type="text"
                      value={element.props.contentStyle?.color || ''}
                      onChange={(e) => updateContentStyle('color', e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      placeholder="#000000"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t pt-4">
              <h4 className="text-sm font-semibold text-gray-700 mb-3">Image</h4>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Upload Image</label>
                  <input
                    key={`hero-image-${element.id}`}
                    type="file"
                    accept="image/*"
                    onChange={handleHeroImageUpload}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm"
                  />
                  <p className="text-xs text-gray-500 mt-1">Or enter URL below</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Image URL</label>
                  <input
                    type="url"
                    value={element.props.image || ''}
                    onChange={(e) => updateProp('image', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder="https://example.com/image.jpg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Alt Text</label>
                  <input
                    type="text"
                    value={element.props.imageAlt || ''}
                    onChange={(e) => updateProp('imageAlt', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder="Describe the image"
                  />
                </div>
              </div>
            </div>
          </div>
        );

      case 'cardGrid':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Cards per Row</label>
              <select
                value={element.props.columns || 3}
                onChange={(e) => updateProp('columns', parseInt(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              >
                <option value={1}>1 Card (Full Width)</option>
                <option value={2}>2 Cards</option>
                <option value={3}>3 Cards</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Grid Alignment</label>
              <select
                value={element.props.alignment || 'start'}
                onChange={(e) => updateProp('alignment', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              >
                <option value="start">Left</option>
                <option value="center">Center</option>
                <option value="end">Right</option>
              </select>
            </div>
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-medium text-gray-700">Cards</h4>
              <button
                onClick={() => addArrayItem('items', { title: 'New Card', snippet: 'Card description...', image: '', href: '#' })}
                className="flex items-center space-x-1 text-orange-600 hover:text-orange-700 text-sm"
              >
                <Plus className="w-4 h-4" />
                <span>Add Card</span>
              </button>
            </div>
            <div className="space-y-3">
              {(element.props.items || []).map((item: any, index: number) => (
                <div key={index} className="p-3 border border-gray-200 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">Card {index + 1}</span>
                    <button
                      onClick={() => removeArrayItem('items', index)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="space-y-2">
                    <input
                      type="text"
                      value={item.title || ''}
                      onChange={(e) => updateArrayItem('items', index, 'title', e.target.value)}
                      className="w-full px-2 py-1 text-sm border border-gray-300 rounded"
                      placeholder="Card title"
                    />
                    <input
                      type="text"
                      value={item.snippet || ''}
                      onChange={(e) => updateArrayItem('items', index, 'snippet', e.target.value)}
                      className="w-full px-2 py-1 text-sm border border-gray-300 rounded"
                      placeholder="Card description"
                    />
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">Upload Image</label>
                      <input
                        key={`card-image-${element.id}-${index}`}
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleCardImageUpload(index, e)}
                        className="w-full px-2 py-1 text-xs border border-gray-300 rounded"
                      />
                      <p className="text-xs text-gray-500 mt-0.5">Or enter URL below</p>
                    </div>
                    <input
                      type="url"
                      value={item.image || ''}
                      onChange={(e) => updateArrayItem('items', index, 'image', e.target.value)}
                      className="w-full px-2 py-1 text-sm border border-gray-300 rounded"
                      placeholder="Image URL"
                    />
                    <input
                      type="url"
                      value={item.href || ''}
                      onChange={(e) => updateArrayItem('items', index, 'href', e.target.value)}
                      className="w-full px-2 py-1 text-sm border border-gray-300 rounded"
                      placeholder="Link URL"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'timeline':
        return (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-medium text-gray-700">Timeline Events</h4>
              <button
                onClick={() => addArrayItem('items', { title: 'New Event', date: '', text: 'Event description...' })}
                className="flex items-center space-x-1 text-orange-600 hover:text-orange-700 text-sm"
              >
                <Plus className="w-4 h-4" />
                <span>Add Event</span>
              </button>
            </div>
            <div className="space-y-3">
              {(element.props.items || []).map((item: any, index: number) => (
                <div key={index} className="p-3 border border-gray-200 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">Event {index + 1}</span>
                    <button
                      onClick={() => removeArrayItem('items', index)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="space-y-2">
                    <input
                      type="text"
                      value={item.title || ''}
                      onChange={(e) => updateArrayItem('items', index, 'title', e.target.value)}
                      className="w-full px-2 py-1 text-sm border border-gray-300 rounded"
                      placeholder="Event title"
                    />
                    <input
                      type="text"
                      value={item.date || ''}
                      onChange={(e) => updateArrayItem('items', index, 'date', e.target.value)}
                      className="w-full px-2 py-1 text-sm border border-gray-300 rounded"
                      placeholder="Event date"
                    />
                    <textarea
                      value={item.text || ''}
                      onChange={(e) => updateArrayItem('items', index, 'text', e.target.value)}
                      rows={2}
                      className="w-full px-2 py-1 text-sm border border-gray-300 rounded"
                      placeholder="Event description"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'newsletter':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Heading</label>
              <input
                type="text"
                value={element.props.heading || ''}
                onChange={(e) => updateProp('heading', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                placeholder="Newsletter heading"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Subtext</label>
              <textarea
                value={element.props.subtext || ''}
                onChange={(e) => updateProp('subtext', e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                placeholder="Newsletter description"
              />
            </div>
          </div>
        );

      case 'mediaKit':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Button Text</label>
              <input
                type="text"
                value={element.props.label || ''}
                onChange={(e) => updateProp('label', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                placeholder="Download Media Kit"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Download URL</label>
              <input
                type="url"
                value={element.props.href || ''}
                onChange={(e) => updateProp('href', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                placeholder="https://example.com/media-kit.zip"
              />
            </div>
          </div>
        );

      case 'keynotes':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Section Title</label>
              <input
                type="text"
                value={element.props.title || ''}
                onChange={(e) => updateProp('title', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                placeholder="Keynote Presentations"
              />
            </div>
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-medium text-gray-700">Keynotes</h4>
              <button
                onClick={() => addArrayItem('items', { title: 'New Keynote', description: 'Keynote description...', videoUrl: '' })}
                className="flex items-center space-x-1 text-orange-600 hover:text-orange-700 text-sm"
              >
                <Plus className="w-4 h-4" />
                <span>Add Keynote</span>
              </button>
            </div>
            <div className="space-y-3">
              {(element.props.items || []).map((item: any, index: number) => (
                <div key={index} className="p-3 border border-gray-200 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">Keynote {index + 1}</span>
                    <button
                      onClick={() => removeArrayItem('items', index)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="space-y-2">
                    <input
                      type="text"
                      value={item.title || ''}
                      onChange={(e) => updateArrayItem('items', index, 'title', e.target.value)}
                      className="w-full px-2 py-1 text-sm border border-gray-300 rounded"
                      placeholder="Keynote title"
                    />
                    <textarea
                      value={item.description || ''}
                      onChange={(e) => updateArrayItem('items', index, 'description', e.target.value)}
                      rows={2}
                      className="w-full px-2 py-1 text-sm border border-gray-300 rounded"
                      placeholder="Keynote description"
                    />
                    <input
                      type="url"
                      value={item.videoUrl || ''}
                      onChange={(e) => updateArrayItem('items', index, 'videoUrl', e.target.value)}
                      className="w-full px-2 py-1 text-sm border border-gray-300 rounded"
                      placeholder="Video URL"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      default:
        return (
          <div className="text-center py-8">
            <p className="text-gray-500">No settings available for this element type</p>
          </div>
        );
    }
  };

  return (
    <div className="h-full flex flex-col bg-gray-50">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 bg-white">
        <div className="flex items-center space-x-2 mb-2">
          <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
            <Type className="w-4 h-4 text-orange-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 capitalize">{element.type}</h3>
            <p className="text-sm text-gray-500">Element Settings</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200 bg-white">
        <button
          onClick={() => setActiveTab('content')}
          className={`flex-1 px-4 py-2 text-sm font-medium ${
            activeTab === 'content'
              ? 'text-orange-600 border-b-2 border-orange-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Content
        </button>
        <button
          onClick={() => setActiveTab('style')}
          className={`flex-1 px-4 py-2 text-sm font-medium ${
            activeTab === 'style'
              ? 'text-orange-600 border-b-2 border-orange-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Style
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4">
        {activeTab === 'content' ? renderContentSettings() : renderStyleSettings()}
      </div>
    </div>
  );
}
