'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import CustomButton from './CustomButtonModel';
import {
  Calendar,
  CheckSquare,
  Folder,
  Star,
  StickyNote,
  Settings,
  MoreVertical,
  User,
  Crown,
  ChevronRight,
  Plus,
  Search,
  Bell,
  Zap,
} from 'lucide-react';

const StudentSidebar = () => {
  const [activeItem, setActiveItem] = useState('Projects');
  const [notifications] = useState(3);

  return (
    <aside className="w-[280px] h-screen bg-gradient-to-b from-value3 via-white to-value3 border-r border-value2 flex flex-col shadow-xl overflow-hidden sticky top-0">
      {/* Animated Background Elements */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-full blur-3xl opacity-30 animate-pulse"></div>
      <div className="absolute bottom-20 left-0 w-24 h-24 bg-gradient-to-br from-accent/10 to-info/10 rounded-full blur-2xl opacity-40 animate-pulse delay-1000"></div>
      

      {/* Main Content */}
      <div className="relative flex-1 px-4 py-4 flex flex-col justify-between overflow-y-auto">
        {/* Navigation Menu */}
        <div className="px-4 space-y-2">
          <SidebarItem 
            icon={<Calendar size={18} />} 
            label="Calendar" 
            active={activeItem === 'Calendar'}
            onClick={() => setActiveItem('Calendar')}
          />
          <SidebarItem 
            icon={<CheckSquare size={18} />} 
            label="Todo" 
            active={activeItem === 'Todo'}
            onClick={() => setActiveItem('Todo')}
            badge={5}
          />
          <SidebarItem 
            icon={<Folder size={18} />} 
            label="Projects" 
            active={activeItem === 'Projects'}
            onClick={() => setActiveItem('Projects')}
          />
          <SidebarItem 
            icon={<Star size={18} />} 
            label="Starred" 
            active={activeItem === 'Starred'}
            onClick={() => setActiveItem('Starred')}
          />
          <SidebarItem 
            icon={<StickyNote size={18} />} 
            label="Notes" 
            active={activeItem === 'Notes'}
            onClick={() => setActiveItem('Notes')}
            badge={12}
          />
        </div>

        {/* Projects Section */}
        <div className="mt-8 px-4">
          <div className="flex items-center justify-between mb-4">
            <p className="text-xs text-value1 font-semibold uppercase tracking-wider flex items-center">
              <Zap size={12} className="mr-1 text-accent" />
              Projects
            </p>
            <button className="p-1.5 hover:bg-value3 rounded-lg transition-all duration-200 hover:scale-105">
              <Plus size={14} className="text-value1 hover:text-primary" />
            </button>
          </div>
          
          <div className="space-y-3">
            <ProjectItem 
              iconColor="bg-gradient-to-br from-accent to-info" 
              label="Flower Shop" 
              count={23}
              progress={75}
            />
            <ProjectItem 
              iconColor="bg-gradient-to-br from-danger to-accent" 
              label="Cloth" 
              count={345}
              progress={60}
              active
            />
            <ProjectItem 
              iconColor="bg-gradient-to-br from-info to-primary" 
              label="Gamer Boy" 
              count={568}
              progress={90}
            />
          </div>
        </div>

      </div>
      
    </aside>
  );
};

const SidebarItem = ({
  icon,
  label,
  active = false,
  onClick,
  badge,
}: {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  onClick?: () => void;
  badge?: number;
}) => (
  <button
    onClick={onClick}
    className={`group relative flex items-center justify-between w-full px-4 py-3 rounded-xl transition-all duration-300 transform hover:scale-[1.02] ${
      active 
        ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-lg shadow-primary/25 scale-[1.02]' 
        : 'text-gray-700 hover:bg-value3 hover:text-primary'
    }`}
  >
    {active && (
      <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-secondary/80 rounded-xl blur opacity-30"></div>
    )}
    <div className="relative flex items-center">
      <span className={`mr-3 transition-all duration-300 ${active ? 'scale-110 drop-shadow-sm' : 'group-hover:scale-105'}`}>
        {icon}
      </span>
      <span className="font-medium">{label}</span>
    </div>
    {badge && (
      <span className={`relative px-2.5 py-1 text-xs font-bold rounded-full transition-all duration-300 ${
        active 
          ? 'bg-white/20 text-white shadow-lg' 
          : 'bg-gradient-to-r from-primary/10 to-secondary/10 text-primary group-hover:scale-110'
      }`}>
        {badge}
      </span>
    )}
  </button>
);

const ProjectItem = ({
  iconColor,
  label,
  count,
  progress = 0,
  active = false,
}: {
  iconColor: string;
  label: string;
  count: number;
  progress?: number;
  active?: boolean;
}) => (
  <div className={`group relative flex items-center justify-between text-sm py-4 px-4 hover:bg-value3 rounded-xl cursor-pointer transition-all duration-300 transform hover:scale-[1.02] ${
    active ? 'bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20 shadow-md' : 'hover:shadow-sm'
  }`}>
    {active && (
      <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-xl blur opacity-50"></div>
    )}
    <div className="relative flex items-center space-x-3 flex-1 min-w-0">
      <div className={`relative w-10 h-10 rounded-xl ${iconColor} shadow-lg flex items-center justify-center group-hover:scale-105 transition-all duration-300 hover:shadow-xl`}>
        <div className="w-4 h-4 bg-white rounded-lg opacity-90 shadow-sm"></div>
        <div className="absolute inset-0 bg-white rounded-xl opacity-20"></div>
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-1">
          <span className="text-gray-900 font-semibold truncate text-sm">{label}</span>
          <span className="text-value1 text-xs font-medium bg-value3 px-2 py-0.5 rounded-full">{count}</span>
        </div>
        {progress > 0 && (
          <div className="space-y-1">
            <div className="w-full bg-value2 rounded-full h-2 overflow-hidden">
              <div 
                className="bg-gradient-to-r from-primary to-secondary h-2 rounded-full transition-all duration-500 shadow-sm relative overflow-hidden"
                style={{ width: `${progress}%` }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30 animate-pulse"></div>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs text-value1 font-medium">{progress}% complete</span>
              <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                progress >= 80 ? 'bg-success/10 text-success' :
                progress >= 50 ? 'bg-accent/10 text-accent' :
                'bg-danger/10 text-danger'
              }`}>
                {progress >= 80 ? 'Nearly done' : progress >= 50 ? 'In progress' : 'Just started'}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  </div>
);

const QuickAction = ({
  icon,
  label,
}: {
  icon: React.ReactNode;
  label: string;
}) => (
  <button className="group flex items-center w-full px-4 py-3 text-gray-700 hover:bg-gradient-to-r hover:from-value3 hover:to-value3 rounded-xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-sm">
    <span className="mr-3 p-2 bg-gradient-to-br from-value3 to-value2 rounded-xl group-hover:from-primary/10 group-hover:to-secondary/10 group-hover:text-primary transition-all duration-300 group-hover:scale-110 shadow-sm">
      {icon}
    </span>
    <span className="text-sm font-medium group-hover:text-primary">{label}</span>
    <ChevronRight size={14} className="ml-auto text-value1 group-hover:text-primary group-hover:translate-x-1 transition-all duration-300" />
  </button>
);

export default StudentSidebar;