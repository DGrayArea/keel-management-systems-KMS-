"use client";
import { useAppContext } from '@/contexts/AppContext';
import { ROLE_LABELS, type UserRole } from '@/types/organisation';
import { cn } from '@/lib/utils';

const roles: UserRole[] = ['super_admin', 'admin', 'manager', 'client', 'courier'];

export function RoleSwitcher() {
  const { currentRole, setCurrentRole } = useAppContext();

  return (
    <div className="flex items-center gap-1 bg-secondary rounded-lg p-1">
      <span className="text-[10px] text-muted-foreground px-2">View as:</span>
      {roles.map(role => (
        <button
          key={role}
          onClick={() => setCurrentRole(role)}
          className={cn(
            'text-[11px] px-2.5 py-1 rounded-md transition-colors',
            currentRole === role
              ? 'bg-card text-foreground font-medium shadow-sm'
              : 'text-muted-foreground hover:text-foreground'
          )}
        >
          {ROLE_LABELS[role]}
        </button>
      ))}
    </div>
  );
}
