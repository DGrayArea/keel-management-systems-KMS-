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
import { Plus, Calendar, MapPin } from 'lucide-react';
import type { StatusVariant } from '@/types/modules';

const tabs = [
  { key: 'events', label: 'Events' },
  { key: 'venues', label: 'Venues' },
  { key: 'tickets', label: 'Tickets' },
  { key: 'logs', label: 'Activity' },
];

const events = [
  { id: 'EV-042', name: 'Lagos Tech Summit 2024', venue: 'Eko Hotel', date: 'May 14', capacity: 500, sold: 412, status: 'upcoming' as const },
  { id: 'EV-041', name: 'Annual Hospitality Awards', venue: 'Sunrise Ballroom', date: 'May 22', capacity: 300, sold: 287, status: 'upcoming' as const },
  { id: 'EV-040', name: 'Wedding — Bello/Adekunle', venue: 'Garden Pavilion', date: 'May 04', capacity: 200, sold: 180, status: 'upcoming' as const },
  { id: 'EV-039', name: 'Corporate Retreat — Apex', venue: 'Sunrise Conference', date: 'Apr 18', capacity: 80, sold: 80, status: 'completed' as const },
  { id: 'EV-038', name: 'Music Night Live', venue: 'Garden Pavilion', date: 'Apr 12', capacity: 250, sold: 248, status: 'completed' as const },
];

const eventBadge: Record<string, StatusVariant> = { upcoming: 'blue', completed: 'green', cancelled: 'coral' };

const venues = [
  { name: 'Eko Hotel', capacity: 500, location: 'Victoria Island', bookings: 12, rate: 850000 },
  { name: 'Sunrise Ballroom', capacity: 300, location: 'Ikeja', bookings: 18, rate: 520000 },
  { name: 'Garden Pavilion', capacity: 250, location: 'Lekki Phase 1', bookings: 22, rate: 380000 },
  { name: 'Sunrise Conference', capacity: 100, location: 'Ikeja', bookings: 14, rate: 220000 },
];

const tickets = [
  { id: 'TKT-2401', event: 'Lagos Tech Summit 2024', buyer: 'Aliyu Garba', tier: 'VIP', price: 75000, date: 'Apr 24', status: 'paid' as const },
  { id: 'TKT-2400', event: 'Lagos Tech Summit 2024', buyer: 'Bisi Ade', tier: 'Standard', price: 25000, date: 'Apr 24', status: 'paid' as const },
  { id: 'TKT-2399', event: 'Annual Hospitality Awards', buyer: 'Chuka Ibe', tier: 'Table (10)', price: 450000, date: 'Apr 23', status: 'paid' as const },
  { id: 'TKT-2398', event: 'Music Night Live', buyer: 'Damola Sani', tier: 'Standard', price: 8000, date: 'Apr 12', status: 'used' as const },
  { id: 'TKT-2397', event: 'Lagos Tech Summit 2024', buyer: 'Esther Ojo', tier: 'Standard', price: 25000, date: 'Apr 22', status: 'pending' as const },
];

const ticketBadge: Record<string, StatusVariant> = { paid: 'green', pending: 'amber', used: 'gray' };

const logs = [
  { dot: 'green' as const, text: 'Ticket TKT-2401 sold — Lagos Tech Summit · VIP · ₦75,000', time: '10:30 AM' },
  { dot: 'blue' as const, text: 'New event created — Lagos Tech Summit 2024', time: '9:00 AM' },
  { dot: 'amber' as const, text: 'Capacity alert — Hospitality Awards 96% sold', time: '8:30 AM' },
  { dot: 'green' as const, text: 'Event completed — Music Night Live · 248 attendees', time: 'Apr 12' },
];

export default function EventsModule() {
  const [activeTab, setActiveTab] = useState('events');
  const [eventFilter, setEventFilter] = useState('all');

  const filteredEvents = useMemo(
    () => eventFilter === 'all' ? events : events.filter(e => e.status === eventFilter),
    [eventFilter]
  );

  return (
    <div className="max-w-5xl">
      <PageHeader
        title="Events Management"
        description="Events, venues, ticketing, and attendee tracking"
        actions={<Button size="sm" className="gap-1.5"><Plus className="w-4 h-4" />New event</Button>}
      />

      <TabNav tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />

      {activeTab === 'events' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.2 }}>
          <div className="grid grid-cols-4 gap-2.5 mb-5">
            <StatCard value={events.length} label="Total events" />
            <StatCard value={events.filter(e => e.status === 'upcoming').length} label="Upcoming" />
            <StatCard value={events.reduce((s, e) => s + e.sold, 0)} label="Tickets sold" />
            <StatCard value="86%" label="Avg fill rate" />
          </div>
          <FilterPills
            filters={[
              { key: 'all', label: 'All' },
              { key: 'upcoming', label: 'Upcoming' },
              { key: 'completed', label: 'Completed' },
            ]}
            active={eventFilter}
            onChange={setEventFilter}
          />
          <div className="space-y-2.5">
            {filteredEvents.map((e, i) => {
              const fill = Math.round((e.sold / e.capacity) * 100);
              return (
                <motion.div
                  key={e.id}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.03 }}
                  className="bg-card border border-border rounded-lg p-4 hover:shadow-sm transition-shadow cursor-pointer"
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[13px] font-medium text-foreground">{e.name}</span>
                    <StatusBadge variant={eventBadge[e.status]}>{e.status}</StatusBadge>
                  </div>
                  <div className="flex gap-3.5 text-xs text-muted-foreground flex-wrap mb-3">
                    <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{e.date}</span>
                    <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{e.venue}</span>
                    <span>{e.id}</span>
                  </div>
                  <div className="border-t border-border pt-2.5">
                    <div className="flex justify-between text-[11px] text-muted-foreground mb-1">
                      <span>{e.sold} / {e.capacity} sold</span>
                      <span>{fill}%</span>
                    </div>
                    <div className="h-1 bg-secondary rounded-full overflow-hidden">
                      <div className="h-full bg-dot-blue rounded-full transition-all" style={{ width: `${fill}%` }} />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      )}

      {activeTab === 'venues' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.2 }}>
          <div className="grid grid-cols-4 gap-2.5 mb-5">
            <StatCard value={venues.length} label="Venues" />
            <StatCard value={venues.reduce((s, v) => s + v.bookings, 0)} label="Total bookings" />
            <StatCard value={1150} label="Total capacity" />
            <StatCard value="78%" label="Utilization" />
          </div>
          <SectionLabel>Available venues</SectionLabel>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
            {venues.map((v, i) => (
              <motion.div
                key={v.name}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.03 }}
                className="bg-card border border-border rounded-lg p-4 cursor-pointer hover:shadow-sm transition-shadow"
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[13px] font-medium text-foreground">{v.name}</span>
                  <span className="text-[11px] text-muted-foreground">Cap. {v.capacity}</span>
                </div>
                <div className="text-[11px] text-muted-foreground flex items-center gap-1"><MapPin className="w-3 h-3" />{v.location}</div>
                <div className="text-[11px] text-muted-foreground mt-1">{v.bookings} bookings · ₦{v.rate.toLocaleString()}/event</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {activeTab === 'tickets' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.2 }}>
          <div className="grid grid-cols-4 gap-2.5 mb-5">
            <StatCard value={tickets.length} label="Recent sales" />
            <StatCard value={tickets.filter(t => t.status === 'paid').length} label="Paid" />
            <StatCard value={tickets.filter(t => t.status === 'used').length} label="Used" />
            <StatCard value={`₦${(tickets.reduce((s, t) => s + t.price, 0) / 1000).toFixed(0)}k`} label="Revenue" />
          </div>
          <SectionLabel>Recent ticket sales</SectionLabel>
          <div className="bg-card border border-border rounded-lg divide-y divide-border">
            {tickets.map(t => (
              <div key={t.id} className="flex items-center gap-3 px-4 py-3">
                <div className="flex-1 min-w-0">
                  <div className="text-[13px] font-medium text-foreground">{t.buyer}</div>
                  <div className="text-[11px] text-muted-foreground">{t.id} · {t.event} · {t.tier}</div>
                </div>
                <span className="text-[11px] text-muted-foreground">{t.date}</span>
                <span className="text-[13px] font-medium text-foreground">₦{t.price.toLocaleString()}</span>
                <StatusBadge variant={ticketBadge[t.status]}>{t.status}</StatusBadge>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {activeTab === 'logs' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.2 }}>
          <SectionLabel>Events activity</SectionLabel>
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
