"use client";
import { cn } from '@/lib/utils';
import type { StatusVariant } from '@/types/modules';

const variantClasses: Record<StatusVariant, string> = {
  green: 'badge-green',
  amber: 'badge-amber',
  blue: 'badge-blue',
  coral: 'badge-coral',
  gray: 'badge-gray',
};

export function StatusBadge({ variant, children }: { variant: StatusVariant; children: React.ReactNode }) {
  return (
    <span className={cn('inline-flex items-center text-[11px] px-2.5 py-0.5 rounded-full font-normal', variantClasses[variant])}>
      {children}
    </span>
  );
}
