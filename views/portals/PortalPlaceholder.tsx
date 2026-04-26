"use client";
import { PageHeader } from '@/components/shared/PageHeader';
import { usePathname } from 'next/navigation';


export default function PortalPlaceholder() {
  const pathname = usePathname();
  const section = pathname.split('/').pop() || 'Page';
  const title = section.charAt(0).toUpperCase() + section.slice(1);

  return (
    <div className="max-w-3xl">
      <PageHeader title={title} description="This section is coming soon." />
      <div className="bg-card border border-border rounded-lg p-12 text-center">
        <p className="text-sm text-muted-foreground">This portal section will be built out with full functionality.</p>
      </div>
    </div>
  );
}
