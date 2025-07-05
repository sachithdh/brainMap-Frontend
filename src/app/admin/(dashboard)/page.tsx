'use client';

import React, { useState, useEffect } from 'react';


// Dashboard Icons
const BrainIcon = () => (
  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
  </svg>
);

const ChartIcon = () => (
  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
  </svg>
);

const UsersIcon = () => (
  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
  </svg>
);

const BookIcon = () => (
  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
  </svg>
);



interface DashboardCard {
  title: string;
  value: string;
  change: string;
  icon: React.ReactNode;
  color: string;
}

interface RecentActivity {
  id: number;
  title: string;
  description: string;
  time: string;
  type: 'brain-map' | 'analysis' | 'collaboration' | 'learning';
}

export default function AdminDashboard() {
  const [isLoading, setIsLoading] = useState(true);

  // Mock data - in real app, this would come from API
  const dashboardCards: DashboardCard[] = [
    {
      title: 'Brain Maps Created',
      value: '24',
      change: '+12%',
      icon: <BrainIcon />,
      color: 'bg-blue-500'
    },
    {
      title: 'Analyses Completed',
      value: '156',
      change: '+8%',
      icon: <ChartIcon />,
      color: 'bg-green-500'
    },
    {
      title: 'Collaborations',
      value: '89',
      change: '+15%',
      icon: <UsersIcon />,
      color: 'bg-purple-500'
    },
    {
      title: 'Learning Modules',
      value: '12',
      change: '+3%',
      icon: <BookIcon />,
      color: 'bg-orange-500'
    }
  ];

  const recentActivities: RecentActivity[] = [
    {
      id: 1,
      title: 'New Brain Map Created',
      description: 'You created a new brain map for "Cognitive Neuroscience"',
      time: '2 hours ago',
      type: 'brain-map'
    },
    {
      id: 2,
      title: 'Analysis Completed',
      description: 'Pattern analysis completed for "Memory Networks"',
      time: '4 hours ago',
      type: 'analysis'
    },
    {
      id: 3,
      title: 'Collaboration Invitation',
      description: 'Dr. Smith invited you to collaborate on "Neural Pathways"',
      time: '1 day ago',
      type: 'collaboration'
    },
    {
      id: 4,
      title: 'Module Completed',
      description: 'You completed "Advanced Brain Mapping Techniques"',
      time: '2 days ago',
      type: 'learning'
    }
  ];

  useEffect(() => {
    // Simulate loading user data
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);


  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="mt-2 text-gray-600">Manage users, content, and system settings from your admin control panel.</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {dashboardCards.map((card, index) => (
            <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{card.title}</p>
                  <p className="text-2xl font-bold text-gray-900">{card.value}</p>
                </div>
                <div className={`p-3 rounded-full ${card.color} text-white`}>
                  {card.icon}
                </div>
              </div>
              <div className="mt-4">
                <span className="text-sm font-medium text-green-600">{card.change}</span>
                <span className="text-sm text-gray-600"> from last month</span>
              </div>
            </div>
          ))}
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h2>
          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                    <BrainIcon />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                  <p className="text-sm text-gray-600">{activity.description}</p>
                  <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Admin Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">User Actions</h3>
            <div className="space-y-3">
              <button
                onClick={() => console.log('Navigate to new-users')}
                className="block w-full text-left p-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
              >
                Review New Users
              </button>
              <button
                onClick={() => console.log('Navigate to banned-users')}
                className="block w-full text-left p-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
              >
                Manage Banned Users
              </button>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Content Moderation</h3>
            <div className="space-y-3">
              <button
                onClick={() => console.log('Navigate to reported-posts')}
                className="block w-full text-left p-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
              >
                Review Reports
              </button>
              <button
                onClick={() => console.log('Navigate to pending-reviews')}
                className="block w-full text-left p-3 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors"
              >
                Pending Reviews
              </button>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">System Status</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Server Status</span>
                <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded">Online</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Database</span>
                <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded">Healthy</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Security</span>
                <span className="px-2 py-1 text-xs bg-yellow-100 text-yellow-800 rounded">2 Alerts</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
