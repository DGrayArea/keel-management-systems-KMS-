"use client";
import { motion } from 'framer-motion';
import { PageHeader } from '@/components/shared/PageHeader';
import { StatCard } from '@/components/shared/StatCard';
import { SectionLabel } from '@/components/shared/SectionLabel';
import { StatusBadge } from '@/components/shared/StatusBadge';
import { LogDot } from '@/components/shared/LogDot';
import { Button } from '@/components/ui/button';
import { useAppContext } from '@/contexts/AppContext';
import { MapPin, Phone, Navigation, CheckCircle2, Clock, Package } from 'lucide-react';

const stops = [
  { id: 1, address: '14 Awolowo Rd, Ikoyi', recipient: 'Aisha Bello', phone: '+234 812 4421', items: 2, status: 'completed' as const, eta: '9:20 AM' },
  { id: 2, address: '45B Adeola Odeku, V/I', recipient: 'Tunde Akinola', phone: '+234 803 2100', items: 1, status: 'completed' as const, eta: '10:05 AM' },
  { id: 3, address: '7 Bourdillon Rd, Ikoyi', recipient: 'Fatima Okafor', phone: '+234 805 9928', items: 3, status: 'current' as const, eta: '11:15 AM' },
  { id: 4, address: '22 Lekki-Epe Expy', recipient: 'Chukwu Nnamdi', phone: '+234 818 7733', items: 1, status: 'pending' as const, eta: '12:30 PM' },
  { id: 5, address: '88 Admiralty Way, Lekki', recipient: 'Ngozi Adebayo', phone: '+234 808 4400', items: 2, status: 'pending' as const, eta: '1:45 PM' },
];

const stopBadge = { completed: 'green', current: 'blue', pending: 'gray' } as const;
const stopLabel = { completed: 'Done', current: 'In progress', pending: 'Pending' } as const;

export default function CourierDashboard() {
  const { currentOrg } = useAppContext();
  const completed = stops.filter(s => s.status === 'completed').length;
  const current = stops.find(s => s.status === 'current');

  return (
    <div className="max-w-4xl">
      <PageHeader
        title="Today's Run"
        description={`${currentOrg?.name} · Vehicle V-03 · Route R-19`}
        actions={
          <Button size="sm" variant="outline" className="gap-1.5">
            <Navigation className="w-4 h-4" /> Open in maps
          </Button>
        }
      />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 mb-5">
        <StatCard label="Total stops" value={stops.length} icon={<Package className="w-4 h-4" />} />
        <StatCard label="Completed" value={completed} icon={<CheckCircle2 className="w-4 h-4" />} />
        <StatCard label="Remaining" value={stops.length - completed} icon={<Clock className="w-4 h-4" />} />
        <StatCard label="On-time" value="94%" />
      </div>

      {current && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-primary/5 border border-primary/20 rounded-lg p-5 mb-5"
        >
          <div className="flex items-start justify-between mb-3">
            <div>
              <p className="text-[11px] uppercase tracking-wider text-primary font-medium mb-1">Current Stop</p>
              <h3 className="text-base font-semibold text-foreground">{current.recipient}</h3>
              <p className="text-[12px] text-muted-foreground flex items-center gap-1 mt-1">
                <MapPin className="w-3.5 h-3.5" /> {current.address}
              </p>
            </div>
            <StatusBadge variant="blue">ETA {current.eta}</StatusBadge>
          </div>
          <div className="flex gap-2">
            <Button size="sm" className="gap-1.5"><CheckCircle2 className="w-4 h-4" /> Mark delivered</Button>
            <Button size="sm" variant="outline" className="gap-1.5"><Phone className="w-4 h-4" /> Call recipient</Button>
            <Button size="sm" variant="outline">Report issue</Button>
          </div>
        </motion.div>
      )}

      <SectionLabel>Stop list</SectionLabel>
      <div className="bg-card border border-border rounded-lg divide-y divide-border">
        {stops.map((s, i) => (
          <motion.div
            key={s.id}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.04 }}
            className="flex items-center gap-3 px-4 py-3"
          >
            <div className={`w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-semibold flex-shrink-0 ${
              s.status === 'completed' ? 'badge-green' :
              s.status === 'current' ? 'badge-blue' : 'badge-gray'
            }`}>
              {s.id}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-[13px] font-medium text-foreground">{s.recipient}</div>
              <div className="text-[11px] text-muted-foreground truncate">{s.address} · {s.items} item{s.items > 1 ? 's' : ''}</div>
            </div>
            <span className="text-[11px] text-muted-foreground">{s.eta}</span>
            <StatusBadge variant={stopBadge[s.status]}>{stopLabel[s.status]}</StatusBadge>
          </motion.div>
        ))}
      </div>

      <SectionLabel className="mt-6">Recent activity</SectionLabel>
      <div className="bg-card border border-border rounded-lg divide-y divide-border">
        {[
          { dot: 'green' as const, text: 'Stop 2 completed — Tunde Akinola signed', time: '10:05 AM' },
          { dot: 'green' as const, text: 'Stop 1 completed — Aisha Bello signed', time: '9:20 AM' },
          { dot: 'blue' as const, text: 'Run started — 5 stops scheduled', time: '8:30 AM' },
          { dot: 'amber' as const, text: 'Fuel top-up logged — 45L · ₦31,500', time: '8:00 AM' },
        ].map((l, i) => (
          <div key={i} className="flex items-start gap-3 px-4 py-3 text-[13px]">
            <LogDot color={l.dot} />
            <span className="flex-1 text-foreground">{l.text}</span>
            <span className="text-[11px] text-muted-foreground whitespace-nowrap">{l.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
