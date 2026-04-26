"use client";
import { useState } from 'react';
import { motion } from 'framer-motion';
import { PageHeader } from '@/components/shared/PageHeader';
import { StatCard } from '@/components/shared/StatCard';
import { FilterPills } from '@/components/shared/FilterPills';
import { SectionLabel } from '@/components/shared/SectionLabel';
import { StatusBadge } from '@/components/shared/StatusBadge';
import { Button } from '@/components/ui/button';
import { Plus, CheckSquare } from 'lucide-react';
import type { StatusVariant } from '@/types/modules';

const tasks = [
  { id: 'T-024', title: 'Stock recount — Section B aisles 3-5', assignee: 'Musa U.', priority: 'high', due: 'Today', status: 'in-progress' as const },
  { id: 'T-023', title: 'Approve March payroll run', assignee: 'You', priority: 'high', due: 'Today', status: 'todo' as const },
  { id: 'T-022', title: 'Sign off shipment manifest #0042', assignee: 'You', priority: 'med', due: 'Today', status: 'done' as const },
  { id: 'T-021', title: 'Review supplier invoice — Dangote', assignee: 'Ngozi A.', priority: 'med', due: 'Tomorrow', status: 'todo' as const },
  { id: 'T-020', title: 'Driver shift schedule — next week', assignee: 'You', priority: 'low', due: 'Apr 30', status: 'in-progress' as const },
  { id: 'T-019', title: 'Inspect vehicle V-07 brake report', assignee: 'Ibrahim B.', priority: 'high', due: 'Apr 28', status: 'todo' as const },
  { id: 'T-018', title: 'Quarterly safety audit prep', assignee: 'Fatima B.', priority: 'low', due: 'May 05', status: 'todo' as const },
];

const statusBadge: Record<string, StatusVariant> = { todo: 'gray', 'in-progress': 'blue', done: 'green' };
const statusLabel: Record<string, string> = { todo: 'To do', 'in-progress': 'In progress', done: 'Done' };
const priBadge: Record<string, StatusVariant> = { high: 'coral', med: 'amber', low: 'gray' };

export default function ManagerTasks() {
  const [filter, setFilter] = useState('all');
  const filtered = filter === 'all' ? tasks : tasks.filter(t => t.status === filter);

  return (
    <div className="max-w-4xl">
      <PageHeader
        title="Tasks"
        description="Operational tasks assigned to you and your team"
        actions={<Button size="sm" className="gap-1.5"><Plus className="w-4 h-4" />New task</Button>}
      />

      <div className="grid grid-cols-4 gap-2.5 mb-5">
        <StatCard value={tasks.length} label="Total" icon={<CheckSquare className="w-4 h-4" />} />
        <StatCard value={tasks.filter(t => t.status === 'todo').length} label="To do" />
        <StatCard value={tasks.filter(t => t.status === 'in-progress').length} label="In progress" />
        <StatCard value={tasks.filter(t => t.status === 'done').length} label="Done" />
      </div>

      <FilterPills
        filters={[
          { key: 'all', label: 'All' },
          { key: 'todo', label: 'To do' },
          { key: 'in-progress', label: 'In progress' },
          { key: 'done', label: 'Done' },
        ]}
        active={filter}
        onChange={setFilter}
      />

      <SectionLabel>Task list</SectionLabel>
      <div className="bg-card border border-border rounded-lg divide-y divide-border">
        {filtered.map((t, i) => (
          <motion.div
            key={t.id}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.03 }}
            className="flex items-center gap-3 px-4 py-3 hover:bg-secondary/30 transition-colors cursor-pointer"
          >
            <input type="checkbox" defaultChecked={t.status === 'done'} className="w-4 h-4 accent-primary" />
            <div className="flex-1 min-w-0">
              <div className={`text-[13px] font-medium ${t.status === 'done' ? 'line-through text-muted-foreground' : 'text-foreground'}`}>{t.title}</div>
              <div className="text-[11px] text-muted-foreground">{t.id} · {t.assignee} · Due {t.due}</div>
            </div>
            <StatusBadge variant={priBadge[t.priority]}>{t.priority}</StatusBadge>
            <StatusBadge variant={statusBadge[t.status]}>{statusLabel[t.status]}</StatusBadge>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
