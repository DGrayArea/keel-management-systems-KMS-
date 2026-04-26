"use client";
import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { PageHeader } from '@/components/shared/PageHeader';
import { StatCard } from '@/components/shared/StatCard';
import { TabNav } from '@/components/shared/TabNav';
import { FilterPills } from '@/components/shared/FilterPills';
import { StatusBadge } from '@/components/shared/StatusBadge';
import { SectionLabel } from '@/components/shared/SectionLabel';
import { UserAvatar } from '@/components/shared/Avatar';
import { LogDot } from '@/components/shared/LogDot';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import type { StatusVariant } from '@/types/modules';

const tabs = [
  { key: 'employees', label: 'Employees' },
  { key: 'payroll', label: 'Payroll' },
  { key: 'leave', label: 'Leave' },
  { key: 'logs', label: 'Activity' },
];

const employees = [
  { id: 'EMP-001', name: 'Adewale Okafor', initials: 'AO', dept: 'Operations', role: 'Operations Lead', salary: 850000, status: 'active' as const },
  { id: 'EMP-002', name: 'Fatima Bello', initials: 'FB', dept: 'Operations', role: 'Manager', salary: 620000, status: 'active' as const },
  { id: 'EMP-003', name: 'Musa Usman', initials: 'MU', dept: 'Logistics', role: 'Driver', salary: 180000, status: 'active' as const },
  { id: 'EMP-004', name: 'Ngozi Adebayo', initials: 'NA', dept: 'Finance', role: 'Accountant', salary: 480000, status: 'active' as const },
  { id: 'EMP-005', name: 'Yusuf Danladi', initials: 'YD', dept: 'Logistics', role: 'Driver', salary: 180000, status: 'on-leave' as const },
  { id: 'EMP-006', name: 'Chioma Eze', initials: 'CE', dept: 'HR', role: 'HR Coordinator', salary: 420000, status: 'active' as const },
  { id: 'EMP-007', name: 'Tunde Bakare', initials: 'TB', dept: 'IT', role: 'Systems Admin', salary: 580000, status: 'active' as const },
];

const empBadge: Record<string, StatusVariant> = { active: 'green', 'on-leave': 'amber' };

const payroll = [
  { period: 'April 2024', employees: 7, gross: 3310000, net: 2782000, status: 'pending' as const, runDate: 'Apr 28' },
  { period: 'March 2024', employees: 7, gross: 3310000, net: 2782000, status: 'paid' as const, runDate: 'Mar 28' },
  { period: 'February 2024', employees: 6, gross: 2890000, net: 2425000, status: 'paid' as const, runDate: 'Feb 28' },
  { period: 'January 2024', employees: 6, gross: 2890000, net: 2425000, status: 'paid' as const, runDate: 'Jan 28' },
];

const payBadge: Record<string, StatusVariant> = { pending: 'amber', paid: 'green' };

const leaves = [
  { id: 'LV-024', employee: 'Yusuf Danladi', type: 'Annual', days: 5, from: 'Apr 22', to: 'Apr 26', status: 'approved' as const },
  { id: 'LV-023', employee: 'Fatima Bello', type: 'Sick', days: 2, from: 'Apr 30', to: 'May 01', status: 'pending' as const },
  { id: 'LV-022', employee: 'Adewale Okafor', type: 'Personal', days: 1, from: 'May 03', to: 'May 03', status: 'pending' as const },
  { id: 'LV-021', employee: 'Ngozi Adebayo', type: 'Annual', days: 10, from: 'May 10', to: 'May 19', status: 'approved' as const },
  { id: 'LV-020', employee: 'Chioma Eze', type: 'Maternity', days: 90, from: 'Jun 01', to: 'Aug 30', status: 'approved' as const },
  { id: 'LV-019', employee: 'Musa Usman', type: 'Sick', days: 1, from: 'Apr 15', to: 'Apr 15', status: 'rejected' as const },
];

const leaveBadge: Record<string, StatusVariant> = { approved: 'green', pending: 'amber', rejected: 'coral' };

const logs = [
  { dot: 'amber' as const, text: 'Leave request submitted — Fatima Bello · 2 days sick leave', time: '10:00 AM' },
  { dot: 'green' as const, text: 'Leave approved — Ngozi Adebayo · 10 days annual', time: '9:30 AM' },
  { dot: 'blue' as const, text: 'New employee onboarded — Tunde Bakare · IT', time: 'Yesterday' },
  { dot: 'green' as const, text: 'Payroll processed — March 2024 · 7 employees', time: 'Mar 28' },
];

const avatarColors = [
  { bg: 'bg-[hsl(180,40%,90%)]', fg: 'text-[hsl(180,50%,25%)]' },
  { bg: 'bg-[hsl(210,60%,94%)]', fg: 'text-[hsl(210,70%,28%)]' },
  { bg: 'bg-[hsl(38,70%,90%)]', fg: 'text-[hsl(30,80%,22%)]' },
  { bg: 'bg-[hsl(95,45%,88%)]', fg: 'text-[hsl(100,65%,18%)]' },
];

export default function HRModule() {
  const [activeTab, setActiveTab] = useState('employees');
  const [leaveFilter, setLeaveFilter] = useState('all');

  const filteredLeaves = useMemo(
    () => leaveFilter === 'all' ? leaves : leaves.filter(l => l.status === leaveFilter),
    [leaveFilter]
  );

  return (
    <div className="max-w-5xl">
      <PageHeader
        title="HR Management"
        description="Employees, payroll, leave management, and people operations"
        actions={<Button size="sm" className="gap-1.5"><Plus className="w-4 h-4" />Add employee</Button>}
      />

      <TabNav tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />

      {activeTab === 'employees' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.2 }}>
          <div className="grid grid-cols-4 gap-2.5 mb-5">
            <StatCard value={employees.length} label="Total employees" />
            <StatCard value={employees.filter(e => e.status === 'active').length} label="Active" />
            <StatCard value={6} label="Departments" />
            <StatCard value={2} label="On leave today" />
          </div>
          <SectionLabel>Employee directory</SectionLabel>
          <div className="bg-card border border-border rounded-lg divide-y divide-border">
            {employees.map((e, i) => (
              <div key={e.id} className="flex items-center gap-3 px-4 py-3 hover:bg-secondary/30 transition-colors cursor-pointer">
                <UserAvatar initials={e.initials} bgClass={avatarColors[i % avatarColors.length].bg} fgClass={avatarColors[i % avatarColors.length].fg} />
                <div className="flex-1 min-w-0">
                  <div className="text-[13px] font-medium text-foreground">{e.name}</div>
                  <div className="text-[11px] text-muted-foreground">{e.id} · {e.role} · {e.dept}</div>
                </div>
                <span className="text-[11px] text-muted-foreground">₦{e.salary.toLocaleString()}/mo</span>
                <StatusBadge variant={empBadge[e.status]}>{e.status}</StatusBadge>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {activeTab === 'payroll' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.2 }}>
          <div className="grid grid-cols-4 gap-2.5 mb-5">
            <StatCard value="₦3.31M" label="April gross" />
            <StatCard value="₦2.78M" label="April net" />
            <StatCard value="₦528k" label="Tax + NHF" />
            <StatCard value={1} label="Pending runs" />
          </div>
          <SectionLabel>Payroll runs</SectionLabel>
          <div className="bg-card border border-border rounded-lg divide-y divide-border">
            {payroll.map(p => (
              <div key={p.period} className="flex items-center gap-3 px-4 py-3">
                <div className="flex-1 min-w-0">
                  <div className="text-[13px] font-medium text-foreground">{p.period}</div>
                  <div className="text-[11px] text-muted-foreground">{p.employees} employees · run {p.runDate}</div>
                </div>
                <div className="text-right">
                  <div className="text-[13px] font-medium text-foreground">₦{p.net.toLocaleString()}</div>
                  <div className="text-[10px] text-muted-foreground">net of ₦{p.gross.toLocaleString()}</div>
                </div>
                <StatusBadge variant={payBadge[p.status]}>{p.status}</StatusBadge>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {activeTab === 'leave' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.2 }}>
          <div className="grid grid-cols-4 gap-2.5 mb-5">
            <StatCard value={leaves.length} label="This quarter" />
            <StatCard value={leaves.filter(l => l.status === 'pending').length} label="Pending" />
            <StatCard value={leaves.filter(l => l.status === 'approved').length} label="Approved" />
            <StatCard value={2} label="On leave today" />
          </div>
          <FilterPills
            filters={[
              { key: 'all', label: 'All' },
              { key: 'pending', label: 'Pending' },
              { key: 'approved', label: 'Approved' },
              { key: 'rejected', label: 'Rejected' },
            ]}
            active={leaveFilter}
            onChange={setLeaveFilter}
          />
          <div className="bg-card border border-border rounded-lg divide-y divide-border">
            {filteredLeaves.map(l => (
              <div key={l.id} className="flex items-center gap-3 px-4 py-3">
                <div className="flex-1 min-w-0">
                  <div className="text-[13px] font-medium text-foreground">{l.employee}</div>
                  <div className="text-[11px] text-muted-foreground">{l.id} · {l.type} · {l.from} → {l.to}</div>
                </div>
                <span className="text-[11px] text-muted-foreground">{l.days} day{l.days > 1 ? 's' : ''}</span>
                <StatusBadge variant={leaveBadge[l.status]}>{l.status}</StatusBadge>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {activeTab === 'logs' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.2 }}>
          <SectionLabel>HR activity</SectionLabel>
          <div className="bg-card border border-border rounded-lg divide-y divide-border">
            {logs.map((l, i) => (
              <div key={i} className="flex items-start gap-3 px-4 py-3 text-[13px]">
                <LogDot color={l.dot} />
                <span className="flex-1 text-foreground leading-relaxed">{l.text}</span>
                <span className="text-[11px] text-muted-foreground whitespace-nowrap ml-2">{l.time}</span>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}
