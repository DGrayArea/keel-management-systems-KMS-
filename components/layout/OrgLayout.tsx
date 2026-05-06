"use client";
import { useRouter, useParams } from 'next/navigation';

import { useEffect } from 'react';
import { OrgSidebar } from './OrgSidebar';
import { AppHeader } from './AppHeader';
import { useAppContext } from '@/contexts/AppContext';

export function OrgLayout({ children }: { children: React.ReactNode }) {
  const { orgSlug } = useParams();
  const router = useRouter();
  const { organisations, currentOrg, setCurrentOrg } = useAppContext();

  useEffect(() => {
    if (orgSlug && (!currentOrg || currentOrg.slug !== orgSlug)) {
      const org = organisations.find(o => o.slug === orgSlug);
      if (org) {
        setCurrentOrg(org);
      } else {
        router.push('/');
      }
    }
  }, [orgSlug, currentOrg, organisations, setCurrentOrg, router]);

  if (!currentOrg) return null;

  return (
    <div className="h-screen overflow-hidden flex w-full bg-background">
      <OrgSidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <AppHeader />
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
