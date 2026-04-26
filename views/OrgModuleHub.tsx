"use client";
import { useRouter } from 'next/navigation';

import { motion } from 'framer-motion';
import { MODULES } from '@/types/modules';
import { PageHeader } from '@/components/shared/PageHeader';
import { SectionLabel } from '@/components/shared/SectionLabel';
import { LogDot } from '@/components/shared/LogDot';
import { useAppContext } from '@/contexts/AppContext';

export default function OrgModuleHub() {
  const router = useRouter();
  const { currentOrg } = useAppContext();

  if (!currentOrg) return null;

  const enabledModules = MODULES.filter(m => currentOrg.enabledModules.includes(m.key));

  const recentLogs = [
    { dot: 'green' as const, text: 'Shipment #0042 delivered — Lagos to Port Harcourt', time: '10:15 AM', module: 'Logistics' },
    { dot: 'blue' as const, text: 'Room 204 — Guest checked in', time: '9:50 AM', module: 'Hotel' },
    { dot: 'amber' as const, text: 'Fee payment — ₦15,000 received', time: '9:22 AM', module: 'School' },
  ];

  return (
    <div className="max-w-5xl">
      <PageHeader
        title={`${currentOrg.name}`}
        description="Select a module to manage, or view recent activity."
      />

      <SectionLabel>Enabled Modules</SectionLabel>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 mb-8">
        {enabledModules.map((mod, i) => (
          <motion.button
            key={mod.key}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            onClick={() => router.push(`/org/${currentOrg.slug}/modules/${mod.key}`)}
            className="bg-card border border-border rounded-lg p-3.5 text-left hover:border-primary/30 hover:shadow-sm transition-all cursor-pointer group"
          >
            <div className={`w-8 h-8 rounded-lg ${mod.color} flex items-center justify-center text-base mb-2`}>
              {mod.icon}
            </div>
            <div className="text-[13px] font-medium text-foreground group-hover:text-primary transition-colors">{mod.name}</div>
            <div className="text-[11px] text-muted-foreground mt-0.5">{mod.description}</div>
          </motion.button>
        ))}
      </div>

      <SectionLabel>Recent Activity</SectionLabel>
      <div className="bg-card border border-border rounded-lg divide-y divide-border">
        {recentLogs.map((log, i) => (
          <div key={i} className="flex items-center gap-3 px-4 py-3 text-[13px]">
            <LogDot color={log.dot} />
            <span className="flex-1 text-foreground">{log.text}</span>
            <span className="text-[11px] text-muted-foreground px-2 py-0.5 bg-secondary rounded">{log.module}</span>
            <span className="text-[11px] text-muted-foreground whitespace-nowrap">{log.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
