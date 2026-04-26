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
  { key: 'students', label: 'Students' },
  { key: 'classes', label: 'Classes' },
  { key: 'fees', label: 'Fees' },
  { key: 'attendance', label: 'Attendance' },
];

const students = [
  { id: 'STU-1042', name: 'Adaeze Okonkwo', initials: 'AO', class: 'JSS 3A', guardian: 'Mrs. Okonkwo', fees: 'paid', avg: 84 },
  { id: 'STU-1041', name: 'Bola Adekunle', initials: 'BA', class: 'SSS 1B', guardian: 'Mr. Adekunle', fees: 'partial', avg: 72 },
  { id: 'STU-1040', name: 'Chinedu Eze', initials: 'CE', class: 'JSS 2A', guardian: 'Mrs. Eze', fees: 'paid', avg: 91 },
  { id: 'STU-1039', name: 'Damilola Sani', initials: 'DS', class: 'SSS 2C', guardian: 'Mr. Sani', fees: 'unpaid', avg: 68 },
  { id: 'STU-1038', name: 'Ese Idowu', initials: 'EI', class: 'JSS 1B', guardian: 'Mrs. Idowu', fees: 'paid', avg: 79 },
  { id: 'STU-1037', name: 'Funke Aliyu', initials: 'FA', class: 'SSS 3A', guardian: 'Mr. Aliyu', fees: 'paid', avg: 88 },
];

const feesBadge: Record<string, StatusVariant> = { paid: 'green', partial: 'amber', unpaid: 'coral' };

const classes = [
  { name: 'JSS 1A', teacher: 'Mrs. Adamu', students: 28, room: 'B-12' },
  { name: 'JSS 1B', teacher: 'Mr. Bankole', students: 26, room: 'B-13' },
  { name: 'JSS 2A', teacher: 'Mrs. Chukwu', students: 30, room: 'B-21' },
  { name: 'JSS 3A', teacher: 'Mr. Danjuma', students: 27, room: 'B-31' },
  { name: 'SSS 1B', teacher: 'Mrs. Egbe', students: 25, room: 'C-11' },
  { name: 'SSS 2C', teacher: 'Mr. Falade', students: 24, room: 'C-23' },
  { name: 'SSS 3A', teacher: 'Mrs. Ghali', students: 22, room: 'C-31' },
];

const fees = [
  { id: 'FEE-2024-089', student: 'Adaeze Okonkwo', term: 'Term 2', amount: 85000, paid: 85000, date: 'Apr 22', status: 'paid' as const },
  { id: 'FEE-2024-088', student: 'Bola Adekunle', term: 'Term 2', amount: 95000, paid: 50000, date: 'Apr 18', status: 'partial' as const },
  { id: 'FEE-2024-087', student: 'Chinedu Eze', term: 'Term 2', amount: 75000, paid: 75000, date: 'Apr 15', status: 'paid' as const },
  { id: 'FEE-2024-086', student: 'Damilola Sani', term: 'Term 2', amount: 95000, paid: 0, date: '—', status: 'unpaid' as const },
  { id: 'FEE-2024-085', student: 'Ese Idowu', term: 'Term 2', amount: 65000, paid: 65000, date: 'Apr 10', status: 'paid' as const },
];

const attendance = [
  { class: 'JSS 1A', present: 26, total: 28, rate: 93 },
  { class: 'JSS 2A', present: 28, total: 30, rate: 93 },
  { class: 'JSS 3A', present: 25, total: 27, rate: 93 },
  { class: 'SSS 1B', present: 22, total: 25, rate: 88 },
  { class: 'SSS 2C', present: 21, total: 24, rate: 88 },
  { class: 'SSS 3A', present: 22, total: 22, rate: 100 },
];

const avatarColors = [
  { bg: 'bg-[hsl(38,70%,90%)]', fg: 'text-[hsl(30,80%,22%)]' },
  { bg: 'bg-[hsl(210,60%,94%)]', fg: 'text-[hsl(210,70%,28%)]' },
  { bg: 'bg-[hsl(95,45%,88%)]', fg: 'text-[hsl(100,65%,18%)]' },
  { bg: 'bg-[hsl(280,50%,93%)]', fg: 'text-[hsl(260,55%,30%)]' },
];

export default function SchoolModule() {
  const [activeTab, setActiveTab] = useState('students');
  const [feeFilter, setFeeFilter] = useState('all');

  const filteredFees = useMemo(
    () => feeFilter === 'all' ? fees : fees.filter(f => f.status === feeFilter),
    [feeFilter]
  );

  const totalCollected = fees.reduce((s, f) => s + f.paid, 0);
  const totalDue = fees.reduce((s, f) => s + f.amount, 0);

  return (
    <div className="max-w-5xl">
      <PageHeader
        title="School Management"
        description="Students, classes, fees, attendance, and academics"
        actions={<Button size="sm" className="gap-1.5"><Plus className="w-4 h-4" />New student</Button>}
      />

      <TabNav tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />

      {activeTab === 'students' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.2 }}>
          <div className="grid grid-cols-4 gap-2.5 mb-5">
            <StatCard value={184} label="Total students" />
            <StatCard value={7} label="Active classes" />
            <StatCard value="92%" label="Attendance" />
            <StatCard value={12} label="New this term" />
          </div>
          <SectionLabel>Student roster</SectionLabel>
          <div className="bg-card border border-border rounded-lg divide-y divide-border">
            {students.map((s, i) => (
              <div key={s.id} className="flex items-center gap-3 px-4 py-3 hover:bg-secondary/30 transition-colors cursor-pointer">
                <UserAvatar initials={s.initials} bgClass={avatarColors[i % avatarColors.length].bg} fgClass={avatarColors[i % avatarColors.length].fg} />
                <div className="flex-1 min-w-0">
                  <div className="text-[13px] font-medium text-foreground">{s.name}</div>
                  <div className="text-[11px] text-muted-foreground">{s.id} · {s.class} · Guardian: {s.guardian}</div>
                </div>
                <div className="text-[11px] text-muted-foreground">Avg {s.avg}%</div>
                <StatusBadge variant={feesBadge[s.fees]}>{s.fees}</StatusBadge>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {activeTab === 'classes' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.2 }}>
          <div className="grid grid-cols-4 gap-2.5 mb-5">
            <StatCard value={classes.length} label="Total classes" />
            <StatCard value={classes.reduce((s, c) => s + c.students, 0)} label="Enrolled" />
            <StatCard value={14} label="Teachers" />
            <StatCard value={9} label="Subjects" />
          </div>
          <SectionLabel>Class list</SectionLabel>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
            {classes.map((c, i) => (
              <motion.div
                key={c.name}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.03 }}
                className="bg-card border border-border rounded-lg p-4 hover:shadow-sm transition-shadow cursor-pointer"
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[13px] font-medium text-foreground">{c.name}</span>
                  <span className="text-[11px] text-muted-foreground">Room {c.room}</span>
                </div>
                <div className="text-[11px] text-muted-foreground">Form teacher: {c.teacher}</div>
                <div className="text-[11px] text-muted-foreground mt-1">{c.students} students</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {activeTab === 'fees' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.2 }}>
          <div className="grid grid-cols-4 gap-2.5 mb-5">
            <StatCard value={`₦${(totalCollected / 1000).toFixed(0)}k`} label="Collected" />
            <StatCard value={`₦${((totalDue - totalCollected) / 1000).toFixed(0)}k`} label="Outstanding" />
            <StatCard value={fees.filter(f => f.status === 'paid').length} label="Paid" />
            <StatCard value={fees.filter(f => f.status === 'unpaid').length} label="Unpaid" />
          </div>
          <FilterPills
            filters={[
              { key: 'all', label: 'All' },
              { key: 'paid', label: 'Paid' },
              { key: 'partial', label: 'Partial' },
              { key: 'unpaid', label: 'Unpaid' },
            ]}
            active={feeFilter}
            onChange={setFeeFilter}
          />
          <div className="bg-card border border-border rounded-lg divide-y divide-border">
            {filteredFees.map(f => (
              <div key={f.id} className="flex items-center gap-3 px-4 py-3">
                <div className="flex-1 min-w-0">
                  <div className="text-[13px] font-medium text-foreground">{f.student}</div>
                  <div className="text-[11px] text-muted-foreground">{f.id} · {f.term} · {f.date}</div>
                </div>
                <div className="text-right">
                  <div className="text-[13px] font-medium text-foreground">₦{f.paid.toLocaleString()} / ₦{f.amount.toLocaleString()}</div>
                </div>
                <StatusBadge variant={feesBadge[f.status]}>{f.status}</StatusBadge>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {activeTab === 'attendance' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.2 }}>
          <div className="grid grid-cols-4 gap-2.5 mb-5">
            <StatCard value="92%" label="Today's rate" />
            <StatCard value={144} label="Present" />
            <StatCard value={12} label="Absent" />
            <StatCard value={4} label="On leave" />
          </div>
          <SectionLabel>Today's attendance by class</SectionLabel>
          <div className="bg-card border border-border rounded-lg divide-y divide-border">
            {attendance.map(a => (
              <div key={a.class} className="px-4 py-3">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[13px] font-medium text-foreground">{a.class}</span>
                  <span className="text-[11px] text-muted-foreground">{a.present}/{a.total} present · {a.rate}%</span>
                </div>
                <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
                  <div className="h-full bg-dot-green rounded-full transition-all" style={{ width: `${a.rate}%` }} />
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}
