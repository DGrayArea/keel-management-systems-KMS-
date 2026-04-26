"use client";
import { cn } from '@/lib/utils';

interface TabNavProps {
  tabs: { key: string; label: string }[];
  activeTab: string;
  onTabChange: (key: string) => void;
}

export function TabNav({ tabs, activeTab, onTabChange }: TabNavProps) {
  return (
    <div className="flex gap-1.5 mb-5">
      {tabs.map((tab) => (
        <button
          key={tab.key}
          onClick={() => onTabChange(tab.key)}
          className={cn(
            'px-3.5 py-1.5 text-[13px] rounded-md border transition-all duration-150 cursor-pointer',
            activeTab === tab.key
              ? 'bg-card border-border text-foreground font-medium shadow-sm'
              : 'bg-transparent border-transparent text-muted-foreground hover:bg-secondary hover:text-foreground'
          )}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
