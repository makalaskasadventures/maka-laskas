'use client';

import { useState, useEffect } from 'react';
import { DndContext, closestCenter, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import { v4 as uuidv4 } from 'uuid';
import { Plus, Edit, Eye, EyeOff, Calendar, ArrowLeft, FileText, Image as ImageIcon } from 'lucide-react';

import ElementsSidebar from './ElementsSidebar';
import Canvas from './Canvas';
import ElementSettingsPanel from './ElementSettingsPanel';
import Toolbar from './Toolbar';

type SectionKey = 'newsletter' | 'stories';

const TABS: { key: SectionKey; label: string; defaultTitle: string }[] = [
  { key: 'newsletter', label: 'Newsletter', defaultTitle: 'Newsletter Edition' },
  { key: 'stories', label: 'Travel Stories', defaultTitle: 'New Travel Story' },
];

interface MediaListItem {
  id: string;
  key: SectionKey;
  title: string;
  thumbnail?: string | null;
  isActive: boolean;
  publishedAt?: string | null;
  updatedAt: string;
  createdAt: string;
}

export default function AdminMediaBuilder() {
  const [view, setView] = useState<'list' | 'editor'>('list');
  const [mediaItems, setMediaItems] = useState<MediaListItem[]>([]);
  const [listLoading, setListLoading] = useState(true);
  const [editorType, setEditorType] = useState<SectionKey>('stories');
  const [editorMode, setEditorMode] = useState<'create' | 'edit'>('create');
  const [currentId, setCurrentId] = useState<string | null>(null);
  const [title, setTitle] = useState('');
  const [thumbnail, setThumbnail] = useState('');
  const [itemsPerPage, setItemsPerPage] = useState(9);
  const [isPaginated, setIsPaginated] = useState(true);
  const [elements, setElements] = useState<any[]>([]);
  const [selectedElement, setSelectedElement] = useState<any | null>(null);
  const [saving, setSaving] = useState(false);
  const [publishing, setPublishing] = useState(false);
  const [entryLoading, setEntryLoading] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  useEffect(() => {
    fetchMediaItems();
  }, []);

  const fetchMediaItems = async () => {
    setListLoading(true);
    try {
      const response = await fetch('/api/admin/media', {
        credentials: 'include',
      });
      const data = await response.json();
      if (data.success) {
        setMediaItems(data.data || []);
      }
    } catch (error) {
      console.error('Error fetching media entries:', error);
    } finally {
      setListLoading(false);
    }
  };

  const resetEditorState = () => {
    setCurrentId(null);
    setEditorMode('create');
    setTitle('');
    setThumbnail('');
    setItemsPerPage(9);
    setIsPaginated(true);
    setElements([]);
    setSelectedElement(null);
  };

  const handleCreateNew = (tabKey: SectionKey) => {
    setEditorType(tabKey);
    setEditorMode('create');
    const selectedTab = TABS.find(t => t.key === tabKey);
    setTitle(selectedTab?.defaultTitle || 'Untitled');
    setThumbnail('');
    setElements([]);
    setSelectedElement(null);
    setView('editor');
  };

  const loadEntry = async (id: string) => {
    setEntryLoading(true);
    try {
      const response = await fetch(`/api/admin/media/${id}`, {
        credentials: 'include',
      });
      const data = await response.json();
      if (data.success && data.data) {
        const entry = data.data;
        setTitle(entry.title || '');
        setThumbnail(entry.thumbnail || '');
        setItemsPerPage(entry.itemsPerPage || 9);
        setIsPaginated(entry.isPaginated ?? true);
        setElements(entry.content?.blocks || []);
        setSelectedElement(null);
      }
    } catch (error) {
      console.error('Failed to load media entry', error);
    } finally {
      setEntryLoading(false);
    }
  };

  const handleEdit = (item: MediaListItem) => {
    setEditorType(item.key);
    setEditorMode('edit');
    setCurrentId(item.id);
    setView('editor');
    loadEntry(item.id);
  };

  const handleBackToList = () => {
    setView('list');
    resetEditorState();
    fetchMediaItems();
  };

  const handleAddElement = (element: any) => {
    setElements(prev => [...prev, element]);
  };

  const handleUpdateElement = (id: string, updates: any) => {
    setElements(prev =>
      prev.map(el => {
        if (el.id === id) {
          const updated = { ...el, ...updates };
          if (selectedElement?.id === id) {
            setSelectedElement(updated);
          }
          return updated;
        }
        return el;
      })
    );
  };

  const handleDeleteElement = (id: string) => {
    setElements(prev => prev.filter(el => el.id !== id));
    if (selectedElement?.id === id) {
      setSelectedElement(null);
    }
  };

  const handleDuplicateElement = (element: any) => {
    const duplicated = {
      ...element,
      id: uuidv4(),
      props: { ...element.props },
    };
    setElements(prev => [...prev, duplicated]);
  };

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (active.id !== over?.id) {
      setElements(items => {
        const oldIndex = items.findIndex(item => item.id === active.id);
        const newIndex = items.findIndex(item => item.id === over?.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const persistEntry = async (publish: boolean) => {
    const payload = {
      key: editorType,
      title: title.trim() || TABS.find(t => t.key === editorType)?.defaultTitle || 'Untitled',
      thumbnail: thumbnail.trim() || null,
      content: { blocks: elements },
      itemsPerPage,
      isPaginated,
      isActive: publish,
    };

    const endpoint = currentId ? `/api/admin/media/${currentId}` : '/api/admin/media';
    const method = currentId ? 'PUT' : 'POST';

    const response = await fetch(endpoint, {
      method,
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: 'Unknown error' }));
      throw new Error(errorData.message || `Failed to save media entry: ${response.status} ${response.statusText}`);
    }

    const result = await response.json();
    if (!result.success) {
      throw new Error(result.message || 'Failed to save media entry');
    }
    
    return result.data;
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const saved = await persistEntry(false);
      if (saved?.id) {
        setCurrentId(saved.id);
      }
      await fetchMediaItems();
      handleBackToList();
    } catch (error: any) {
      console.error('Error saving draft:', error);
      alert(error.message || 'Failed to save draft. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const handlePublish = async () => {
    setPublishing(true);
    try {
      const saved = await persistEntry(true);
      if (saved?.id) {
        setCurrentId(saved.id);
      }
      await fetchMediaItems();
      handleBackToList();
    } catch (error: any) {
      console.error('Error publishing media entry:', error);
      alert(error.message || 'Failed to publish. Please try again.');
    } finally {
      setPublishing(false);
    }
  };

  const handlePreview = () => {
    window.open(`/media?preview=${editorType}`, '_blank');
  };

  const handleExport = () => {
    const data = {
      title,
      content: { blocks: elements },
      itemsPerPage,
      isPaginated,
      section: editorType,
      exportedAt: new Date().toISOString(),
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${editorType}-draft.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleImport = (file: File) => {
    const reader = new FileReader();
    reader.onload = e => {
      try {
        const data = JSON.parse(e.target?.result as string);
        if (data.content?.blocks) {
          setElements(data.content.blocks);
          if (data.title) setTitle(data.title);
          if (data.itemsPerPage) setItemsPerPage(data.itemsPerPage);
          if (typeof data.isPaginated === 'boolean') setIsPaginated(data.isPaginated);
        }
      } catch (error) {
        console.error('Error importing file:', error);
      }
    };
    reader.readAsText(file);
  };

  const renderStatusBadge = (item: MediaListItem) => {
    if (item.isActive) {
      return (
        <span className="flex items-center gap-1 px-2 py-0.5 bg-green-100 text-green-700 text-xs rounded-full">
          <Eye className="w-3 h-3" />
          Published
        </span>
      );
    }
    return (
      <span className="flex items-center gap-1 px-2 py-0.5 bg-gray-100 text-gray-700 text-xs rounded-full">
        <EyeOff className="w-3 h-3" />
        Draft
      </span>
    );
  };

  if (view === 'list') {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-6 flex items-center justify-between flex-wrap gap-3">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Media Management</h1>
              <p className="text-gray-600 mt-1">See drafts and published entries before editing.</p>
            </div>
            <div className="flex flex-wrap gap-3 justify-end">
              {TABS.map(tab => (
                <button
                  key={tab.key}
                  onClick={() => handleCreateNew(tab.key)}
                  className="flex items-center gap-2 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  New {tab.label}
                </button>
              ))}
            </div>
          </div>

          {listLoading ? (
            <div className="flex items-center justify-center py-16">
              <div className="w-10 h-10 border-4 border-orange-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : (
            <div className="space-y-5">
              {TABS.map(tab => {
                const items = mediaItems.filter(item => item.key === tab.key);
                return (
                  <div key={tab.key} className="bg-white rounded-xl shadow-sm border border-gray-200">
                    <div className="p-4 border-b border-gray-100 flex items-center justify-between">
                      <h2 className="text-xl font-semibold text-gray-900">{tab.label}</h2>
                      <p className="text-sm text-gray-500">{items.length} entries</p>
                    </div>
                    <div className="p-4">
                      {items.length === 0 ? (
                        <div className="text-center py-10 text-gray-500">
                          <FileText className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                          <p>No {tab.label.toLowerCase()} yet.</p>
                          <button
                            onClick={() => handleCreateNew(tab.key)}
                            className="mt-4 text-orange-600 hover:text-orange-700 font-medium"
                          >
                            Create your first {tab.label.toLowerCase()}
                          </button>
                        </div>
                      ) : (
                        <div className="space-y-3">
                          {items.map(item => (
                            <div
                              key={item.id}
                              className="flex items-center justify-between gap-4 p-4 border border-gray-200 rounded-lg hover:border-orange-300 hover:bg-orange-50 transition-colors"
                            >
                              <div className="flex items-center gap-4 flex-1 min-w-0">
                                <div className="w-20 h-16 bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center">
                                  {item.thumbnail ? (
                                    <img src={item.thumbnail} alt={item.title} className="w-full h-full object-cover" />
                                  ) : (
                                    <ImageIcon className="w-5 h-5 text-gray-400" />
                                  )}
                                </div>
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center gap-2">
                                    <h3 className="font-semibold text-gray-900 truncate">{item.title}</h3>
                                    {renderStatusBadge(item)}
                                  </div>
                                  <p className="text-sm text-gray-500 mt-1">
                                    {item.isActive && item.publishedAt
                                      ? `Published ${new Date(item.publishedAt).toLocaleDateString()}`
                                      : `Updated ${new Date(item.updatedAt).toLocaleDateString()}`}
                                  </p>
                                </div>
                              </div>
                              <button
                                onClick={() => handleEdit(item)}
                                className="flex items-center gap-2 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
                              >
                                <Edit className="w-4 h-4" />
                                Edit
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col bg-gray-100">
      <Toolbar
        onSave={handleSave}
        onPreview={handlePreview}
        onPublish={handlePublish}
        onImport={handleImport}
        onExport={handleExport}
        itemsPerPage={itemsPerPage}
        onItemsPerPageChange={setItemsPerPage}
        isPaginated={isPaginated}
        onPaginatedChange={setIsPaginated}
        saving={saving}
        publishing={publishing}
      />

      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-2">
            <button
              onClick={handleBackToList}
              className="flex items-center gap-2 px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Media Management
            </button>
            <span className="text-sm text-gray-500">
              {editorMode === 'create' ? 'Creating new entry' : 'Editing existing entry'}
            </span>
          </div>
          <div className="flex space-x-1">
            {TABS.map(tab => (
              <button
                key={tab.key}
                onClick={() => setEditorType(tab.key)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  editorType === tab.key ? 'bg-orange-600 text-white' : 'text-gray-700 hover:bg-gray-100'
                }`}
                disabled={editorMode === 'edit'}
                title={editorMode === 'edit' ? 'Type is locked while editing' : `Switch to ${tab.label}`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
            <input
              type="text"
              value={title}
              onChange={e => setTitle(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="Enter publication title"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Cover Image URL</label>
            <input
              type="text"
              value={thumbnail}
              onChange={e => setThumbnail(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="https://"
            />
          </div>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        <div className="w-80 border-r border-gray-200 bg-white">
          <ElementsSidebar onAddElement={handleAddElement} />
        </div>

        <div className="flex-1 bg-white overflow-y-auto">
          {entryLoading ? (
            <div className="flex items-center justify-center h-full">
              <div className="w-10 h-10 border-4 border-orange-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : (
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
              modifiers={[restrictToVerticalAxis]}
            >
              <SortableContext items={elements.map(el => el.id)} strategy={verticalListSortingStrategy}>
                <Canvas
                  elements={elements}
                  selectedElement={selectedElement}
                  onSelectElement={setSelectedElement}
                  onUpdateElement={handleUpdateElement}
                  onDeleteElement={handleDeleteElement}
                  onDuplicateElement={handleDuplicateElement}
                />
              </SortableContext>
            </DndContext>
          )}
        </div>

        <div className="w-80 border-l border-gray-200 bg-white">
          <ElementSettingsPanel element={selectedElement} onUpdateElement={handleUpdateElement} />
        </div>
      </div>
    </div>
  );
}

