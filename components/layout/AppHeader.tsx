"use client";
import { Search, Bell } from 'lucide-react';
import { RoleSwitcher } from '@/components/RoleSwitcher';

export function AppHeader() {
  return (
    <header className="h-14 border-b border-border bg-card flex items-center justify-between px-6 flex-shrink-0">
      <div className="flex items-center gap-3 flex-1 max-w-md">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search across modules..."
            className="w-full h-9 pl-9 pr-3 text-sm bg-secondary rounded-md border-0 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/20"
          />
        </div>
      </div>
      <div className="flex items-center gap-3">
        <RoleSwitcher />
        <button className="relative p-2 rounded-md hover:bg-secondary text-muted-foreground transition-colors">
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-destructive rounded-full" />
        </button>
      </div>
    </header>
  );
}
