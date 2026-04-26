"use client";
import { motion } from 'framer-motion';
import { PageHeader } from '@/components/shared/PageHeader';
import { StatCard } from '@/components/shared/StatCard';
import { SectionLabel } from '@/components/shared/SectionLabel';
import { Button } from '@/components/ui/button';
import { FileBarChart, Download } from 'lucide-react';

const reports = [
  { name: 'Weekly Operations Summary', desc: 'KPIs across all active modules · Apr 22 — Apr 28', tone: 'blue', updated: '2 hours ago' },
  { name: 'Driver Performance Report', desc: 'On-time rate, distance, incidents per driver', tone: 'green', updated: 'Today' },
  { name: 'Stock Movement Analysis', desc: 'Top moving SKUs, dead stock, reorder forecast', tone: 'amber', updated: 'Yesterday' },
  { name: 'Customer Satisfaction Index', desc: 'Survey responses + ratings rollup', tone: 'coral', updated: '2 days ago' },
  { name: 'Cost Variance Report', desc: 'Budget vs actual across departments', tone: 'blue', updated: '3 days ago' },
  { name: 'Workforce Productivity', desc: 'Hours logged, tasks completed per employee', tone: 'green', updated: 'Apr 21' },
];

const trend = [40, 55, 48, 70, 62, 78, 84];

export default function ManagerReports() {
  return (
    <div className="max-w-4xl">
      <PageHeader
        title="Reports"
        description="Operational analytics and performance insights"
        actions={<Button size="sm" variant="outline" className="gap-1.5"><Download className="w-4 h-4" /> Export all</Button>}
      />

      <div className="grid grid-cols-4 gap-2.5 mb-5">
        <StatCard label="Reports available" value={reports.length} icon={<FileBarChart className="w-4 h-4" />} />
        <StatCard label="Generated today" value={2} />
        <StatCard label="Scheduled" value={4} />
        <StatCard label="KPI score" value="86" />
      </div>

      <SectionLabel>Performance trend (7 days)</SectionLabel>
      <div className="bg-card border border-border rounded-lg p-5 mb-5">
        <div className="flex items-end gap-2 h-32">
          {trend.map((v, i) => (
            <motion.div
              key={i}
              initial={{ height: 0 }}
              animate={{ height: `${v}%` }}
              transition={{ delay: i * 0.05 }}
              className="flex-1 bg-primary/70 rounded-t-sm"
              style={{ height: `${v}%` }}
            />
          ))}
        </div>
        <div className="flex justify-between text-[11px] text-muted-foreground mt-2">
          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(d => <span key={d}>{d}</span>)}
        </div>
      </div>

      <SectionLabel>Available reports</SectionLabel>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
        {reports.map((r, i) => (
          <motion.div
            key={r.name}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.04 }}
            className="bg-card border border-border rounded-lg p-4 hover:shadow-sm transition-shadow cursor-pointer"
          >
            <div className="flex items-start justify-between mb-2">
              <FileBarChart className="w-5 h-5 text-primary" />
              <span className="text-[10px] text-muted-foreground">{r.updated}</span>
            </div>
            <div className="text-[13px] font-medium text-foreground">{r.name}</div>
            <div className="text-[11px] text-muted-foreground mt-0.5">{r.desc}</div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
