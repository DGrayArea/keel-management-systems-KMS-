"use client";
import { cn } from '@/lib/utils';

export function SectionLabel({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <p className={cn('text-[11px] text-muted-foreground uppercase tracking-wider mb-2.5', className)}>
      {children}
    </p>
  );
}
