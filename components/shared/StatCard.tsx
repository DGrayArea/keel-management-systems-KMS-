"use client";
import type { ReactNode } from 'react';

export function StatCard({ value, label, icon }: { value: string | number; label: string; icon?: ReactNode }) {
  return (
    <div className="bg-card border border-border rounded-lg p-4">
      <div className="flex items-center justify-between mb-2">
        <span className="text-[11px] text-muted-foreground uppercase tracking-wider">{label}</span>
        {icon && <span className="text-muted-foreground">{icon}</span>}
      </div>
      <div className="text-xl font-semibold text-foreground">{value}</div>
    </div>
  );
}
