"use client";
import { useRouter, usePathname } from "next/navigation";
import { useAppContext } from "@/contexts/AppContext";
import { MOCK_USERS, ROLE_LABELS } from "@/types/organisation";

import {
  LayoutGrid,
  Truck,
  Hotel,
  GraduationCap,
  Package,
  Activity,
  DollarSign,
  Users,
  Settings,
  FileText,
  Search,
  Bell,
  ChevronLeft,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

const navSections = [
  {
    label: "Overview",
    items: [
      { label: "Module Hub", icon: LayoutGrid, path: "/" },
      { label: "Audit Logs", icon: FileText, path: "/audit-logs" },
    ],
  },
  {
    label: "Modules",
    items: [
      { label: "Hotel", icon: Hotel, path: "/modules/hotel" },
      { label: "Logistics", icon: Truck, path: "/modules/logistics" },
      { label: "School", icon: GraduationCap, path: "/modules/school" },
      { label: "Inventory", icon: Package, path: "/modules/inventory" },
      { label: "Hospital", icon: Activity, path: "/modules/hospital" },
      { label: "Finance", icon: DollarSign, path: "/modules/finance" },
      { label: "HR", icon: Users, path: "/modules/hr" },
    ],
  },
  {
    label: "System",
    items: [{ label: "Settings", icon: Settings, path: "/settings" }],
  },
];

export function AppSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { currentRole, currentOrg } = useAppContext();
  const [collapsed, setCollapsed] = useState(false);

  const currentUser = currentOrg 
    ? MOCK_USERS.find(u => u.orgId === currentOrg.id && u.role === currentRole) || MOCK_USERS.find(u => u.role === currentRole)
    : MOCK_USERS.find(u => u.role === currentRole) || MOCK_USERS[0];

  const initials = currentUser?.name.split(" ").map(n => n[0]).join("") || "SA";

  return (
    <aside
      className={cn(
        "h-screen bg-card border-r border-border flex flex-col transition-all duration-200 flex-shrink-0",
        collapsed ? "w-16" : "w-60",
      )}
    >
      {/* Brand */}
      <div className="h-14 flex items-center justify-between px-4 border-b border-border flex-shrink-0">
        {!collapsed && (
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-primary-foreground text-xs font-bold">
                K
              </span>
            </div>
            <span className="text-sm font-semibold text-foreground tracking-tight">
              KEEL
            </span>
          </div>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-1.5 rounded-md hover:bg-secondary text-muted-foreground transition-colors"
        >
          <ChevronLeft
            className={cn(
              "w-4 h-4 transition-transform",
              collapsed && "rotate-180",
            )}
          />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-3 px-2">
        {navSections.map((section) => (
          <div key={section.label} className="mb-4">
            {!collapsed && (
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground px-2 mb-1.5">
                {section.label}
              </p>
            )}
            {section.items.map((item) => {
              const isActive =
                pathname === item.path ||
                (item.path !== "/" && pathname.startsWith(item.path));
              return (
                <button
                  key={item.path}
                  onClick={() => router.push(item.path)}
                  className={cn(
                    "w-full flex items-center gap-2.5 px-2.5 py-2 rounded-md text-[13px] transition-colors mb-0.5",
                    isActive
                      ? "bg-primary/10 text-primary font-medium"
                      : "text-muted-foreground hover:bg-secondary hover:text-foreground",
                  )}
                  title={collapsed ? item.label : undefined}
                >
                  <item.icon className="w-4 h-4 flex-shrink-0" />
                  {!collapsed && <span>{item.label}</span>}
                </button>
              );
            })}
          </div>
        ))}
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
                {currentUser?.name || "Super Admin"}
              </p>
              <p className="text-[10px] text-muted-foreground truncate">
                {currentUser?.email || "admin@keel.app"}
              </p>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
