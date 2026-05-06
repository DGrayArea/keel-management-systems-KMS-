"use client";
import { useRouter, usePathname } from 'next/navigation';

import {
  LayoutGrid, Truck, Hotel, GraduationCap, Package, Activity,
  DollarSign, Users, Settings, FileText, ChevronLeft, ArrowLeft,
  Handshake, Ticket,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { useAppContext } from '@/contexts/AppContext';
import { MODULES } from '@/types/modules';
import { MOCK_USERS } from '@/types/organisation';
const keelLogo = '/assets/keel-logo.png';

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  hotel: Hotel,
  logistics: Truck,
  school: GraduationCap,
  inventory: Package,
  hospital: Activity,
  finance: DollarSign,
  hr: Users,
  crm: Handshake,
  events: Ticket,
};

export function OrgSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { currentOrg, currentRole, setCurrentOrg } = useAppContext();
  const [collapsed, setCollapsed] = useState(false);

  const currentUser = currentOrg 
    ? MOCK_USERS.find(u => u.orgId === currentOrg.id && u.role === currentRole) || MOCK_USERS.find(u => u.role === currentRole)
    : MOCK_USERS.find(u => u.role === currentRole) || MOCK_USERS[0];
  const initials = currentUser?.name.split(" ").map(n => n[0]).join("") || (currentRole === 'super_admin' ? 'SA' : 'AD');

  if (!currentOrg) return null;
  const slug = currentOrg.slug;
  const basePath = `/org/${slug}`;

  const enabledModules = MODULES.filter(m => currentOrg.enabledModules.includes(m.key));

  const overviewItems = [
    { label: 'Module Hub', icon: LayoutGrid, path: basePath },
    { label: 'Audit Logs', icon: FileText, path: `${basePath}/audit-logs` },
  ];

  const systemItems = currentRole === 'super_admin' || currentRole === 'admin'
    ? [
        { label: 'Users', icon: Users, path: `${basePath}/users` },
        { label: 'Settings', icon: Settings, path: `${basePath}/settings` },
      ]
    : [];

  return (
    <aside className={cn(
      'h-screen bg-card border-r border-border flex flex-col transition-all duration-200 flex-shrink-0',
      collapsed ? 'w-16' : 'w-60'
    )}>
      {/* Brand + Org */}
      <div className="h-14 flex items-center justify-between px-4 border-b border-border flex-shrink-0">
        {!collapsed && (
          <div className="flex items-center gap-2 min-w-0">
            <img src={keelLogo} alt="KEEL" className="w-6 h-6 flex-shrink-0" />
            <div className="min-w-0">
              <p className="text-xs font-semibold text-foreground truncate">{currentOrg.name}</p>
            </div>
          </div>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-1.5 rounded-md hover:bg-secondary text-muted-foreground transition-colors"
        >
          <ChevronLeft className={cn('w-4 h-4 transition-transform', collapsed && 'rotate-180')} />
        </button>
      </div>

      {/* Back to super admin */}
      {currentRole === 'super_admin' && (
        <button
          onClick={() => { setCurrentOrg(null); router.push('/'); }}
          className="flex items-center gap-2 px-4 py-2.5 text-[11px] text-muted-foreground hover:text-foreground hover:bg-secondary border-b border-border transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          {!collapsed && <span>Back to Console</span>}
        </button>
      )}

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-3 px-2">
        {/* Overview */}
        <div className="mb-4">
          {!collapsed && (
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground px-2 mb-1.5">Overview</p>
          )}
          {overviewItems.map((item) => {
            const isActive = pathname === item.path || (item.path !== basePath && pathname.startsWith(item.path));
            return (
              <button
                key={item.path}
                onClick={() => router.push(item.path)}
                className={cn(
                  'w-full flex items-center gap-2.5 px-2.5 py-2 rounded-md text-[13px] transition-colors mb-0.5',
                  isActive ? 'bg-primary/10 text-primary font-medium' : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
                )}
                title={collapsed ? item.label : undefined}
              >
                <item.icon className="w-4 h-4 flex-shrink-0" />
                {!collapsed && <span>{item.label}</span>}
              </button>
            );
          })}
        </div>

        {/* Modules */}
        <div className="mb-4">
          {!collapsed && (
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground px-2 mb-1.5">Modules</p>
          )}
          {enabledModules.map((mod) => {
            const Icon = ICON_MAP[mod.key] || Package;
            const modPath = `${basePath}/modules/${mod.key}`;
            const isActive = pathname.startsWith(modPath);
            return (
              <button
                key={mod.key}
                onClick={() => router.push(modPath)}
                className={cn(
                  'w-full flex items-center gap-2.5 px-2.5 py-2 rounded-md text-[13px] transition-colors mb-0.5',
                  isActive ? 'bg-primary/10 text-primary font-medium' : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
                )}
                title={collapsed ? mod.name : undefined}
              >
                <Icon className="w-4 h-4 flex-shrink-0" />
                {!collapsed && <span>{mod.name}</span>}
              </button>
            );
          })}
        </div>

        {/* System */}
        {systemItems.length > 0 && (
          <div className="mb-4">
            {!collapsed && (
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground px-2 mb-1.5">System</p>
            )}
            {systemItems.map((item) => {
              const isActive = pathname === item.path || (item.path !== basePath && pathname.startsWith(item.path));
              return (
                <button
                  key={item.path}
                  onClick={() => router.push(item.path)}
                  className={cn(
                    'w-full flex items-center gap-2.5 px-2.5 py-2 rounded-md text-[13px] transition-colors mb-0.5',
                    isActive ? 'bg-primary/10 text-primary font-medium' : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
                  )}
                  title={collapsed ? item.label : undefined}
                >
                  <item.icon className="w-4 h-4 flex-shrink-0" />
                  {!collapsed && <span>{item.label}</span>}
                </button>
              );
            })}
          </div>
        )}
      </nav>

      {/* User area */}
      <div className="border-t border-border p-3 flex-shrink-0">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-xs font-medium text-primary flex-shrink-0">
            {initials}
          </div>
          {!collapsed && (
            <div className="min-w-0">
              <p className="text-xs font-medium text-foreground truncate">
                {currentUser?.name || (currentRole === 'super_admin' ? 'Super Admin' : 'Admin')}
              </p>
              <p className="text-[10px] text-muted-foreground truncate">{currentUser?.email || currentOrg.contactEmail}</p>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
