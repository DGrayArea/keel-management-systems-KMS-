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
  { key: 'patients', label: 'Patients' },
  { key: 'appointments', label: 'Appointments' },
  { key: 'pharmacy', label: 'Pharmacy' },
  { key: 'logs', label: 'Activity' },
];

const patients = [
  { id: 'PT-1042', name: 'Aisha Ibrahim', initials: 'AI', age: 34, gender: 'F', condition: 'Hypertension', last: 'Apr 22', status: 'active' as const },
  { id: 'PT-1041', name: 'Bayo Williams', initials: 'BW', age: 51, gender: 'M', condition: 'Diabetes Type 2', last: 'Apr 20', status: 'active' as const },
  { id: 'PT-1040', name: 'Chioma Nwosu', initials: 'CN', age: 28, gender: 'F', condition: 'Antenatal', last: 'Apr 25', status: 'active' as const },
  { id: 'PT-1039', name: 'Daniel Okeke', initials: 'DO', age: 8, gender: 'M', condition: 'Asthma', last: 'Apr 18', status: 'active' as const },
  { id: 'PT-1038', name: 'Esther Bala', initials: 'EB', age: 67, gender: 'F', condition: 'Post-op recovery', last: 'Apr 15', status: 'discharged' as const },
];

const patientBadge: Record<string, StatusVariant> = { active: 'blue', discharged: 'green' };

const appointments = [
  { time: '09:00', patient: 'Aisha Ibrahim', doctor: 'Dr. Amina Bello', type: 'Follow-up', status: 'completed' as const },
  { time: '09:30', patient: 'Bayo Williams', doctor: 'Dr. Tunde Falade', type: 'Consultation', status: 'completed' as const },
  { time: '10:00', patient: 'Chioma Nwosu', doctor: 'Dr. Amina Bello', type: 'Antenatal', status: 'in-progress' as const },
  { time: '10:30', patient: 'Daniel Okeke', doctor: 'Dr. Yusuf Kano', type: 'Pediatrics', status: 'waiting' as const },
  { time: '11:00', patient: 'Femi Adesina', doctor: 'Dr. Tunde Falade', type: 'Consultation', status: 'scheduled' as const },
  { time: '11:30', patient: 'Grace Obi', doctor: 'Dr. Amina Bello', type: 'Follow-up', status: 'scheduled' as const },
  { time: '14:00', patient: 'Henry Adamu', doctor: 'Dr. Yusuf Kano', type: 'Surgery review', status: 'scheduled' as const },
];

const apptBadge: Record<string, StatusVariant> = {
  completed: 'green',
  'in-progress': 'blue',
  waiting: 'amber',
  scheduled: 'gray',
};

const apptLabel: Record<string, string> = {
  completed: 'Done',
  'in-progress': 'In progress',
  waiting: 'Waiting',
  scheduled: 'Scheduled',
};

const pharmacy = [
  { name: 'Paracetamol 500mg', stock: 1240, reorder: 200, price: 50, status: 'ok' as const },
  { name: 'Amoxicillin 500mg', stock: 84, reorder: 100, price: 120, status: 'low' as const },
  { name: 'Insulin Glargine', stock: 22, reorder: 20, price: 8500, status: 'ok' as const },
  { name: 'Salbutamol Inhaler', stock: 0, reorder: 15, price: 3500, status: 'out' as const },
  { name: 'Metformin 500mg', stock: 580, reorder: 150, price: 80, status: 'ok' as const },
  { name: 'Omeprazole 20mg', stock: 64, reorder: 80, price: 110, status: 'low' as const },
];

const pharmBadge: Record<string, StatusVariant> = { ok: 'green', low: 'amber', out: 'coral' };

const logs = [
  { dot: 'green' as const, text: 'Patient PT-1040 — antenatal check completed', time: '10:15 AM' },
  { dot: 'blue' as const, text: 'New patient registered — PT-1043 · Joseph Edet', time: '9:50 AM' },
  { dot: 'coral' as const, text: 'Pharmacy alert — Salbutamol Inhaler out of stock', time: '9:30 AM' },
  { dot: 'amber' as const, text: 'Lab result pending — Patient PT-1041 · HbA1c', time: '9:00 AM' },
  { dot: 'green' as const, text: 'Discharge processed — PT-1038 · Esther Bala', time: 'Yesterday 4:00 PM' },
];

const avatarColors = [
  { bg: 'bg-[hsl(340,55%,93%)]', fg: 'text-[hsl(340,55%,28%)]' },
  { bg: 'bg-[hsl(210,60%,94%)]', fg: 'text-[hsl(210,70%,28%)]' },
];

export default function HospitalModule() {
  const [activeTab, setActiveTab] = useState('patients');
  const [pharmFilter, setPharmFilter] = useState('all');

  const filteredPharm = useMemo(
    () => pharmFilter === 'all' ? pharmacy : pharmacy.filter(p => p.status === pharmFilter),
    [pharmFilter]
  );

  return (
    <div className="max-w-5xl">
      <PageHeader
        title="Hospital Management"
        description="Patients, appointments, pharmacy, and clinical operations"
        actions={<Button size="sm" className="gap-1.5"><Plus className="w-4 h-4" />New patient</Button>}
      />

      <TabNav tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />

      {activeTab === 'patients' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.2 }}>
          <div className="grid grid-cols-4 gap-2.5 mb-5">
            <StatCard value={342} label="Active patients" />
            <StatCard value={28} label="Admitted" />
            <StatCard value={12} label="New today" />
            <StatCard value={6} label="Discharged today" />
          </div>
          <SectionLabel>Patient registry</SectionLabel>
          <div className="bg-card border border-border rounded-lg divide-y divide-border">
            {patients.map((p, i) => (
              <div key={p.id} className="flex items-center gap-3 px-4 py-3 hover:bg-secondary/30 transition-colors cursor-pointer">
                <UserAvatar initials={p.initials} bgClass={avatarColors[i % 2].bg} fgClass={avatarColors[i % 2].fg} />
                <div className="flex-1 min-w-0">
                  <div className="text-[13px] font-medium text-foreground">{p.name}</div>
                  <div className="text-[11px] text-muted-foreground">{p.id} · {p.age}{p.gender} · {p.condition}</div>
                </div>
                <span className="text-[11px] text-muted-foreground">Last visit: {p.last}</span>
                <StatusBadge variant={patientBadge[p.status]}>{p.status}</StatusBadge>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {activeTab === 'appointments' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.2 }}>
          <div className="grid grid-cols-4 gap-2.5 mb-5">
            <StatCard value={appointments.length} label="Today" />
            <StatCard value={appointments.filter(a => a.status === 'completed').length} label="Completed" />
            <StatCard value={appointments.filter(a => a.status === 'waiting').length} label="Waiting" />
            <StatCard value={appointments.filter(a => a.status === 'scheduled').length} label="Upcoming" />
          </div>
          <SectionLabel>Today's schedule</SectionLabel>
          <div className="bg-card border border-border rounded-lg divide-y divide-border">
            {appointments.map((a, i) => (
              <div key={i} className="flex items-center gap-4 px-4 py-3">
                <div className="text-[13px] font-medium text-foreground w-14">{a.time}</div>
                <div className="flex-1 min-w-0">
                  <div className="text-[13px] font-medium text-foreground">{a.patient}</div>
                  <div className="text-[11px] text-muted-foreground">{a.doctor} · {a.type}</div>
                </div>
                <StatusBadge variant={apptBadge[a.status]}>{apptLabel[a.status]}</StatusBadge>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {activeTab === 'pharmacy' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.2 }}>
          <div className="grid grid-cols-4 gap-2.5 mb-5">
            <StatCard value={pharmacy.length} label="Drug SKUs" />
            <StatCard value={pharmacy.filter(p => p.status === 'low').length} label="Low stock" />
            <StatCard value={pharmacy.filter(p => p.status === 'out').length} label="Out of stock" />
            <StatCard value={42} label="Dispensed today" />
          </div>
          <FilterPills
            filters={[
              { key: 'all', label: 'All' },
              { key: 'ok', label: 'OK' },
              { key: 'low', label: 'Low' },
              { key: 'out', label: 'Out' },
            ]}
            active={pharmFilter}
            onChange={setPharmFilter}
          />
          <div className="bg-card border border-border rounded-lg divide-y divide-border">
            {filteredPharm.map(p => (
              <div key={p.name} className="flex items-center gap-3 px-4 py-3">
                <div className="flex-1 min-w-0">
                  <div className="text-[13px] font-medium text-foreground">{p.name}</div>
                  <div className="text-[11px] text-muted-foreground">₦{p.price.toLocaleString()} · reorder ≤ {p.reorder}</div>
                </div>
                <span className="text-[13px] font-medium text-foreground">{p.stock}</span>
                <StatusBadge variant={pharmBadge[p.status]}>{p.status}</StatusBadge>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {activeTab === 'logs' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.2 }}>
          <SectionLabel>Clinical activity</SectionLabel>
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
