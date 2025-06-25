'use client';

import React, { useState } from 'react';
import SimpleTableRow from '@/components/SimpleTableRow';
import { 
  Calendar,
  Kanban,
  List,
  BarChart3,
  ArrowUpDown,
  Plus,
  Filter,
  Search,
  Download,
  Check,
  MoreHorizontal,
  Folder,
  Hash
} from 'lucide-react';

interface TableItem {
  id: number;
  name: string;
  description: string;
  category: string;
  status: 'active' | 'inactive';
  lastModified: string;
}

export default function ListBoardPage() {
  const [selectedItems, setSelectedItems] = useState<Set<number>>(new Set([1, 2, 4, 5, 6]));
  const [searchTerm, setSearchTerm] = useState('');
  const [activeView, setActiveView] = useState('Kanban');

  // Sample data matching the image
  const tableItems: TableItem[] = [
    { id: 1, name: 'Bold text column', description: 'Regular text column', category: 'Regular text column', status: 'active', lastModified: 'Regular text column' },
    { id: 2, name: 'Bold text column', description: 'Regular text column', category: 'Regular text column', status: 'active', lastModified: 'Regular text column' },
    { id: 3, name: 'Bold text column', description: 'Regular text column', category: 'Regular text column', status: 'inactive', lastModified: 'Regular text column' },
    { id: 4, name: 'Bold text column', description: 'Regular text column', category: 'Regular text column', status: 'active', lastModified: 'Regular text column' },
    { id: 5, name: 'Bold text column', description: 'Regular text column', category: 'Regular text column', status: 'inactive', lastModified: 'Regular text column' },
    { id: 6, name: 'Bold text column', description: 'Regular text column', category: 'Regular text column', status: 'active', lastModified: 'Regular text column' },
    { id: 7, name: 'Bold text column', description: 'Regular text column', category: 'Regular text column', status: 'active', lastModified: 'Regular text column' },
    { id: 8, name: 'Bold text column', description: 'Regular text column', category: 'Regular text column', status: 'inactive', lastModified: 'Regular text column' },
    { id: 9, name: 'Bold text column', description: 'Regular text column', category: 'Regular text column', status: 'active', lastModified: 'Regular text column' },
    { id: 10, name: 'Bold text column', description: 'Regular text column', category: 'Regular text column', status: 'active', lastModified: 'Regular text column' },
    { id: 11, name: 'Bold text column', description: 'Regular text column', category: 'Regular text column', status: 'inactive', lastModified: 'Regular text column' },
    { id: 12, name: 'Bold text column', description: 'Regular text column', category: 'Regular text column', status: 'active', lastModified: 'Regular text column' },
    { id: 13, name: 'Bold text column', description: 'Regular text column', category: 'Regular text column', status: 'inactive', lastModified: 'Regular text column' },
    { id: 14, name: 'Bold text column', description: 'Regular text column', category: 'Regular text column', status: 'active', lastModified: 'Regular text column' },
  ];

  const filteredItems = tableItems.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleToggleSelect = (id: string | number) => {
    const newSelected = new Set(selectedItems);
    const numId = typeof id === 'string' ? parseInt(id) : id;
    if (newSelected.has(numId)) {
      newSelected.delete(numId);
    } else {
      newSelected.add(numId);
    }
    setSelectedItems(newSelected);
  };

  const handleSelectAll = () => {
    if (selectedItems.size === filteredItems.length) {
      setSelectedItems(new Set());
    } else {
      setSelectedItems(new Set(filteredItems.map(item => item.id)));
    }
  };

  const handleRowClick = (id: string | number) => {
    console.log('Row clicked:', id);
  };

  const handleEdit = (id: string | number) => {
    console.log('Edit item:', id);
  };

  const handleDelete = (id: string | number) => {
    console.log('Delete item:', id);
  };

  const handleDuplicate = (id: string | number) => {
    console.log('Duplicate item:', id);
  };

  const viewTabs = [
    { name: 'Summary', icon: BarChart3, active: false },
    { name: 'Calendar', icon: Calendar, active: false },
    { name: 'Kanban', icon: Kanban, active: true },
    { name: 'List', icon: List, active: false },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200">
        {/* Project Header */}
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 bg-emerald-500 rounded-full"></div>
                <h1 className="text-xl font-semibold text-gray-900">Cloth</h1>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <Folder size={16} />
                <span>Projects</span>
                <span>→</span>
                <Hash size={16} />
                <span>Fashion</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <button className="p-2 hover:bg-gray-100 rounded-md">
                <MoreHorizontal size={20} className="text-gray-600" />
              </button>
            </div>
          </div>
        </div>

        {/* View Tabs */}
        <div className="px-6">
          <div className="flex space-x-6 border-b border-gray-200">
            {viewTabs.map((tab) => {
              const IconComponent = tab.icon;
              return (
                <button
                  key={tab.name}
                  onClick={() => setActiveView(tab.name)}
                  className={`flex items-center space-x-2 px-3 py-3 border-b-2 text-sm font-medium transition-colors ${
                    tab.name === activeView
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <IconComponent size={16} />
                  <span>{tab.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6">
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
          {/* Table Header Controls */}
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <h2 className="text-lg font-semibold text-gray-900">Project Tasks</h2>
                <span className="text-sm text-gray-500">{filteredItems.length} items</span>
              </div>
              
              <div className="flex items-center space-x-3">
                {/* Search */}
                <div className="relative">
                  <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search tasks..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-9 pr-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-64"
                  />
                </div>
                
                <button className="p-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
                  <Filter size={16} className="text-gray-500" />
                </button>
                
                <button className="p-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
                  <Download size={16} className="text-gray-500" />
                </button>
                
                <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center space-x-2 transition-colors">
                  <Plus size={16} />
                  <span>Add Task</span>
                </button>
              </div>
            </div>
          </div>

          {/* Column Headers */}
          <div className="flex items-center w-full bg-gray-50 border-b border-gray-200 text-sm font-medium text-gray-700">
            {/* Select All Checkbox */}
            <div className="flex items-center justify-center w-12 h-12 shrink-0">
              <button
                onClick={handleSelectAll}
                className={`
                  flex items-center justify-center w-5 h-5 rounded border-2 
                  transition-all duration-200
                  ${
                    selectedItems.size === filteredItems.length && filteredItems.length > 0
                      ? 'bg-blue-500 border-blue-500 text-white'
                      : selectedItems.size > 0
                      ? 'bg-blue-500 border-blue-500 text-white'
                      : 'border-gray-300 hover:border-blue-400 bg-white'
                  }
                `}
              >
                {selectedItems.size > 0 && (
                  selectedItems.size === filteredItems.length ? (
                    <Check size={12} className="text-white" />
                  ) : (
                    <div className="w-2 h-2 bg-white rounded-sm" />
                  )
                )}
              </button>
            </div>

            <div className="flex items-center px-4 py-3 flex-1">
              <span>Column heading</span>
              <ArrowUpDown size={14} className="ml-2 text-gray-400" />
            </div>
            
            <div className="flex items-center px-4 py-3 w-48">
              <span>Column heading</span>
              <ArrowUpDown size={14} className="ml-2 text-gray-400" />
            </div>
            
            <div className="flex items-center px-4 py-3 w-48">
              <span>Column heading</span>
              <ArrowUpDown size={14} className="ml-2 text-gray-400" />
            </div>
            
            <div className="flex items-center px-4 py-3 w-32">
              <span>Column heading</span>
              <ArrowUpDown size={14} className="ml-2 text-gray-400" />
            </div>
            
            <div className="flex items-center px-4 py-3 w-48">
              <span>Column heading</span>
              <ArrowUpDown size={14} className="ml-2 text-gray-400" />
            </div>
            
            <div className="w-12"></div> {/* Actions column */}
          </div>

          {/* Table Rows */}
          <div className="divide-y divide-gray-100">
            {filteredItems.map((item) => (
              <SimpleTableRow
                key={item.id}
                id={item.id}
                isSelected={selectedItems.has(item.id)}
                onToggleSelect={handleToggleSelect}
                onClick={handleRowClick}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onDuplicate={handleDuplicate}
                className="min-h-[52px]"
              >
                <div className="flex items-center space-x-4 px-4">
                  {/* First Column - Bold text */}
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-gray-900 truncate">
                      {item.name}
                    </div>
                  </div>
                  
                  {/* Second Column - Regular text */}
                  <div className="w-48 min-w-0">
                    <div className="text-gray-600 truncate">
                      {item.description}
                    </div>
                  </div>
                  
                  {/* Third Column - Regular text */}
                  <div className="w-48 min-w-0">
                    <div className="text-gray-600 truncate">
                      {item.category}
                    </div>
                  </div>
                  
                  {/* Fourth Column - Status */}
                  <div className="w-32">
                    <div className="flex items-center space-x-2">
                      <div
                        className={`w-2 h-2 rounded-full ${
                          item.status === 'active' ? 'bg-green-500' : 'bg-gray-400'
                        }`}
                      />
                      <span
                        className={`text-sm font-medium capitalize ${
                          item.status === 'active' ? 'text-green-600' : 'text-gray-500'
                        }`}
                      >
                        {item.status}
                      </span>
                    </div>
                  </div>
                  
                  {/* Fifth Column - Last Modified */}
                  <div className="w-48 min-w-0">
                    <div className="text-gray-600 truncate">
                      {item.lastModified}
                    </div>
                  </div>
                </div>
              </SimpleTableRow>
            ))}
          </div>

          {/* Selection Footer */}
          {selectedItems.size > 0 && (
            <div className="px-6 py-3 bg-blue-50 border-t border-blue-200">
              <div className="flex items-center justify-between">
                <span className="text-sm text-blue-700">
                  {selectedItems.size} item{selectedItems.size !== 1 ? 's' : ''} selected
                </span>
                <div className="flex items-center space-x-2">
                  <button 
                    onClick={() => setSelectedItems(new Set())}
                    className="px-3 py-1 text-sm border border-blue-300 text-blue-700 rounded hover:bg-blue-100 transition-colors"
                  >
                    Clear Selection
                  </button>
                  <button className="px-3 py-1 text-sm border border-blue-300 text-blue-700 rounded hover:bg-blue-100 transition-colors">
                    Bulk Edit
                  </button>
                  <button className="px-3 py-1 text-sm border border-red-300 text-red-700 rounded hover:bg-red-100 transition-colors">
                    Delete Selected
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Empty State */}
          {filteredItems.length === 0 && (
            <div className="flex items-center justify-center py-12">
              <div className="text-center">
                <div className="text-gray-400 mb-2">No tasks found</div>
                <div className="text-sm text-gray-500">
                  Try adjusting your search terms or add a new task
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}