"use client";
import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { PageHeader } from '@/components/shared/PageHeader';
import { StatCard } from '@/components/shared/StatCard';
import { TabNav } from '@/components/shared/TabNav';
import { FilterPills } from '@/components/shared/FilterPills';
import { StatusBadge } from '@/components/shared/StatusBadge';
import { SectionLabel } from '@/components/shared/SectionLabel';
import { LogDot } from '@/components/shared/LogDot';
import { Button } from '@/components/ui/button';
import { Plus, TrendingUp, TrendingDown } from 'lucide-react';
import type { StatusVariant } from '@/types/modules';

const tabs = [
  { key: 'overview', label: 'Overview' },
  { key: 'invoices', label: 'Invoices' },
  { key: 'expenses', label: 'Expenses' },
  { key: 'reports', label: 'Reports' },
];

const monthlyData = [
  { month: 'Jan', income: 4.2, expense: 2.8 },
  { month: 'Feb', income: 5.1, expense: 3.2 },
  { month: 'Mar', income: 4.8, expense: 3.5 },
  { month: 'Apr', income: 6.4, expense: 3.8 },
];

const invoices = [
  { id: 'INV-2024-089', client: 'Greenfield Academy', amount: 450000, due: 'Apr 30', status: 'paid' as const, date: 'Apr 15' },
  { id: 'INV-2024-088', client: 'Apex Enterprises', amount: 1250000, due: 'Apr 28', status: 'paid' as const, date: 'Apr 12' },
  { id: 'INV-2024-087', client: 'Sunrise Hotels', amount: 680000, due: 'Apr 25', status: 'overdue' as const, date: 'Apr 05' },
  { id: 'INV-2024-086', client: 'MediCare Clinic', amount: 320000, due: 'May 02', status: 'pending' as const, date: 'Apr 18' },
  { id: 'INV-2024-085', client: 'Stellar Logistics', amount: 940000, due: 'May 05', status: 'pending' as const, date: 'Apr 20' },
];

const invBadge: Record<string, StatusVariant> = { paid: 'green', pending: 'amber', overdue: 'coral' };

const expenses = [
  { id: 'EXP-0241', category: 'Salaries', vendor: 'Payroll', amount: 2400000, date: 'Apr 25' },
  { id: 'EXP-0240', category: 'Utilities', vendor: 'IKEDC', amount: 184000, date: 'Apr 24' },
  { id: 'EXP-0239', category: 'Supplies', vendor: 'Julius Berger', amount: 540000, date: 'Apr 22' },
  { id: 'EXP-0238', category: 'Rent', vendor: 'Landlord', amount: 850000, date: 'Apr 20' },
  { id: 'EXP-0237', category: 'Fuel', vendor: 'Total NG', amount: 215000, date: 'Apr 18' },
  { id: 'EXP-0236', category: 'Marketing', vendor: 'Adverts Co.', amount: 320000, date: 'Apr 15' },
];

const logs = [
  { dot: 'green' as const, text: 'Invoice INV-2024-088 paid — ₦1,250,000 from Apex Enterprises', time: '11:00 AM' },
  { dot: 'coral' as const, text: 'Invoice INV-2024-087 overdue — Sunrise Hotels (5 days)', time: '9:30 AM' },
  { dot: 'blue' as const, text: 'New expense logged — ₦184,000 utilities (IKEDC)', time: '9:00 AM' },
  { dot: 'green' as const, text: 'Monthly P&L generated — April report ready', time: 'Yesterday 5:00 PM' },
];

const totalIncome = monthlyData.reduce((s, m) => s + m.income, 0);
const totalExpense = monthlyData.reduce((s, m) => s + m.expense, 0);
const profit = totalIncome - totalExpense;
const maxBar = Math.max(...monthlyData.flatMap(m => [m.income, m.expense]));

export default function FinanceModule() {
  const [activeTab, setActiveTab] = useState('overview');
  const [invFilter, setInvFilter] = useState('all');

  const filteredInv = useMemo(
    () => invFilter === 'all' ? invoices : invoices.filter(i => i.status === invFilter),
    [invFilter]
  );

  return (
    <div className="max-w-5xl">
      <PageHeader
        title="Finance Management"
        description="Income, expenses, invoicing, and financial reporting"
        actions={<Button size="sm" className="gap-1.5"><Plus className="w-4 h-4" />New invoice</Button>}
      />

      <TabNav tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />

      {activeTab === 'overview' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.2 }}>
          <div className="grid grid-cols-4 gap-2.5 mb-5">
            <StatCard value={`₦${totalIncome.toFixed(1)}M`} label="Income (YTD)" icon={<TrendingUp className="w-4 h-4 text-dot-green" />} />
            <StatCard value={`₦${totalExpense.toFixed(1)}M`} label="Expenses (YTD)" icon={<TrendingDown className="w-4 h-4 text-dot-coral" />} />
            <StatCard value={`₦${profit.toFixed(1)}M`} label="Net profit" />
            <StatCard value={`${Math.round((profit / totalIncome) * 100)}%`} label="Margin" />
          </div>

          <SectionLabel>Monthly cashflow</SectionLabel>
          <div className="bg-card border border-border rounded-lg p-5 mb-5">
            <div className="flex items-end justify-between gap-6 h-48">
              {monthlyData.map(m => (
                <div key={m.month} className="flex-1 flex flex-col items-center gap-1.5">
                  <div className="w-full flex items-end justify-center gap-1 flex-1">
                    <div
                      className="w-1/3 bg-dot-green rounded-t-sm transition-all"
                      style={{ height: `${(m.income / maxBar) * 100}%` }}
                      title={`Income: ₦${m.income}M`}
                    />
                    <div
                      className="w-1/3 bg-dot-coral rounded-t-sm transition-all"
                      style={{ height: `${(m.expense / maxBar) * 100}%` }}
                      title={`Expense: ₦${m.expense}M`}
                    />
                  </div>
                  <span className="text-[11px] text-muted-foreground">{m.month}</span>
                </div>
              ))}
            </div>
            <div className="flex items-center gap-4 mt-3 text-[11px] text-muted-foreground">
              <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-dot-green" /> Income</span>
              <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-dot-coral" /> Expenses</span>
            </div>
          </div>

          <SectionLabel>Recent activity</SectionLabel>
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

      {activeTab === 'invoices' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.2 }}>
          <div className="grid grid-cols-4 gap-2.5 mb-5">
            <StatCard value={invoices.length} label="Total invoices" />
            <StatCard value={invoices.filter(i => i.status === 'paid').length} label="Paid" />
            <StatCard value={invoices.filter(i => i.status === 'pending').length} label="Pending" />
            <StatCard value={invoices.filter(i => i.status === 'overdue').length} label="Overdue" />
          </div>
          <FilterPills
            filters={[
              { key: 'all', label: 'All' },
              { key: 'paid', label: 'Paid' },
              { key: 'pending', label: 'Pending' },
              { key: 'overdue', label: 'Overdue' },
            ]}
            active={invFilter}
            onChange={setInvFilter}
          />
          <div className="bg-card border border-border rounded-lg divide-y divide-border">
            {filteredInv.map(i => (
              <div key={i.id} className="flex items-center gap-3 px-4 py-3 hover:bg-secondary/30 transition-colors cursor-pointer">
                <div className="flex-1 min-w-0">
                  <div className="text-[13px] font-medium text-foreground">{i.client}</div>
                  <div className="text-[11px] text-muted-foreground">{i.id} · Issued {i.date} · Due {i.due}</div>
                </div>
                <span className="text-[13px] font-medium text-foreground">₦{i.amount.toLocaleString()}</span>
                <StatusBadge variant={invBadge[i.status]}>{i.status}</StatusBadge>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {activeTab === 'expenses' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.2 }}>
          <div className="grid grid-cols-4 gap-2.5 mb-5">
            <StatCard value={expenses.length} label="Logged this month" />
            <StatCard value={`₦${(expenses.reduce((s, e) => s + e.amount, 0) / 1_000_000).toFixed(1)}M`} label="Total" />
            <StatCard value={6} label="Categories" />
            <StatCard value={4} label="Pending approval" />
          </div>
          <SectionLabel>Expense ledger</SectionLabel>
          <div className="bg-card border border-border rounded-lg divide-y divide-border">
            {expenses.map(e => (
              <div key={e.id} className="flex items-center gap-3 px-4 py-3">
                <div className="flex-1 min-w-0">
                  <div className="text-[13px] font-medium text-foreground">{e.category}</div>
                  <div className="text-[11px] text-muted-foreground">{e.id} · {e.vendor} · {e.date}</div>
                </div>
                <span className="text-[13px] font-medium text-foreground">₦{e.amount.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {activeTab === 'reports' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.2 }}>
          <SectionLabel>Generated reports</SectionLabel>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
            {[
              { name: 'Profit & Loss — April 2024', date: 'Apr 25', size: '184 KB' },
              { name: 'Cashflow Statement — Q1 2024', date: 'Apr 03', size: '256 KB' },
              { name: 'Balance Sheet — March 2024', date: 'Apr 02', size: '212 KB' },
              { name: 'Tax Summary — Q1 2024', date: 'Apr 01', size: '92 KB' },
            ].map((r, i) => (
              <motion.div
                key={r.name}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.03 }}
                className="bg-card border border-border rounded-lg p-4 hover:shadow-sm transition-shadow cursor-pointer"
              >
                <div className="text-[13px] font-medium text-foreground mb-1">{r.name}</div>
                <div className="text-[11px] text-muted-foreground">Generated {r.date} · {r.size}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}
