"use client";
import { useRouter, usePathname } from 'next/navigation';

import { Truck, Map, History, ChevronLeft, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { useAppContext } from '@/contexts/AppContext';
const keelLogo = '/assets/keel-logo.png';

export function CourierSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { currentOrg } = useAppContext();
  const [collapsed, setCollapsed] = useState(false);

  const slug = currentOrg?.slug || '';
  const basePath = `/org/${slug}`;

  const items = [
    { label: 'Active Run', icon: Truck, path: `${basePath}/courier` },
    { label: 'Route Map', icon: Map, path: `${basePath}/courier/route` },
    { label: 'History', icon: History, path: `${basePath}/courier/history` },
    { label: 'Profile', icon: User, path: `${basePath}/courier/profile` },
  ];

  return (
    <aside className={cn(
      'h-screen bg-card border-r border-border flex flex-col transition-all duration-200 flex-shrink-0',
      collapsed ? 'w-16' : 'w-56'
    )}>
      <div className="h-14 flex items-center justify-between px-4 border-b border-border flex-shrink-0">
        {!collapsed && (
          <div className="flex items-center gap-2">
            <img src={keelLogo} alt="KEEL" className="w-6 h-6" />
            <span className="text-xs font-semibold text-foreground truncate">{currentOrg?.name}</span>
          </div>
        )}
        <button onClick={() => setCollapsed(!collapsed)} className="p-1.5 rounded-md hover:bg-secondary text-muted-foreground">
          <ChevronLeft className={cn('w-4 h-4 transition-transform', collapsed && 'rotate-180')} />
        </button>
      </div>

      <nav className="flex-1 overflow-y-auto py-3 px-2">
        {!collapsed && <p className="text-[10px] uppercase tracking-wider text-muted-foreground px-2 mb-1.5">Courier Portal</p>}
        {items.map(item => {
          const isActive = pathname === item.path;
          return (
            <button
              key={item.path}
              onClick={() => router.push(item.path)}
              className={cn(
                'w-full flex items-center gap-2.5 px-2.5 py-2 rounded-md text-[13px] transition-colors mb-0.5',
                isActive ? 'bg-primary/10 text-primary font-medium' : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
              )}
            >
              <item.icon className="w-4 h-4 flex-shrink-0" />
              {!collapsed && <span>{item.label}</span>}
            </button>
          );
        })}
      </nav>

      <div className="border-t border-border p-3 flex-shrink-0">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full badge-gray flex items-center justify-center text-xs font-medium flex-shrink-0">CR</div>
          {!collapsed && (
            <div className="min-w-0">
              <p className="text-xs font-medium text-foreground truncate">Musa Usman</p>
              <p className="text-[10px] text-muted-foreground truncate">Vehicle V-03</p>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
