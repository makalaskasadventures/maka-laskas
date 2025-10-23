'use client';

import { useState, useEffect } from 'react';
import { Plus, Trash2, Image as ImageIcon, Save, X } from 'lucide-react';

interface AdventureFormProps {
  adventure?: any;
  onSubmit: (data: any) => void;
  onCancel?: () => void;
}

export default function AdventureForm({ adventure, onSubmit, onCancel }: AdventureFormProps) {
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    description: '',
    shortDescription: '',
    image: '',
    gallery: [] as string[],
    duration: 1,
    groupSize: 10,
    minAge: null as number | null,
    difficulty: 'MODERATE',
    price: 0,
    originalPrice: null as number | null,
    isActive: true,
    isFeatured: false,
    isOnSale: false,
    countryId: '',
    destinationId: '',
    categoryId: '',
    themeId: '',
  });

  const [countries, setCountries] = useState<any[]>([]);
  const [destinations, setDestinations] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [themes, setThemes] = useState<any[]>([]);
  const [highlights, setHighlights] = useState<Array<{ title: string; description: string; icon: string }>>([]);
  const [itinerary, setItinerary] = useState<Array<{ day: number; title: string; description: string; activities: string[]; meals: string[]; accommodation: string }>>([]);
  const [newGalleryUrl, setNewGalleryUrl] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchOptions();
    if (adventure) {
      setFormData({
        title: adventure.title || '',
        slug: adventure.slug || '',
        description: adventure.description || '',
        shortDescription: adventure.shortDescription || '',
        image: adventure.image || '',
        gallery: adventure.gallery || [],
        duration: adventure.duration || 1,
        groupSize: adventure.groupSize || 10,
        minAge: adventure.minAge,
        difficulty: adventure.difficulty || 'MODERATE',
        price: adventure.price || 0,
        originalPrice: adventure.originalPrice,
        isActive: adventure.isActive ?? true,
        isFeatured: adventure.isFeatured ?? false,
        isOnSale: adventure.isOnSale ?? false,
        countryId: adventure.countryId || '',
        destinationId: adventure.destinationId || '',
        categoryId: adventure.categoryId || '',
        themeId: adventure.themeId || '',
      });
      setHighlights(adventure.highlights || []);
      setItinerary(adventure.itinerary || []);
    }
  }, [adventure]);

  const fetchOptions = async () => {
    try {
      const [countriesRes, categoriesRes, themesRes] = await Promise.all([
        fetch('/api/admin/adventures/options/countries'),
        fetch('/api/admin/adventures/options/categories'),
        fetch('/api/admin/adventures/options/themes'),
      ]);

      if (countriesRes.ok) {
        const data = await countriesRes.json();
        setCountries(data.countries || []);
      }
      if (categoriesRes.ok) {
        const data = await categoriesRes.json();
        setCategories(data.categories || []);
      }
      if (themesRes.ok) {
        const data = await themesRes.json();
        setThemes(data.themes || []);
      }
    } catch (error) {
      console.error('Error fetching options:', error);
    }
  };

  useEffect(() => {
    if (formData.countryId) {
      fetchDestinations(formData.countryId);
    } else {
      setDestinations([]);
    }
  }, [formData.countryId]);

  const fetchDestinations = async (countryId: string) => {
    try {
      const response = await fetch(`/api/admin/adventures/options/destinations?countryId=${countryId}`);
      if (response.ok) {
        const data = await response.json();
        setDestinations(data.destinations || []);
      }
    } catch (error) {
      console.error('Error fetching destinations:', error);
    }
  };

  const handleChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Auto-generate slug from title
    if (field === 'title') {
      const slug = value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      setFormData(prev => ({ ...prev, slug }));
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        handleChange('image', event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const addToGallery = () => {
    if (newGalleryUrl.trim()) {
      setFormData(prev => ({ ...prev, gallery: [...prev.gallery, newGalleryUrl] }));
      setNewGalleryUrl('');
    }
  };

  const removeFromGallery = (index: number) => {
    setFormData(prev => ({ ...prev, gallery: prev.gallery.filter((_, i) => i !== index) }));
  };

  const addHighlight = () => {
    setHighlights(prev => [...prev, { title: '', description: '', icon: '' }]);
  };

  const updateHighlight = (index: number, field: string, value: string) => {
    setHighlights(prev =>
      prev.map((h, i) => (i === index ? { ...h, [field]: value } : h))
    );
  };

  const removeHighlight = (index: number) => {
    setHighlights(prev => prev.filter((_, i) => i !== index));
  };

  const addItineraryDay = () => {
    const nextDay = itinerary.length + 1;
    setItinerary(prev => [
      ...prev,
      { day: nextDay, title: '', description: '', activities: [], meals: [], accommodation: '' }
    ]);
  };

  const updateItinerary = (index: number, field: string, value: any) => {
    setItinerary(prev =>
      prev.map((item, i) => (i === index ? { ...item, [field]: value } : item))
    );
  };

  const removeItineraryDay = (index: number) => {
    setItinerary(prev => prev.filter((_, i) => i !== index).map((item, i) => ({ ...item, day: i + 1 })));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      await onSubmit({
        ...formData,
        highlights,
        itinerary,
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Basic Information */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Basic Information</h2>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Adventure Title *
            </label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => handleChange('title', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              placeholder="e.g., Serengeti Safari Adventure"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              URL Slug *
            </label>
            <input
              type="text"
              required
              value={formData.slug}
              onChange={(e) => handleChange('slug', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              placeholder="serengeti-safari-adventure"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Short Description *
            </label>
            <textarea
              required
              value={formData.shortDescription}
              onChange={(e) => handleChange('shortDescription', e.target.value)}
              rows={2}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              placeholder="Brief summary for cards and listings"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Full Description *
            </label>
            <textarea
              required
              value={formData.description}
              onChange={(e) => handleChange('description', e.target.value)}
              rows={6}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              placeholder="Detailed adventure description"
            />
          </div>
        </div>
      </div>

      {/* Image & Gallery */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Images</h2>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Main Image *
            </label>
            <div className="space-y-2">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm"
              />
              <input
                type="url"
                value={formData.image}
                onChange={(e) => handleChange('image', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                placeholder="Or paste image URL"
              />
              {formData.image && (
                <img src={formData.image} alt="Preview" className="w-full h-48 object-cover rounded-lg" />
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Gallery Images
            </label>
            <div className="flex gap-2 mb-2">
              <input
                type="url"
                value={newGalleryUrl}
                onChange={(e) => setNewGalleryUrl(e.target.value)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                placeholder="Image URL"
              />
              <button
                type="button"
                onClick={addToGallery}
                className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
            <div className="grid grid-cols-4 gap-2">
              {formData.gallery.map((url, index) => (
                <div key={index} className="relative group">
                  <img src={url} alt={`Gallery ${index + 1}`} className="w-full h-24 object-cover rounded" />
                  <button
                    type="button"
                    onClick={() => removeFromGallery(index)}
                    className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Details */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Adventure Details</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Duration (days) *
            </label>
            <input
              type="number"
              required
              min="1"
              value={formData.duration}
              onChange={(e) => handleChange('duration', parseInt(e.target.value))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Max Group Size *
            </label>
            <input
              type="number"
              required
              min="1"
              value={formData.groupSize}
              onChange={(e) => handleChange('groupSize', parseInt(e.target.value))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Minimum Age
            </label>
            <input
              type="number"
              min="0"
              value={formData.minAge || ''}
              onChange={(e) => handleChange('minAge', e.target.value ? parseInt(e.target.value) : null)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Difficulty *
            </label>
            <select
              required
              value={formData.difficulty}
              onChange={(e) => handleChange('difficulty', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            >
              <option value="EASY">Easy</option>
              <option value="MODERATE">Moderate</option>
              <option value="CHALLENGING">Challenging</option>
              <option value="EXTREME">Extreme</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Price (USD) *
            </label>
            <input
              type="number"
              required
              min="0"
              step="0.01"
              value={formData.price}
              onChange={(e) => handleChange('price', parseFloat(e.target.value))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Original Price (for sales)
            </label>
            <input
              type="number"
              min="0"
              step="0.01"
              value={formData.originalPrice || ''}
              onChange={(e) => handleChange('originalPrice', e.target.value ? parseFloat(e.target.value) : null)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      {/* Location & Category */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Location & Category</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Country *
            </label>
            <select
              required
              value={formData.countryId}
              onChange={(e) => handleChange('countryId', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            >
              <option value="">Select country</option>
              {countries.map(country => (
                <option key={country.id} value={country.id}>{country.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Destination
            </label>
            <select
              value={formData.destinationId}
              onChange={(e) => handleChange('destinationId', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              disabled={!formData.countryId}
            >
              <option value="">Select destination</option>
              {destinations.map(dest => (
                <option key={dest.id} value={dest.id}>{dest.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category *
            </label>
            <select
              required
              value={formData.categoryId}
              onChange={(e) => handleChange('categoryId', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            >
              <option value="">Select category</option>
              {categories.map(cat => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Theme
            </label>
            <select
              value={formData.themeId}
              onChange={(e) => handleChange('themeId', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            >
              <option value="">Select theme</option>
              {themes.map(theme => (
                <option key={theme.id} value={theme.id}>{theme.name}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Highlights */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Highlights</h2>
          <button
            type="button"
            onClick={addHighlight}
            className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 inline-flex items-center"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Highlight
          </button>
        </div>

        <div className="space-y-3">
          {highlights.map((highlight, index) => (
            <div key={index} className="p-4 border border-gray-200 rounded-lg">
              <div className="flex items-start justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">Highlight {index + 1}</span>
                <button
                  type="button"
                  onClick={() => removeHighlight(index)}
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                <input
                  type="text"
                  value={highlight.title}
                  onChange={(e) => updateHighlight(index, 'title', e.target.value)}
                  className="px-3 py-2 text-sm border border-gray-300 rounded"
                  placeholder="Title"
                />
                <input
                  type="text"
                  value={highlight.description}
                  onChange={(e) => updateHighlight(index, 'description', e.target.value)}
                  className="px-3 py-2 text-sm border border-gray-300 rounded"
                  placeholder="Description"
                />
                <input
                  type="text"
                  value={highlight.icon}
                  onChange={(e) => updateHighlight(index, 'icon', e.target.value)}
                  className="px-3 py-2 text-sm border border-gray-300 rounded"
                  placeholder="Icon (optional)"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Itinerary */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Itinerary</h2>
          <button
            type="button"
            onClick={addItineraryDay}
            className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 inline-flex items-center"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Day
          </button>
        </div>

        <div className="space-y-4">
          {itinerary.map((day, index) => (
            <div key={index} className="p-4 border border-gray-200 rounded-lg">
              <div className="flex items-start justify-between mb-3">
                <span className="text-sm font-semibold text-gray-900">Day {day.day}</span>
                <button
                  type="button"
                  onClick={() => removeItineraryDay(index)}
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              <div className="space-y-2">
                <input
                  type="text"
                  value={day.title}
                  onChange={(e) => updateItinerary(index, 'title', e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded"
                  placeholder="Day title"
                />
                <textarea
                  value={day.description}
                  onChange={(e) => updateItinerary(index, 'description', e.target.value)}
                  rows={2}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded"
                  placeholder="Day description"
                />
                <input
                  type="text"
                  value={day.activities.join(', ')}
                  onChange={(e) => updateItinerary(index, 'activities', e.target.value.split(',').map(s => s.trim()).filter(Boolean))}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded"
                  placeholder="Activities (comma separated)"
                />
                <input
                  type="text"
                  value={day.meals.join(', ')}
                  onChange={(e) => updateItinerary(index, 'meals', e.target.value.split(',').map(s => s.trim()).filter(Boolean))}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded"
                  placeholder="Meals (comma separated)"
                />
                <input
                  type="text"
                  value={day.accommodation}
                  onChange={(e) => updateItinerary(index, 'accommodation', e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded"
                  placeholder="Accommodation"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Settings */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Settings</h2>
        
        <div className="space-y-3">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={formData.isActive}
              onChange={(e) => handleChange('isActive', e.target.checked)}
              className="w-4 h-4 text-orange-600 border-gray-300 rounded focus:ring-orange-500"
            />
            <span className="ml-2 text-sm text-gray-700">Active (visible to users)</span>
          </label>

          <label className="flex items-center">
            <input
              type="checkbox"
              checked={formData.isFeatured}
              onChange={(e) => handleChange('isFeatured', e.target.checked)}
              className="w-4 h-4 text-orange-600 border-gray-300 rounded focus:ring-orange-500"
            />
            <span className="ml-2 text-sm text-gray-700">Featured (show on homepage)</span>
          </label>

          <label className="flex items-center">
            <input
              type="checkbox"
              checked={formData.isOnSale}
              onChange={(e) => handleChange('isOnSale', e.target.checked)}
              className="w-4 h-4 text-orange-600 border-gray-300 rounded focus:ring-orange-500"
            />
            <span className="ml-2 text-sm text-gray-700">On Sale</span>
          </label>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 inline-flex items-center"
          >
            <X className="w-4 h-4 mr-2" />
            Cancel
          </button>
        )}
        <button
          type="submit"
          disabled={submitting}
          className={`px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 inline-flex items-center disabled:opacity-50 ${!onCancel ? 'ml-auto' : ''}`}
        >
          <Save className="w-4 h-4 mr-2" />
          {submitting ? 'Saving...' : (adventure ? 'Update Adventure' : 'Create Adventure')}
        </button>
      </div>
    </form>
  );
}

