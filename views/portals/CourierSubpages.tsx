"use client";
import { motion } from 'framer-motion';
import { PageHeader } from '@/components/shared/PageHeader';
import { StatCard } from '@/components/shared/StatCard';
import { SectionLabel } from '@/components/shared/SectionLabel';
import { LogDot } from '@/components/shared/LogDot';
import { Map, History, User as UserIcon } from 'lucide-react';

export function CourierRoute() {
  return (
    <div className="max-w-4xl">
      <PageHeader title="Route Map" description="Today's planned route and live position" />
      <div className="grid grid-cols-3 gap-2.5 mb-5">
        <StatCard label="Distance" value="42 km" />
        <StatCard label="Duration" value="3h 20m" />
        <StatCard label="Stops left" value={3} />
      </div>
      <div className="bg-card border border-border rounded-lg p-12 text-center">
        <Map className="w-12 h-12 mx-auto mb-3 text-muted-foreground" />
        <p className="text-sm text-foreground font-medium mb-1">Map view</p>
        <p className="text-xs text-muted-foreground max-w-md mx-auto">
          Interactive map will display the planned route, current vehicle position, and turn-by-turn directions.
        </p>
      </div>
    </div>
  );
}

export function CourierHistory() {
  const runs = [
    { id: 'R-019', date: 'Today', stops: 5, completed: 2, distance: '42 km', status: 'active' },
    { id: 'R-018', date: 'Yesterday', stops: 7, completed: 7, distance: '64 km', status: 'completed' },
    { id: 'R-017', date: 'Apr 24', stops: 6, completed: 6, distance: '51 km', status: 'completed' },
    { id: 'R-016', date: 'Apr 23', stops: 8, completed: 7, distance: '78 km', status: 'completed' },
    { id: 'R-015', date: 'Apr 22', stops: 4, completed: 4, distance: '32 km', status: 'completed' },
    { id: 'R-014', date: 'Apr 19', stops: 9, completed: 9, distance: '92 km', status: 'completed' },
  ];

  return (
    <div className="max-w-4xl">
      <PageHeader title="History" description="Past runs and delivery records" />
      <div className="grid grid-cols-4 gap-2.5 mb-5">
        <StatCard label="Total runs" value={runs.length} icon={<History className="w-4 h-4" />} />
        <StatCard label="Stops" value={runs.reduce((s, r) => s + r.stops, 0)} />
        <StatCard label="On-time" value="94%" />
        <StatCard label="Distance" value="359 km" />
      </div>
      <SectionLabel>Recent runs</SectionLabel>
      <div className="bg-card border border-border rounded-lg divide-y divide-border">
        {runs.map((r, i) => (
          <motion.div
            key={r.id}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.03 }}
            className="flex items-center gap-3 px-4 py-3"
          >
            <LogDot color={r.status === 'active' ? 'blue' : 'green'} />
            <div className="flex-1 min-w-0">
              <div className="text-[13px] font-medium text-foreground">Run {r.id}</div>
              <div className="text-[11px] text-muted-foreground">{r.date} · {r.completed}/{r.stops} stops · {r.distance}</div>
            </div>
            <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${r.status === 'active' ? 'badge-blue' : 'badge-green'}`}>
              {r.status}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export function CourierProfile() {
  return (
    <div className="max-w-3xl">
      <PageHeader title="Profile" description="Your courier profile and assigned vehicle" />
      <div className="bg-card border border-border rounded-lg p-5 mb-5 flex items-center gap-4">
        <div className="w-14 h-14 rounded-full badge-gray flex items-center justify-center text-base font-semibold flex-shrink-0">
          MU
        </div>
        <div className="flex-1">
          <p className="text-base font-semibold text-foreground">Musa Usman</p>
          <p className="text-[12px] text-muted-foreground">Courier · Apex Enterprises</p>
          <p className="text-[12px] text-muted-foreground">License: DL-2019-AB-0042</p>
        </div>
        <UserIcon className="w-5 h-5 text-muted-foreground" />
      </div>

      <SectionLabel>Vehicle</SectionLabel>
      <div className="bg-card border border-border rounded-lg p-5 mb-5 grid grid-cols-2 gap-4 text-[12px]">
        <div>
          <p className="text-muted-foreground uppercase tracking-wider text-[10px]">Vehicle ID</p>
          <p className="text-foreground font-medium mt-0.5">V-03</p>
        </div>
        <div>
          <p className="text-muted-foreground uppercase tracking-wider text-[10px]">Plate</p>
          <p className="text-foreground font-medium mt-0.5">ABJ-204-XY</p>
        </div>
        <div>
          <p className="text-muted-foreground uppercase tracking-wider text-[10px]">Make / Model</p>
          <p className="text-foreground font-medium mt-0.5">Toyota Hiace 2021</p>
        </div>
        <div>
          <p className="text-muted-foreground uppercase tracking-wider text-[10px]">Last service</p>
          <p className="text-foreground font-medium mt-0.5">Apr 02, 2024</p>
        </div>
      </div>

      <SectionLabel>Performance</SectionLabel>
      <div className="grid grid-cols-3 gap-2.5">
        <StatCard label="On-time rate" value="94%" />
        <StatCard label="Total deliveries" value={284} />
        <StatCard label="Rating" value="4.8" />
      </div>
    </div>
  );
}
