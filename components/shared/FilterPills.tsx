"use client";
import { cn } from '@/lib/utils';

interface FilterPillsProps {
  filters: { key: string; label: string }[];
  active: string;
  onChange: (key: string) => void;
}

export function FilterPills({ filters, active, onChange }: FilterPillsProps) {
  return (
    <div className="flex gap-2 mb-4 flex-wrap">
      {filters.map((f) => (
        <button
          key={f.key}
          onClick={() => onChange(f.key)}
          className={cn(
            'px-3 py-1 text-xs rounded-full border transition-all cursor-pointer',
            active === f.key
              ? 'bg-secondary text-foreground border-border'
              : 'bg-transparent text-muted-foreground border-border/50 hover:bg-secondary/50'
          )}
        >
          {f.label}
        </button>
      ))}
    </div>
  );
}
