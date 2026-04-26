"use client";
import { cn } from '@/lib/utils';

export function UserAvatar({ initials, bgClass, fgClass }: { initials: string; bgClass?: string; fgClass?: string }) {
  return (
    <div className={cn(
      'w-9 h-9 rounded-full flex items-center justify-center text-xs font-medium flex-shrink-0',
      bgClass || 'bg-secondary',
      fgClass || 'text-secondary-foreground'
    )}>
      {initials}
    </div>
  );
}
