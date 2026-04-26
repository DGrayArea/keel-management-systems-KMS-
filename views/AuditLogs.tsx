"use client";
import { PageHeader } from '@/components/shared/PageHeader';
import { StatCard } from '@/components/shared/StatCard';
import { SectionLabel } from '@/components/shared/SectionLabel';
import { LogDot } from '@/components/shared/LogDot';
import { FilterPills } from '@/components/shared/FilterPills';
import { useState } from 'react';

const logs = [
  { dot: 'green' as const, text: 'Shipment #0042 delivered — Lagos to Port Harcourt', module: 'Logistics', user: 'Ade Okonkwo', time: '10:15 AM' },
  { dot: 'blue' as const, text: 'Room 204 — Guest checked in', module: 'Hotel', user: 'System', time: '9:50 AM' },
  { dot: 'amber' as const, text: 'Fee payment — ₦15,000 received from Bello family', module: 'School', user: 'Admin', time: '9:22 AM' },
  { dot: 'coral' as const, text: 'Vehicle V-07 maintenance flag raised', module: 'Logistics', user: 'Musa Usman', time: '9:05 AM' },
  { dot: 'green' as const, text: 'Stock replenished — Cement ×200 units', module: 'Inventory', user: 'Admin', time: '8:40 AM' },
  { dot: 'blue' as const, text: 'New patient registered — Patient #1042', module: 'Hospital', user: 'Dr. Amina', time: '8:30 AM' },
  { dot: 'amber' as const, text: 'Leave request submitted — 5 days annual leave', module: 'HR', user: 'Yusuf Danladi', time: '8:15 AM' },
  { dot: 'green' as const, text: 'Invoice #INV-2024-089 paid — ₦450,000', module: 'Finance', user: 'System', time: 'Yesterday 6:30 PM' },
  { dot: 'blue' as const, text: 'Room 312 — Booking confirmed for next week', module: 'Hotel', user: 'Guest portal', time: 'Yesterday 5:00 PM' },
  { dot: 'coral' as const, text: 'Exam timetable updated for JSS 3', module: 'School', user: 'Admin', time: 'Yesterday 4:00 PM' },
];

const modules = ['All', 'Logistics', 'Hotel', 'School', 'Inventory', 'Hospital', 'Finance', 'HR'];

export default function AuditLogs() {
  const [filter, setFilter] = useState('All');
  const filtered = filter === 'All' ? logs : logs.filter(l => l.module === filter);

  return (
    <div className="max-w-4xl">
      <PageHeader title="Audit Logs" description="Unified activity log across all modules" />

      <div className="grid grid-cols-4 gap-2.5 mb-5">
        <StatCard value={156} label="Total events today" />
        <StatCard value={7} label="Modules active" />
        <StatCard value={12} label="Users active" />
        <StatCard value={3} label="Alerts" />
      </div>

      <FilterPills
        filters={modules.map(m => ({ key: m, label: m }))}
        active={filter}
        onChange={setFilter}
      />

      <SectionLabel>Activity stream</SectionLabel>
      <div className="bg-card border border-border rounded-lg divide-y divide-border">
        {filtered.map((log, i) => (
          <div key={i} className="flex items-center gap-3 px-4 py-3 text-[13px]">
            <LogDot color={log.dot} />
            <span className="flex-1 text-foreground">{log.text}</span>
            <span className="text-[11px] text-muted-foreground px-2 py-0.5 bg-secondary rounded">{log.module}</span>
            <span className="text-[11px] text-muted-foreground">{log.user}</span>
            <span className="text-[11px] text-muted-foreground whitespace-nowrap">{log.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
