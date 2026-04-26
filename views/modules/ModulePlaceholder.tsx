"use client";
import { PageHeader } from '@/components/shared/PageHeader';
import { useParams } from 'next/navigation';

import { MODULES } from '@/types/modules';

export default function ModulePlaceholder() {
  const { moduleId } = useParams();
  const mod = MODULES.find(m => m.key === moduleId);

  return (
    <div className="max-w-3xl">
      <PageHeader
        title={mod ? `${mod.name} Management` : 'Module'}
        description={mod ? `${mod.description} — coming soon` : 'Module not found'}
      />
      <div className="bg-card border border-border rounded-lg p-12 text-center">
        <div className="text-4xl mb-3">{mod?.icon || '📋'}</div>
        <h2 className="text-lg font-medium text-foreground mb-2">
          {mod?.name} module
        </h2>
        <p className="text-sm text-muted-foreground max-w-md mx-auto">
          This module is ready to be built out with full admin and client portal interfaces.
          The shared core (auth, audit logs, navigation) is already in place.
        </p>
      </div>
    </div>
  );
}
