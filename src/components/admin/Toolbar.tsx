'use client';

import { useState } from 'react';
import { Save, Eye, Settings, Download, Upload } from 'lucide-react';

interface ToolbarProps {
  onSave: () => void;
  onPreview: () => void;
  onPublish: () => void;
  onImport: (file: File) => void;
  onExport: () => void;
  itemsPerPage: number;
  onItemsPerPageChange: (value: number) => void;
  isPaginated: boolean;
  onPaginatedChange: (value: boolean) => void;
  saving?: boolean;
  publishing?: boolean;
}

export default function Toolbar({
  onSave,
  onPreview,
  onPublish,
  onImport,
  onExport,
  itemsPerPage,
  onItemsPerPageChange,
  isPaginated,
  onPaginatedChange,
  saving = false,
  publishing = false
}: ToolbarProps) {
  const [showSettings, setShowSettings] = useState(false);

  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onImport(file);
    }
  };

  return (
    <div className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Left Side - Main Actions */}
        <div className="flex items-center space-x-3">
          <button
            onClick={onSave}
            disabled={saving}
            className="btn-primary inline-flex items-center"
          >
            <Save className="w-4 h-4 mr-2" />
            {saving ? 'Saving...' : 'Save Draft'}
          </button>

          <button
            onClick={onPreview}
            className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors inline-flex items-center"
          >
            <Eye className="w-4 h-4 mr-2" />
            Preview
          </button>

          <button
            onClick={onPublish}
            disabled={publishing}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors inline-flex items-center disabled:opacity-50"
          >
            <Upload className="w-4 h-4 mr-2" />
            {publishing ? 'Publishing...' : 'Publish'}
          </button>
        </div>

        {/* Center - Section Info */}
        <div className="flex items-center space-x-4">
          <div className="text-sm text-gray-600">
            <span className="font-medium">Section:</span> Media Builder
          </div>
        </div>

        {/* Right Side - Settings & Export */}
        <div className="flex items-center space-x-3">
          {/* Pagination Settings */}
          <div className="flex items-center space-x-2">
            <label className="text-sm text-gray-600">Pagination:</label>
            <input
              type="checkbox"
              checked={isPaginated}
              onChange={(e) => onPaginatedChange(e.target.checked)}
              className="rounded border-gray-300 text-orange-600 focus:ring-orange-500"
            />
          </div>

          {isPaginated && (
            <div className="flex items-center space-x-2">
              <label className="text-sm text-gray-600">Items per page:</label>
              <input
                type="number"
                min="1"
                max="50"
                value={itemsPerPage}
                onChange={(e) => onItemsPerPageChange(parseInt(e.target.value) || 1)}
                className="w-16 px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>
          )}

          {/* Settings Toggle */}
          <button
            onClick={() => setShowSettings(!showSettings)}
            className={`p-2 rounded-lg transition-colors ${
              showSettings 
                ? 'bg-orange-100 text-orange-600' 
                : 'text-gray-600 hover:bg-gray-100'
            }`}
            title="Settings"
          >
            <Settings className="w-4 h-4" />
          </button>

          {/* Export */}
          <button
            onClick={onExport}
            className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            title="Export Section"
          >
            <Download className="w-4 h-4" />
          </button>

          {/* Import */}
          <label className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer">
            <Upload className="w-4 h-4" />
            <input
              type="file"
              accept=".json"
              onChange={handleImport}
              className="hidden"
            />
          </label>
        </div>
      </div>

      {/* Settings Panel */}
      {showSettings && (
        <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
          <h4 className="text-sm font-medium text-gray-900 mb-3">Section Settings</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Pagination
              </label>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={isPaginated}
                  onChange={(e) => onPaginatedChange(e.target.checked)}
                  className="rounded border-gray-300 text-orange-600 focus:ring-orange-500"
                />
                <span className="text-sm text-gray-600">Enable pagination</span>
              </div>
            </div>

            {isPaginated && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Items per page
                </label>
                <input
                  type="number"
                  min="1"
                  max="50"
                  value={itemsPerPage}
                  onChange={(e) => onItemsPerPageChange(parseInt(e.target.value) || 1)}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Section Status
              </label>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm text-gray-600">Active</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Last Modified
              </label>
              <span className="text-sm text-gray-600">
                {new Date().toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
