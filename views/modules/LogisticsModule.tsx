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
  { key: 'shipments', label: 'Shipments' },
  { key: 'drivers', label: 'Drivers' },
  { key: 'routes', label: 'Route logs' },
];

const shipments = [
  { id: '#0043', origin: 'Minna', dest: 'Abuja', driver: 'Musa Usman', status: 'in-transit' as const, progress: 60, eta: '2:30 PM', weight: '340kg' },
  { id: '#0042', origin: 'Lagos', dest: 'Port Harcourt', driver: 'Ade Okonkwo', status: 'delivered' as const, progress: 100, eta: 'Delivered 10:15 AM', weight: '210kg' },
  { id: '#0041', origin: 'Minna', dest: 'Bida', driver: 'Yusuf Danladi', status: 'delivered' as const, progress: 100, eta: 'Delivered 8:40 AM', weight: '80kg' },
  { id: '#0040', origin: 'Abuja', dest: 'Kaduna', driver: 'Ibrahim Bello', status: 'in-transit' as const, progress: 35, eta: '4:00 PM', weight: '500kg' },
  { id: '#0039', origin: 'Lagos', dest: 'Ibadan', driver: 'Chukwu Uche', status: 'delayed' as const, progress: 45, eta: 'Delayed — 5:30 PM', weight: '170kg' },
  { id: '#0038', origin: 'Kano', dest: 'Zaria', driver: 'Fatima Kolo', status: 'in-transit' as const, progress: 80, eta: '1:00 PM', weight: '295kg' },
  { id: '#0037', origin: 'Abuja', dest: 'Lokoja', driver: 'Musa Usman', status: 'delivered' as const, progress: 100, eta: 'Delivered yesterday', weight: '120kg' },
  { id: '#0036', origin: 'Lagos', dest: 'Benin City', driver: 'Ade Okonkwo', status: 'delayed' as const, progress: 20, eta: 'Delayed — tomorrow', weight: '640kg' },
];

const statusBadgeMap: Record<string, StatusVariant> = {
  'in-transit': 'blue',
  delivered: 'green',
  delayed: 'amber',
};

const statusLabel: Record<string, string> = {
  'in-transit': 'In transit',
  delivered: 'Delivered',
  delayed: 'Delayed',
};

const progressColors: Record<string, string> = {
  'in-transit': 'bg-dot-blue',
  delivered: 'bg-dot-green',
  delayed: 'bg-dot-amber',
};

const drivers = [
  { name: 'Musa Usman', initials: 'MU', vehicle: 'V-03', route: 'Kano → Abuja', status: 'On duty', badge: 'blue' as StatusVariant, bg: 'badge-blue', fg: '' },
  { name: 'Ade Okonkwo', initials: 'AO', vehicle: 'V-07', route: 'Lagos → Ibadan', status: 'On duty', badge: 'blue' as StatusVariant, bg: 'badge-green', fg: '' },
  { name: 'Ibrahim Bello', initials: 'IB', vehicle: 'V-01', route: 'Abuja local', status: 'On duty', badge: 'blue' as StatusVariant, bg: 'badge-green', fg: '' },
  { name: 'Chukwu Uche', initials: 'CU', vehicle: 'V-05', route: 'No active route', status: 'Available', badge: 'green' as StatusVariant, bg: 'badge-gray', fg: '' },
  { name: 'Fatima Kolo', initials: 'FK', vehicle: 'V-02', route: 'No active route', status: 'Available', badge: 'green' as StatusVariant, bg: 'badge-gray', fg: '' },
  { name: 'Yusuf Danladi', initials: 'YD', vehicle: 'V-06', route: 'Rest day', status: 'Off duty', badge: 'gray' as StatusVariant, bg: 'badge-coral', fg: '' },
];

const avatarColors = [
  { bg: 'bg-[hsl(210,60%,94%)]', fg: 'text-[hsl(210,70%,28%)]' },
  { bg: 'bg-[hsl(95,45%,88%)]', fg: 'text-[hsl(100,65%,18%)]' },
  { bg: 'bg-[hsl(95,45%,88%)]', fg: 'text-[hsl(100,65%,18%)]' },
  { bg: 'bg-[hsl(40,10%,92%)]', fg: 'text-[hsl(40,5%,30%)]' },
  { bg: 'bg-[hsl(40,10%,92%)]', fg: 'text-[hsl(40,5%,30%)]' },
  { bg: 'bg-[hsl(16,70%,94%)]', fg: 'text-[hsl(16,65%,28%)]' },
];

const routeLogs = [
  { dot: 'green' as const, text: 'Shipment #0042 delivered — Lagos to Port Harcourt · Driver: Ade Okonkwo', time: '10:15 AM' },
  { dot: 'blue' as const, text: 'Route R-19 started — Abuja to Kaduna · Driver: Ibrahim Bello · Est. 3h 20m', time: '9:50 AM' },
  { dot: 'blue' as const, text: 'Driver Musa Usman checked in at Lokoja checkpoint', time: '9:22 AM' },
  { dot: 'amber' as const, text: 'Shipment #0039 delayed — traffic reported on Ore road · ETA updated', time: '9:05 AM' },
  { dot: 'green' as const, text: 'Shipment #0041 delivered — Minna to Bida · Driver: Yusuf Danladi', time: '8:40 AM' },
  { dot: 'coral' as const, text: 'Vehicle V-07 maintenance flag raised — brake check required', time: '8:15 AM' },
  { dot: 'blue' as const, text: 'Route R-18 completed — Kano to Kaduna · 5h 10m total', time: 'Yesterday 6:30 PM' },
  { dot: 'amber' as const, text: 'Fuel top-up logged — Vehicle V-03 · 45L · ₦31,500', time: 'Yesterday 4:00 PM' },
];

export default function LogisticsModule() {
  const [activeTab, setActiveTab] = useState('shipments');
  const [shipmentFilter, setShipmentFilter] = useState('all');

  const filteredShipments = useMemo(() => {
    if (shipmentFilter === 'all') return shipments;
    return shipments.filter(s => s.status === shipmentFilter);
  }, [shipmentFilter]);

  const totalShipments = shipments.length;
  const inTransit = shipments.filter(s => s.status === 'in-transit').length;
  const delivered = shipments.filter(s => s.status === 'delivered').length;
  const delayed = shipments.filter(s => s.status === 'delayed').length;

  return (
    <div className="max-w-4xl">
      <PageHeader
        title="Logistics Management"
        description="Shipments, drivers, vehicles, and route tracking"
        actions={<Button size="sm" className="gap-1.5"><Plus className="w-4 h-4" />New shipment</Button>}
      />

      <TabNav tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Shipments Tab */}
      {activeTab === 'shipments' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.2 }}>
          <div className="grid grid-cols-4 gap-2.5 mb-5">
            <StatCard value={totalShipments} label="Total shipments" />
            <StatCard value={inTransit} label="In transit" />
            <StatCard value={delivered} label="Delivered" />
            <StatCard value={delayed} label="Delayed" />
          </div>

          <FilterPills
            filters={[
              { key: 'all', label: 'All' },
              { key: 'in-transit', label: 'In transit' },
              { key: 'delivered', label: 'Delivered' },
              { key: 'delayed', label: 'Delayed' },
            ]}
            active={shipmentFilter}
            onChange={setShipmentFilter}
          />

          <div className="space-y-2.5">
            {filteredShipments.map((s, i) => (
              <motion.div
                key={s.id}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.03 }}
                className="bg-card border border-border rounded-lg p-4 hover:shadow-sm transition-shadow cursor-pointer"
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[13px] font-medium text-foreground">Shipment {s.id}</span>
                  <StatusBadge variant={statusBadgeMap[s.status]}>{statusLabel[s.status]}</StatusBadge>
                </div>
                <div className="flex gap-3.5 text-xs text-muted-foreground flex-wrap mb-3">
                  <span>From: {s.origin}</span>
                  <span>To: {s.dest}</span>
                  <span>Driver: {s.driver}</span>
                  <span>Weight: {s.weight}</span>
                </div>
                <div className="border-t border-border pt-2.5">
                  <div className="flex justify-between text-[11px] text-muted-foreground mb-1">
                    <span>{s.eta}</span>
                    <span>{s.progress}%</span>
                  </div>
                  <div className="h-1 bg-secondary rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all ${progressColors[s.status]}`}
                      style={{ width: `${s.progress}%` }}
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Drivers Tab */}
      {activeTab === 'drivers' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.2 }}>
          <div className="grid grid-cols-4 gap-2.5 mb-5">
            <StatCard value={drivers.length} label="Total drivers" />
            <StatCard value={3} label="On duty" />
            <StatCard value={2} label="Available" />
            <StatCard value={1} label="Off duty" />
          </div>
          <SectionLabel>Driver roster</SectionLabel>
          <div className="bg-card border border-border rounded-lg divide-y divide-border">
            {drivers.map((d, i) => (
              <div key={d.name} className="flex items-center gap-3 px-4 py-3 hover:bg-secondary/30 transition-colors cursor-pointer">
                <UserAvatar initials={d.initials} bgClass={avatarColors[i]?.bg} fgClass={avatarColors[i]?.fg} />
                <div className="flex-1 min-w-0">
                  <div className="text-[13px] font-medium text-foreground">{d.name}</div>
                  <div className="text-[11px] text-muted-foreground mt-0.5">Vehicle: {d.vehicle} · {d.route}</div>
                </div>
                <StatusBadge variant={d.badge}>{d.status}</StatusBadge>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Route Logs Tab */}
      {activeTab === 'routes' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.2 }}>
          <div className="grid grid-cols-4 gap-2.5 mb-5">
            <StatCard value={41} label="Routes logged" />
            <StatCard value={3} label="Active today" />
            <StatCard value={2} label="Incidents" />
            <StatCard value="98%" label="On-time rate" />
          </div>
          <SectionLabel>Recent log entries</SectionLabel>
          <div className="bg-card border border-border rounded-lg divide-y divide-border">
            {routeLogs.map((log, i) => (
              <div key={i} className="flex items-start gap-3 px-4 py-3 text-[13px]">
                <LogDot color={log.dot} />
                <span className="flex-1 text-foreground leading-relaxed">{log.text}</span>
                <span className="text-[11px] text-muted-foreground whitespace-nowrap ml-2">{log.time}</span>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}
