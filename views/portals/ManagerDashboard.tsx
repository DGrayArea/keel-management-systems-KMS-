"use client";
import { PageHeader } from '@/components/shared/PageHeader';
import { StatCard } from '@/components/shared/StatCard';
import { SectionLabel } from '@/components/shared/SectionLabel';
import { LogDot } from '@/components/shared/LogDot';
import { useAppContext } from '@/contexts/AppContext';
import { ClipboardList, TrendingUp, AlertTriangle, CheckCircle } from 'lucide-react';

export default function ManagerDashboard() {
  const { currentOrg } = useAppContext();

  return (
    <div className="max-w-4xl">
      <PageHeader
        title="Manager Dashboard"
        description={`${currentOrg?.name} — your operational overview`}
      />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
        <StatCard label="Active Tasks" value={12} icon={<ClipboardList className="w-4 h-4" />} />
        <StatCard label="Completed Today" value={7} icon={<CheckCircle className="w-4 h-4" />} />
        <StatCard label="Pending Issues" value={3} icon={<AlertTriangle className="w-4 h-4" />} />
        <StatCard label="Efficiency" value="94%" icon={<TrendingUp className="w-4 h-4" />} />
      </div>

      <SectionLabel>Recent Activity</SectionLabel>
      <div className="bg-card border border-border rounded-lg divide-y divide-border">
        {[
          { dot: 'green' as const, text: 'Task #024 completed — Stock recount', time: '11:30 AM' },
          { dot: 'blue' as const, text: 'New delivery assigned — Route #15', time: '10:45 AM' },
          { dot: 'amber' as const, text: 'Low stock alert — Item #067', time: '9:20 AM' },
          { dot: 'green' as const, text: 'Shift report submitted', time: '8:00 AM' },
        ].map((log, i) => (
          <div key={i} className="flex items-center gap-3 px-4 py-3 text-[13px]">
            <LogDot color={log.dot} />
            <span className="flex-1 text-foreground">{log.text}</span>
            <span className="text-[11px] text-muted-foreground">{log.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
