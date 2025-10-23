'use client';

import { useState, useEffect } from 'react';
import { DndContext, closestCenter, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import { v4 as uuidv4 } from 'uuid';

import ElementsSidebar from './ElementsSidebar';
import Canvas from './Canvas';
import ElementSettingsPanel from './ElementSettingsPanel';
import Toolbar from './Toolbar';

const TABS = [
  { key: 'newsletter', label: 'Newsletter', defaultTitle: 'Newsletter' },
  { key: 'stories', label: 'Travel Stories', defaultTitle: 'Travel Stories' },
  { key: 'awards', label: 'Awards', defaultTitle: 'Global Recognition & Awards' },
  { key: 'keynotes', label: 'Keynotes', defaultTitle: "Founder's Keynotes" },
  { key: 'kit', label: 'Media Kit', defaultTitle: 'Media Kit' },
];

export default function AdminMediaBuilder() {
  const [activeTab, setActiveTab] = useState('stories');
  const [title, setTitle] = useState('');
  const [itemsPerPage, setItemsPerPage] = useState(9);
  const [isPaginated, setIsPaginated] = useState(true);
  const [elements, setElements] = useState<any[]>([]);
  const [selectedElement, setSelectedElement] = useState<any | null>(null);
  const [saving, setSaving] = useState(false);
  const [publishing, setPublishing] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  // Load section data when tab changes
  useEffect(() => {
    const selectedTab = TABS.find(t => t.key === activeTab);
    if (!selectedTab) return;

    fetch(`/api/media/${activeTab}`)
      .then(res => res.json())
      .then(data => {
        if (data?.success && data.data) {
          setTitle(data.data.title || selectedTab.defaultTitle);
          setItemsPerPage(data.data.itemsPerPage || 9);
          setIsPaginated(data.data.isPaginated ?? true);
          setElements(data.data.content?.blocks || []);
        } else {
          setTitle(selectedTab.defaultTitle);
          setItemsPerPage(9);
          setIsPaginated(true);
          setElements([]);
        }
        setSelectedElement(null);
      })
      .catch(() => {
        setTitle(selectedTab.defaultTitle);
        setItemsPerPage(9);
        setIsPaginated(true);
        setElements([]);
        setSelectedElement(null);
      });
  }, [activeTab]);

  const handleAddElement = (element: any) => {
    setElements(prev => [...prev, element]);
  };

  const handleUpdateElement = (id: string, updates: any) => {
    setElements(prev => 
      prev.map(el => {
        if (el.id === id) {
          const updated = { ...el, ...updates };
          // Also update selectedElement if this is the currently selected element
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
      props: { ...element.props }
    };
    setElements(prev => [...prev, duplicated]);
  };

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    
    if (active.id !== over?.id) {
      setElements((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const payload = {
        title,
        content: { blocks: elements },
        itemsPerPage,
        isPaginated,
        isActive: true,
      };

      const response = await fetch(`/api/media/${activeTab}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error('Failed to save');
      }

      // Show success message (you could add a toast notification here)
      console.log('Section saved successfully');
    } catch (error) {
      console.error('Error saving section:', error);
      // Show error message
    } finally {
      setSaving(false);
    }
  };

  const handlePublish = async () => {
    setPublishing(true);
    try {
      // Same as save but with published status
      await handleSave();
      console.log('Section published successfully');
    } catch (error) {
      console.error('Error publishing section:', error);
    } finally {
      setPublishing(false);
    }
  };

  const handlePreview = () => {
    // Open preview in new window/tab
    window.open(`/media?preview=${activeTab}`, '_blank');
  };

  const handleExport = () => {
    const data = {
      title,
      content: { blocks: elements },
      itemsPerPage,
      isPaginated,
      section: activeTab,
      exportedAt: new Date().toISOString(),
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${activeTab}-section.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleImport = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
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

  return (
    <div className="h-screen flex flex-col bg-gray-100">
      {/* Top Toolbar */}
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

      {/* Tab Navigation */}
      <div className="bg-white border-b border-gray-200 px-6 py-3">
        <div className="flex space-x-1">
          {TABS.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === tab.key
                  ? 'bg-orange-600 text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Builder Area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar - Elements */}
        <div className="w-80 border-r border-gray-200 bg-white">
          <ElementsSidebar onAddElement={handleAddElement} />
        </div>

        {/* Center - Canvas */}
        <div className="flex-1 bg-white">
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
            modifiers={[restrictToVerticalAxis]}
          >
            <SortableContext
              items={elements.map(el => el.id)}
              strategy={verticalListSortingStrategy}
            >
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
        </div>

        {/* Right Sidebar - Settings */}
        <div className="w-80 border-l border-gray-200 bg-white">
          <ElementSettingsPanel
            element={selectedElement}
            onUpdateElement={handleUpdateElement}
          />
        </div>
      </div>
    </div>
  );
}
