import Sidebar from '../../components/StudentSideBar';
import Navbar from '../../components/DashboardNavBar';
import React, { ReactNode } from 'react';

export default function StudentLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Navbar/>
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 bg-gray-50">{children}</main>
    </div>
    </>
  );
}