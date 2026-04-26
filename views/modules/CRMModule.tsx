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
  { key: 'pipeline', label: 'Pipeline' },
  { key: 'leads', label: 'Leads' },
  { key: 'customers', label: 'Customers' },
  { key: 'logs', label: 'Activity' },
];

type DealStage = 'lead' | 'qualified' | 'proposal' | 'won' | 'lost';

const stages: { key: DealStage; label: string; tone: StatusVariant }[] = [
  { key: 'lead', label: 'Leads', tone: 'gray' },
  { key: 'qualified', label: 'Qualified', tone: 'blue' },
  { key: 'proposal', label: 'Proposal', tone: 'amber' },
  { key: 'won', label: 'Won', tone: 'green' },
];

const deals = [
  { id: 'D-042', client: 'GreenTech Holdings', value: 4500000, stage: 'lead' as DealStage, owner: 'Adewale O.' },
  { id: 'D-041', client: 'Bola Ventures', value: 1200000, stage: 'lead' as DealStage, owner: 'Fatima B.' },
  { id: 'D-040', client: 'Ojo & Sons Ltd', value: 2800000, stage: 'qualified' as DealStage, owner: 'Adewale O.' },
  { id: 'D-039', client: 'Ngozi Foods', value: 950000, stage: 'qualified' as DealStage, owner: 'Chioma E.' },
  { id: 'D-038', client: 'Tunde Logistics', value: 6200000, stage: 'proposal' as DealStage, owner: 'Adewale O.' },
  { id: 'D-037', client: 'BlueWave Tech', value: 3400000, stage: 'proposal' as DealStage, owner: 'Fatima B.' },
  { id: 'D-036', client: 'Apex Pharma', value: 8900000, stage: 'won' as DealStage, owner: 'Adewale O.' },
  { id: 'D-035', client: 'Sunrise Retail', value: 1800000, stage: 'won' as DealStage, owner: 'Chioma E.' },
];

const leads = [
  { name: 'Aliyu Garba', initials: 'AG', company: 'Garba & Co.', source: 'Website', status: 'new' as const, score: 82 },
  { name: 'Bisi Ade', initials: 'BA', company: 'Ade Trading', source: 'Referral', status: 'contacted' as const, score: 74 },
  { name: 'Chuka Ibe', initials: 'CI', company: 'Ibe Industries', source: 'Cold call', status: 'new' as const, score: 65 },
  { name: 'Damola Sani', initials: 'DS', company: 'Sani Holdings', source: 'Event', status: 'qualified' as const, score: 88 },
  { name: 'Esther Ojo', initials: 'EO', company: 'Ojo Foods', source: 'Website', status: 'contacted' as const, score: 71 },
];

const leadBadge: Record<string, StatusVariant> = { new: 'blue', contacted: 'amber', qualified: 'green' };

const customers = [
  { name: 'Apex Pharma', contact: 'A. Bello', value: 12400000, deals: 4, since: 'Jan 2023' },
  { name: 'Sunrise Retail', contact: 'F. Okafor', value: 5800000, deals: 3, since: 'Mar 2023' },
  { name: 'GreenTech Holdings', contact: 'M. Yusuf', value: 18900000, deals: 7, since: 'Aug 2022' },
  { name: 'Ojo & Sons Ltd', contact: 'C. Nnamdi', value: 4200000, deals: 2, since: 'Jun 2023' },
];

const logs = [
  { dot: 'green' as const, text: 'Deal D-036 won — Apex Pharma · ₦8.9M', time: '11:45 AM' },
  { dot: 'blue' as const, text: 'New lead added — Aliyu Garba (Website)', time: '10:30 AM' },
  { dot: 'amber' as const, text: 'Proposal sent — Tunde Logistics · ₦6.2M', time: '9:50 AM' },
  { dot: 'blue' as const, text: 'Discovery call logged — Damola Sani', time: 'Yesterday 4:00 PM' },
];

const avatarColors = [
  { bg: 'bg-[hsl(280,50%,93%)]', fg: 'text-[hsl(260,55%,30%)]' },
  { bg: 'bg-[hsl(210,60%,94%)]', fg: 'text-[hsl(210,70%,28%)]' },
];

export default function CRMModule() {
  const [activeTab, setActiveTab] = useState('pipeline');
  const [leadFilter, setLeadFilter] = useState('all');

  const filteredLeads = useMemo(
    () => leadFilter === 'all' ? leads : leads.filter(l => l.status === leadFilter),
    [leadFilter]
  );

  const totalPipeline = deals.filter(d => d.stage !== 'won').reduce((s, d) => s + d.value, 0);
  const totalWon = deals.filter(d => d.stage === 'won').reduce((s, d) => s + d.value, 0);

  return (
    <div className="max-w-6xl">
      <PageHeader
        title="CRM"
        description="Leads, deal pipeline, customers, and sales activity"
        actions={<Button size="sm" className="gap-1.5"><Plus className="w-4 h-4" />New deal</Button>}
      />

      <TabNav tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />

      {activeTab === 'pipeline' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.2 }}>
          <div className="grid grid-cols-4 gap-2.5 mb-5">
            <StatCard value={deals.length} label="Open deals" />
            <StatCard value={`₦${(totalPipeline / 1_000_000).toFixed(1)}M`} label="Pipeline value" />
            <StatCard value={`₦${(totalWon / 1_000_000).toFixed(1)}M`} label="Won this month" />
            <StatCard value="32%" label="Win rate" />
          </div>
          <SectionLabel>Sales pipeline</SectionLabel>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
            {stages.map(stage => {
              const stageDeals = deals.filter(d => d.stage === stage.key);
              const stageValue = stageDeals.reduce((s, d) => s + d.value, 0);
              return (
                <div key={stage.key} className="bg-card border border-border rounded-lg p-3">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[12px] font-medium text-foreground">{stage.label}</span>
                    <span className="text-[10px] text-muted-foreground">{stageDeals.length} · ₦{(stageValue / 1_000_000).toFixed(1)}M</span>
                  </div>
                  <div className="space-y-2">
                    {stageDeals.map(d => (
                      <motion.div
                        key={d.id}
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-secondary/40 rounded-md p-2.5 hover:bg-secondary transition-colors cursor-pointer"
                      >
                        <div className="text-[12px] font-medium text-foreground truncate">{d.client}</div>
                        <div className="text-[11px] text-foreground mt-0.5">₦{d.value.toLocaleString()}</div>
                        <div className="text-[10px] text-muted-foreground mt-1">{d.id} · {d.owner}</div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
      )}

      {activeTab === 'leads' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.2 }}>
          <div className="grid grid-cols-4 gap-2.5 mb-5">
            <StatCard value={leads.length} label="Total leads" />
            <StatCard value={leads.filter(l => l.status === 'new').length} label="New" />
            <StatCard value={leads.filter(l => l.status === 'qualified').length} label="Qualified" />
            <StatCard value={Math.round(leads.reduce((s, l) => s + l.score, 0) / leads.length)} label="Avg score" />
          </div>
          <FilterPills
            filters={[
              { key: 'all', label: 'All' },
              { key: 'new', label: 'New' },
              { key: 'contacted', label: 'Contacted' },
              { key: 'qualified', label: 'Qualified' },
            ]}
            active={leadFilter}
            onChange={setLeadFilter}
          />
          <div className="bg-card border border-border rounded-lg divide-y divide-border">
            {filteredLeads.map((l, i) => (
              <div key={l.name} className="flex items-center gap-3 px-4 py-3 hover:bg-secondary/30 transition-colors cursor-pointer">
                <UserAvatar initials={l.initials} bgClass={avatarColors[i % 2].bg} fgClass={avatarColors[i % 2].fg} />
                <div className="flex-1 min-w-0">
                  <div className="text-[13px] font-medium text-foreground">{l.name}</div>
                  <div className="text-[11px] text-muted-foreground">{l.company} · Source: {l.source}</div>
                </div>
                <span className="text-[11px] text-muted-foreground">Score {l.score}</span>
                <StatusBadge variant={leadBadge[l.status]}>{l.status}</StatusBadge>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {activeTab === 'customers' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.2 }}>
          <div className="grid grid-cols-4 gap-2.5 mb-5">
            <StatCard value={customers.length} label="Customers" />
            <StatCard value={customers.reduce((s, c) => s + c.deals, 0)} label="Total deals" />
            <StatCard value={`₦${(customers.reduce((s, c) => s + c.value, 0) / 1_000_000).toFixed(1)}M`} label="Lifetime value" />
            <StatCard value="92%" label="Retention" />
          </div>
          <SectionLabel>Customer accounts</SectionLabel>
          <div className="bg-card border border-border rounded-lg divide-y divide-border">
            {customers.map(c => (
              <div key={c.name} className="flex items-center gap-3 px-4 py-3 hover:bg-secondary/30 transition-colors cursor-pointer">
                <div className="flex-1 min-w-0">
                  <div className="text-[13px] font-medium text-foreground">{c.name}</div>
                  <div className="text-[11px] text-muted-foreground">Contact: {c.contact} · Customer since {c.since}</div>
                </div>
                <span className="text-[11px] text-muted-foreground">{c.deals} deals</span>
                <span className="text-[13px] font-medium text-foreground">₦{c.value.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {activeTab === 'logs' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.2 }}>
          <SectionLabel>Sales activity</SectionLabel>
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
