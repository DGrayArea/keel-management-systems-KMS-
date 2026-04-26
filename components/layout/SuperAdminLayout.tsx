"use client";
import { SuperAdminSidebar } from './SuperAdminSidebar';
import { AppHeader } from './AppHeader';

export function SuperAdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex w-full bg-background">
      <SuperAdminSidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <AppHeader />
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
