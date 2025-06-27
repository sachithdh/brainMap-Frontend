'use client';

import React from 'react';
import { 
  Home, 
  Users, 
  FileText, 
  MessageSquare, 
  Settings, 
  CheckCircle, 
  Lock, 
  TrendingUp,
  Shield,
  Bell,
  Calendar,
  Flag,
  UserPlus,
  UserX,
  UserCheck
} from 'lucide-react';

interface MenuItem {
  title: string;
  icon: React.ComponentType<any>;
  url: string;
}

interface UserManagementItem {
  title: string;
  icon: React.ComponentType<any>;
  url: string;
  count: string;
  color: string;
}

interface ModerationItem {
  title: string;
  icon: React.ComponentType<any>;
  url: string;
  count: string;
  color: string;
}

interface AdminSideBarProps {
  currentPage: string;
  onNavigate?: (url: string) => void;
}

function AdminSideBar({ currentPage, onNavigate }: AdminSideBarProps) {
  // Admin Menu Items
  const menuItems: MenuItem[] = [
    { title: 'Dashboard', icon: Home, url: 'dashboard' },
    { title: 'Users', icon: Users, url: 'users' },
    { title: 'Content', icon: FileText, url: 'content' },
    { title: 'Messages', icon: MessageSquare, url: 'messages' },
    { title: 'Calendar', icon: Calendar, url: 'calendar' },
    { title: 'Settings', icon: Settings, url: 'settings' },
  ];

  // User Management Items
  const userManagement: UserManagementItem[] = [
    { title: 'New Users', icon: UserPlus, url: 'new-users', count: '12', color: 'bg-green-500' },
    { title: 'Active Users', icon: UserCheck, url: 'active-users', count: '1,284', color: 'bg-blue-500' },
    { title: 'Banned Users', icon: UserX, url: 'banned-users', count: '3', color: 'bg-red-500' },
  ];

  // Moderation Items
  const moderationItems: ModerationItem[] = [
    { title: 'Reported Posts', icon: Flag, url: 'reported-posts', count: '8', color: 'bg-orange-500' },
    { title: 'Pending Reviews', icon: Bell, url: 'pending-reviews', count: '15', color: 'bg-yellow-500' },
    { title: 'Security Alerts', icon: Shield, url: 'security-alerts', count: '2', color: 'bg-red-500' },
  ];

  return (
    <div className="w-64 bg-white shadow-sm border-r border-gray-200 flex flex-col">
      <div className="flex-1">
        <div className="p-4 space-y-6">
          {/* Main Menu */}
          <div>
            <div className="space-y-1">
              {menuItems.map((item) => (
                <button
                  key={item.title}
                  onClick={() => onNavigate?.(item.url)}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                    currentPage === item.url
                      ? "bg-blue-500 text-white"
                      : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                  }`}
                >
                  <item.icon className="h-4 w-4" />
                  <span>{item.title}</span>
                </button>
              ))}
            </div>
          </div>

          {/* User Management */}
          <div>
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">USER MANAGEMENT</h3>
            <div className="space-y-1">
              {userManagement.map((item) => (
                <button
                  key={item.title}
                  onClick={() => onNavigate?.(item.url)}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                    currentPage === item.url
                      ? "bg-blue-500 text-white"
                      : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                  }`}
                >
                  <div className={`w-2 h-2 rounded-full ${item.color}`}></div>
                  <item.icon className="h-4 w-4" />
                  <span className="flex-1 text-left">{item.title}</span>
                  <span className="text-xs text-gray-500">{item.count}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Moderation */}
          <div>
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">MODERATION</h3>
            <div className="space-y-1">
              {moderationItems.map((item) => (
                <button
                  key={item.title}
                  onClick={() => onNavigate?.(item.url)}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                    currentPage === item.url
                      ? "bg-blue-500 text-white"
                      : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                  }`}
                >
                  <div className={`w-2 h-2 rounded-full ${item.color}`}></div>
                  <item.icon className="h-4 w-4" />
                  <span className="flex-1 text-left">{item.title}</span>
                  <span className="text-xs text-gray-500">{item.count}</span>
                </button>
              ))}
            </div>
          </div>

          {/* System */}
          <div>
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">SYSTEM</h3>
            <div className="space-y-1">
              <button
                onClick={() => onNavigate?.("compliance")}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                  currentPage === "compliance"
                    ? "bg-blue-500 text-white"
                    : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                }`}
              >
                <CheckCircle className="h-4 w-4" />
                <span>Compliance Monitor</span>
              </button>
              <button
                onClick={() => onNavigate?.("security")}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                  currentPage === "security"
                    ? "bg-blue-500 text-white"
                    : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                }`}
              >
                <Lock className="h-4 w-4" />
                <span>Security Center</span>
              </button>
              <button
                onClick={() => onNavigate?.("analytics")}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                  currentPage === "analytics"
                    ? "bg-blue-500 text-white"
                    : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                }`}
              >
                <TrendingUp className="h-4 w-4" />
                <span>Usage Analytics</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminSideBar;
