"use client";
import { motion } from 'framer-motion';
import { PageHeader } from '@/components/shared/PageHeader';
import { SectionLabel } from '@/components/shared/SectionLabel';
import { StatusBadge } from '@/components/shared/StatusBadge';
import { Bell, AlertCircle, Info, CheckCircle } from 'lucide-react';

const notifications = [
  { icon: CheckCircle, tone: 'green', text: 'Your request REQ-010 has been resolved.', time: '2 hours ago' },
  { icon: Info, tone: 'blue', text: 'Invoice INV-2024-088 is now available for download.', time: '5 hours ago' },
  { icon: AlertCircle, tone: 'amber', text: 'Reminder: Complete your profile to unlock more features.', time: 'Yesterday' },
  { icon: CheckCircle, tone: 'green', text: 'Payment of ₦128,000 received successfully.', time: '2 days ago' },
  { icon: Info, tone: 'blue', text: 'New service available: Express delivery (24h).', time: '3 days ago' },
] as const;

const records = [
  { id: 'REC-204', type: 'Invoice', desc: 'INV-2024-088 — Service charge April', date: 'Apr 22', amount: '₦128,000' },
  { id: 'REC-203', type: 'Receipt', desc: 'Payment receipt for INV-2024-085', date: 'Apr 18', amount: '₦65,000' },
  { id: 'REC-202', type: 'Contract', desc: 'Annual service agreement 2024', date: 'Jan 10', amount: '—' },
  { id: 'REC-201', type: 'Invoice', desc: 'INV-2024-072 — Q1 services', date: 'Mar 30', amount: '₦240,000' },
  { id: 'REC-200', type: 'Receipt', desc: 'Payment receipt for INV-2024-072', date: 'Apr 02', amount: '₦240,000' },
];

export function ClientNotifications() {
  return (
    <div className="max-w-3xl">
      <PageHeader title="Notifications" description="Updates and alerts about your account" />
      <div className="bg-card border border-border rounded-lg divide-y divide-border">
        {notifications.map((n, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -6 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.04 }}
            className="flex items-start gap-3 px-4 py-3"
          >
            <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 badge-${n.tone}`}>
              <n.icon className="w-4 h-4" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[13px] text-foreground">{n.text}</p>
              <p className="text-[11px] text-muted-foreground mt-0.5">{n.time}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export function ClientRecords() {
  return (
    <div className="max-w-3xl">
      <PageHeader title="My Records" description="Invoices, receipts, contracts and other documents" />
      <SectionLabel>Document history</SectionLabel>
      <div className="bg-card border border-border rounded-lg divide-y divide-border">
        {records.map(r => (
          <div key={r.id} className="flex items-center gap-3 px-4 py-3 hover:bg-secondary/30 transition-colors cursor-pointer">
            <div className="flex-1 min-w-0">
              <div className="text-[13px] font-medium text-foreground">{r.desc}</div>
              <div className="text-[11px] text-muted-foreground">{r.id} · {r.type} · {r.date}</div>
            </div>
            <span className="text-[13px] font-medium text-foreground">{r.amount}</span>
            <StatusBadge variant="blue">{r.type}</StatusBadge>
          </div>
        ))}
      </div>
    </div>
  );
}

export function ClientHelp() {
  return (
    <div className="max-w-3xl">
      <PageHeader title="Help & Support" description="Get answers and contact support" />
      <SectionLabel>Frequently asked</SectionLabel>
      <div className="bg-card border border-border rounded-lg divide-y divide-border mb-5">
        {[
          'How do I submit a new request?',
          'Where can I download my invoices?',
          'How do I update my contact details?',
          'What is the response time for support?',
          'How do I switch organisations?',
        ].map((q, i) => (
          <details key={i} className="px-4 py-3 group">
            <summary className="text-[13px] font-medium text-foreground cursor-pointer list-none flex items-center justify-between">
              {q}
              <span className="text-muted-foreground group-open:rotate-90 transition-transform">›</span>
            </summary>
            <p className="text-[12px] text-muted-foreground mt-2 leading-relaxed">
              Detailed answer goes here. The system shell handles routing of all requests, records, and notifications consistently across modules.
            </p>
          </details>
        ))}
      </div>

      <SectionLabel>Contact</SectionLabel>
      <div className="bg-card border border-border rounded-lg p-5">
        <p className="text-[13px] text-foreground mb-1">Need more help? Reach out:</p>
        <p className="text-[12px] text-muted-foreground">Email: support@keel.app</p>
        <p className="text-[12px] text-muted-foreground">Hours: Mon–Fri, 9am – 6pm WAT</p>
      </div>
    </div>
  );
}
