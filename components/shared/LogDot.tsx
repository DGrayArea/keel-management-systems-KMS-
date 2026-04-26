"use client";
import { cn } from '@/lib/utils';

const dotColors = {
  green: 'bg-dot-green',
  amber: 'bg-dot-amber',
  blue: 'bg-dot-blue',
  coral: 'bg-dot-coral',
};

export function LogDot({ color }: { color: keyof typeof dotColors }) {
  return <span className={cn('w-2 h-2 rounded-full flex-shrink-0', dotColors[color])} />;
}
