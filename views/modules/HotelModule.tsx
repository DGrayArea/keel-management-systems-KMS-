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
  { key: 'rooms', label: 'Rooms' },
  { key: 'bookings', label: 'Bookings' },
  { key: 'guests', label: 'Guests' },
  { key: 'logs', label: 'Activity' },
];

type RoomStatus = 'available' | 'occupied' | 'cleaning' | 'maintenance';

const rooms = [
  { id: '101', type: 'Standard', floor: 1, rate: 18000, status: 'occupied' as RoomStatus, guest: 'A. Bello' },
  { id: '102', type: 'Standard', floor: 1, rate: 18000, status: 'available' as RoomStatus, guest: null },
  { id: '103', type: 'Deluxe', floor: 1, rate: 32000, status: 'cleaning' as RoomStatus, guest: null },
  { id: '201', type: 'Deluxe', floor: 2, rate: 32000, status: 'occupied' as RoomStatus, guest: 'F. Okafor' },
  { id: '202', type: 'Suite', floor: 2, rate: 65000, status: 'occupied' as RoomStatus, guest: 'M. Yusuf' },
  { id: '203', type: 'Suite', floor: 2, rate: 65000, status: 'available' as RoomStatus, guest: null },
  { id: '301', type: 'Executive', floor: 3, rate: 95000, status: 'maintenance' as RoomStatus, guest: null },
  { id: '302', type: 'Executive', floor: 3, rate: 95000, status: 'occupied' as RoomStatus, guest: 'C. Nnamdi' },
];

const roomBadgeMap: Record<RoomStatus, StatusVariant> = {
  available: 'green',
  occupied: 'blue',
  cleaning: 'amber',
  maintenance: 'coral',
};

const bookings = [
  { id: 'BK-1042', guest: 'Aisha Bello', room: '101', checkin: 'Today', checkout: 'Apr 28', nights: 2, total: 36000, status: 'in-house' as const },
  { id: 'BK-1041', guest: 'Fatima Okafor', room: '201', checkin: 'Yesterday', checkout: 'Apr 30', nights: 4, total: 128000, status: 'in-house' as const },
  { id: 'BK-1040', guest: 'Musa Yusuf', room: '202', checkin: 'Apr 24', checkout: 'Apr 27', nights: 3, total: 195000, status: 'in-house' as const },
  { id: 'BK-1043', guest: 'Ngozi Adebayo', room: '103', checkin: 'Apr 27', checkout: 'Apr 29', nights: 2, total: 64000, status: 'upcoming' as const },
  { id: 'BK-1044', guest: 'Tunde Akinola', room: '203', checkin: 'Apr 28', checkout: 'May 02', nights: 4, total: 260000, status: 'upcoming' as const },
  { id: 'BK-1039', guest: 'Emeka Obi', room: '102', checkin: 'Apr 22', checkout: 'Apr 24', nights: 2, total: 36000, status: 'checked-out' as const },
];

const bookingBadge: Record<string, StatusVariant> = {
  'in-house': 'blue',
  upcoming: 'amber',
  'checked-out': 'gray',
};

const bookingLabel: Record<string, string> = {
  'in-house': 'In house',
  upcoming: 'Upcoming',
  'checked-out': 'Checked out',
};

const guests = [
  { name: 'Aisha Bello', initials: 'AB', email: 'aisha@mail.com', phone: '+234 812 4421', visits: 3, room: '101' },
  { name: 'Fatima Okafor', initials: 'FO', email: 'fatima@mail.com', phone: '+234 803 2210', visits: 1, room: '201' },
  { name: 'Musa Yusuf', initials: 'MY', email: 'musa@mail.com', phone: '+234 805 9928', visits: 7, room: '202' },
  { name: 'Chukwu Nnamdi', initials: 'CN', email: 'chukwu@mail.com', phone: '+234 818 7733', visits: 2, room: '302' },
];

const avatarColors = [
  { bg: 'bg-[hsl(210,60%,94%)]', fg: 'text-[hsl(210,70%,28%)]' },
  { bg: 'bg-[hsl(95,45%,88%)]', fg: 'text-[hsl(100,65%,18%)]' },
  { bg: 'bg-[hsl(340,55%,93%)]', fg: 'text-[hsl(340,55%,28%)]' },
  { bg: 'bg-[hsl(38,70%,90%)]', fg: 'text-[hsl(30,80%,22%)]' },
];

const logs = [
  { dot: 'green' as const, text: 'Guest checked in — Room 101 · Aisha Bello', time: '11:20 AM' },
  { dot: 'blue' as const, text: 'New booking BK-1044 confirmed — Suite 203', time: '10:45 AM' },
  { dot: 'amber' as const, text: 'Room 103 cleaning started — ETA 30 min', time: '10:10 AM' },
  { dot: 'coral' as const, text: 'Maintenance ticket opened for Room 301 — AC unit', time: '9:30 AM' },
  { dot: 'green' as const, text: 'Payment received — ₦128,000 for BK-1041', time: '8:55 AM' },
  { dot: 'blue' as const, text: 'Guest checked out — Room 102 · Emeka Obi', time: 'Yesterday 11:00 AM' },
];

export default function HotelModule() {
  const [activeTab, setActiveTab] = useState('rooms');
  const [roomFilter, setRoomFilter] = useState('all');

  const filteredRooms = useMemo(
    () => roomFilter === 'all' ? rooms : rooms.filter(r => r.status === roomFilter),
    [roomFilter]
  );

  const occupied = rooms.filter(r => r.status === 'occupied').length;
  const available = rooms.filter(r => r.status === 'available').length;
  const occupancyRate = Math.round((occupied / rooms.length) * 100);

  return (
    <div className="max-w-5xl">
      <PageHeader
        title="Hotel Management"
        description="Rooms, bookings, guests, and front-desk operations"
        actions={<Button size="sm" className="gap-1.5"><Plus className="w-4 h-4" />New booking</Button>}
      />

      <TabNav tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />

      {activeTab === 'rooms' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.2 }}>
          <div className="grid grid-cols-4 gap-2.5 mb-5">
            <StatCard value={rooms.length} label="Total rooms" />
            <StatCard value={occupied} label="Occupied" />
            <StatCard value={available} label="Available" />
            <StatCard value={`${occupancyRate}%`} label="Occupancy" />
          </div>

          <FilterPills
            filters={[
              { key: 'all', label: 'All' },
              { key: 'available', label: 'Available' },
              { key: 'occupied', label: 'Occupied' },
              { key: 'cleaning', label: 'Cleaning' },
              { key: 'maintenance', label: 'Maintenance' },
            ]}
            active={roomFilter}
            onChange={setRoomFilter}
          />

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5">
            {filteredRooms.map((r, i) => (
              <motion.div
                key={r.id}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.03 }}
                className="bg-card border border-border rounded-lg p-4 hover:shadow-sm transition-shadow cursor-pointer"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-base font-semibold text-foreground">Room {r.id}</span>
                  <StatusBadge variant={roomBadgeMap[r.status]}>{r.status}</StatusBadge>
                </div>
                <div className="text-[11px] text-muted-foreground space-y-0.5">
                  <div>{r.type} · Floor {r.floor}</div>
                  <div>₦{r.rate.toLocaleString()}/night</div>
                  {r.guest && <div className="text-foreground pt-1">Guest: {r.guest}</div>}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {activeTab === 'bookings' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.2 }}>
          <div className="grid grid-cols-4 gap-2.5 mb-5">
            <StatCard value={bookings.length} label="Total bookings" />
            <StatCard value={bookings.filter(b => b.status === 'in-house').length} label="In house" />
            <StatCard value={bookings.filter(b => b.status === 'upcoming').length} label="Upcoming" />
            <StatCard value="₦719k" label="Revenue (week)" />
          </div>
          <SectionLabel>Booking ledger</SectionLabel>
          <div className="bg-card border border-border rounded-lg divide-y divide-border">
            {bookings.map(b => (
              <div key={b.id} className="flex items-center gap-3 px-4 py-3 hover:bg-secondary/30 transition-colors">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-[13px] font-medium text-foreground">{b.guest}</span>
                    <span className="text-[11px] text-muted-foreground">· {b.id}</span>
                  </div>
                  <div className="text-[11px] text-muted-foreground mt-0.5">
                    Room {b.room} · {b.checkin} → {b.checkout} · {b.nights} night{b.nights > 1 ? 's' : ''}
                  </div>
                </div>
                <span className="text-[13px] font-medium text-foreground">₦{b.total.toLocaleString()}</span>
                <StatusBadge variant={bookingBadge[b.status]}>{bookingLabel[b.status]}</StatusBadge>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {activeTab === 'guests' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.2 }}>
          <div className="grid grid-cols-4 gap-2.5 mb-5">
            <StatCard value={guests.length} label="In house guests" />
            <StatCard value={26} label="Total this month" />
            <StatCard value={9} label="Returning" />
            <StatCard value="4.8" label="Avg rating" />
          </div>
          <SectionLabel>Current guests</SectionLabel>
          <div className="bg-card border border-border rounded-lg divide-y divide-border">
            {guests.map((g, i) => (
              <div key={g.name} className="flex items-center gap-3 px-4 py-3 hover:bg-secondary/30 transition-colors cursor-pointer">
                <UserAvatar initials={g.initials} bgClass={avatarColors[i % avatarColors.length].bg} fgClass={avatarColors[i % avatarColors.length].fg} />
                <div className="flex-1 min-w-0">
                  <div className="text-[13px] font-medium text-foreground">{g.name}</div>
                  <div className="text-[11px] text-muted-foreground">{g.email} · {g.phone}</div>
                </div>
                <div className="text-[11px] text-muted-foreground">Room {g.room}</div>
                <span className="text-[10px] px-2 py-0.5 rounded-full badge-blue">{g.visits} visits</span>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {activeTab === 'logs' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.2 }}>
          <SectionLabel>Recent front-desk activity</SectionLabel>
          <div className="bg-card border border-border rounded-lg divide-y divide-border">
            {logs.map((log, i) => (
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
