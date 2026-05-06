"use client";
import { AppSidebar } from './AppSidebar';
import { AppHeader } from './AppHeader';

export function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-screen overflow-hidden flex w-full bg-background">
      <AppSidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <AppHeader />
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
