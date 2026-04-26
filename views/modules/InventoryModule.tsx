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
import { Plus } from 'lucide-react';
import type { StatusVariant } from '@/types/modules';

const tabs = [
  { key: 'stock', label: 'Stock' },
  { key: 'orders', label: 'Purchase orders' },
  { key: 'suppliers', label: 'Suppliers' },
  { key: 'movements', label: 'Movements' },
];

type StockStatus = 'in-stock' | 'low' | 'out';

const items = [
  { sku: 'SKU-001', name: 'Cement (50kg bags)', category: 'Construction', qty: 240, reorder: 100, price: 4500, status: 'in-stock' as StockStatus },
  { sku: 'SKU-002', name: 'Roofing sheets', category: 'Construction', qty: 32, reorder: 50, price: 8500, status: 'low' as StockStatus },
  { sku: 'SKU-003', name: 'PVC pipes (4")', category: 'Plumbing', qty: 0, reorder: 30, price: 3200, status: 'out' as StockStatus },
  { sku: 'SKU-004', name: 'Paint (white, 4L)', category: 'Finishing', qty: 88, reorder: 40, price: 6800, status: 'in-stock' as StockStatus },
  { sku: 'SKU-005', name: 'Iron rods (12mm)', category: 'Construction', qty: 18, reorder: 25, price: 5400, status: 'low' as StockStatus },
  { sku: 'SKU-006', name: 'Tiles (60x60)', category: 'Finishing', qty: 420, reorder: 100, price: 1800, status: 'in-stock' as StockStatus },
  { sku: 'SKU-007', name: 'Electric cable (2.5mm)', category: 'Electrical', qty: 0, reorder: 20, price: 18000, status: 'out' as StockStatus },
  { sku: 'SKU-008', name: 'Door handles', category: 'Hardware', qty: 156, reorder: 50, price: 2400, status: 'in-stock' as StockStatus },
];

const statusBadge: Record<StockStatus, StatusVariant> = {
  'in-stock': 'green',
  low: 'amber',
  out: 'coral',
};

const statusLabel: Record<StockStatus, string> = {
  'in-stock': 'In stock',
  low: 'Low',
  out: 'Out',
};

const orders = [
  { id: 'PO-2024-042', supplier: 'Dangote Cement', items: 3, total: 1080000, date: 'Apr 24', status: 'pending' as const },
  { id: 'PO-2024-041', supplier: 'Lafarge', items: 2, total: 425000, date: 'Apr 22', status: 'shipped' as const },
  { id: 'PO-2024-040', supplier: 'Julius Berger Supplies', items: 5, total: 2150000, date: 'Apr 20', status: 'received' as const },
  { id: 'PO-2024-039', supplier: 'Berger Paints', items: 1, total: 340000, date: 'Apr 18', status: 'received' as const },
  { id: 'PO-2024-038', supplier: 'Dangote Cement', items: 2, total: 900000, date: 'Apr 15', status: 'received' as const },
];

const orderBadge: Record<string, StatusVariant> = { pending: 'amber', shipped: 'blue', received: 'green' };

const suppliers = [
  { name: 'Dangote Cement', contact: 'Aminu Hassan', phone: '+234 803 1142', orders: 24, rating: 4.8 },
  { name: 'Lafarge', contact: 'Tunde Bakare', phone: '+234 808 8821', orders: 18, rating: 4.5 },
  { name: 'Julius Berger Supplies', contact: 'Ngozi Eze', phone: '+234 805 4490', orders: 31, rating: 4.9 },
  { name: 'Berger Paints', contact: 'Femi Adesoye', phone: '+234 818 2200', orders: 9, rating: 4.3 },
];

const movements = [
  { dot: 'green' as const, text: 'Stock in — 200 bags Cement received from Dangote', time: '11:30 AM' },
  { dot: 'coral' as const, text: 'Stock alert — PVC pipes (4") out of stock', time: '11:15 AM' },
  { dot: 'blue' as const, text: 'Stock out — 24 bags Cement issued to Site A', time: '10:50 AM' },
  { dot: 'amber' as const, text: 'Reorder threshold hit — Iron rods (12mm)', time: '10:20 AM' },
  { dot: 'green' as const, text: 'PO-2024-040 fully received — 5 items logged', time: '9:45 AM' },
  { dot: 'blue' as const, text: 'Adjustment — +12 Tiles (recount correction)', time: 'Yesterday 5:00 PM' },
];

export default function InventoryModule() {
  const [activeTab, setActiveTab] = useState('stock');
  const [stockFilter, setStockFilter] = useState('all');

  const filteredItems = useMemo(
    () => stockFilter === 'all' ? items : items.filter(i => i.status === stockFilter),
    [stockFilter]
  );

  const totalValue = items.reduce((s, i) => s + i.qty * i.price, 0);
  const lowCount = items.filter(i => i.status === 'low').length;
  const outCount = items.filter(i => i.status === 'out').length;

  return (
    <div className="max-w-5xl">
      <PageHeader
        title="Inventory Management"
        description="Stock levels, purchase orders, suppliers, and movements"
        actions={<Button size="sm" className="gap-1.5"><Plus className="w-4 h-4" />New item</Button>}
      />

      <TabNav tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />

      {activeTab === 'stock' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.2 }}>
          <div className="grid grid-cols-4 gap-2.5 mb-5">
            <StatCard value={items.length} label="SKUs tracked" />
            <StatCard value={`₦${(totalValue / 1_000_000).toFixed(1)}M`} label="Stock value" />
            <StatCard value={lowCount} label="Low stock" />
            <StatCard value={outCount} label="Out of stock" />
          </div>
          <FilterPills
            filters={[
              { key: 'all', label: 'All' },
              { key: 'in-stock', label: 'In stock' },
              { key: 'low', label: 'Low' },
              { key: 'out', label: 'Out' },
            ]}
            active={stockFilter}
            onChange={setStockFilter}
          />
          <div className="bg-card border border-border rounded-lg divide-y divide-border">
            {filteredItems.map(i => (
              <div key={i.sku} className="flex items-center gap-3 px-4 py-3 hover:bg-secondary/30 transition-colors">
                <div className="flex-1 min-w-0">
                  <div className="text-[13px] font-medium text-foreground">{i.name}</div>
                  <div className="text-[11px] text-muted-foreground">{i.sku} · {i.category} · ₦{i.price.toLocaleString()}/unit</div>
                </div>
                <div className="text-right">
                  <div className="text-[13px] font-medium text-foreground">{i.qty}</div>
                  <div className="text-[10px] text-muted-foreground">reorder ≤ {i.reorder}</div>
                </div>
                <StatusBadge variant={statusBadge[i.status]}>{statusLabel[i.status]}</StatusBadge>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {activeTab === 'orders' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.2 }}>
          <div className="grid grid-cols-4 gap-2.5 mb-5">
            <StatCard value={orders.length} label="Total orders" />
            <StatCard value={orders.filter(o => o.status === 'pending').length} label="Pending" />
            <StatCard value={orders.filter(o => o.status === 'shipped').length} label="Shipped" />
            <StatCard value="₦4.9M" label="This month" />
          </div>
          <SectionLabel>Recent purchase orders</SectionLabel>
          <div className="bg-card border border-border rounded-lg divide-y divide-border">
            {orders.map(o => (
              <div key={o.id} className="flex items-center gap-3 px-4 py-3 hover:bg-secondary/30 transition-colors cursor-pointer">
                <div className="flex-1 min-w-0">
                  <div className="text-[13px] font-medium text-foreground">{o.supplier}</div>
                  <div className="text-[11px] text-muted-foreground">{o.id} · {o.items} items · {o.date}</div>
                </div>
                <span className="text-[13px] font-medium text-foreground">₦{o.total.toLocaleString()}</span>
                <StatusBadge variant={orderBadge[o.status]}>{o.status}</StatusBadge>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {activeTab === 'suppliers' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.2 }}>
          <div className="grid grid-cols-4 gap-2.5 mb-5">
            <StatCard value={suppliers.length} label="Active suppliers" />
            <StatCard value={82} label="Total POs" />
            <StatCard value="4.6" label="Avg rating" />
            <StatCard value={3} label="New this quarter" />
          </div>
          <SectionLabel>Supplier directory</SectionLabel>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
            {suppliers.map((s, i) => (
              <motion.div
                key={s.name}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.03 }}
                className="bg-card border border-border rounded-lg p-4"
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[13px] font-medium text-foreground">{s.name}</span>
                  <span className="text-[11px] text-muted-foreground">★ {s.rating}</span>
                </div>
                <div className="text-[11px] text-muted-foreground">{s.contact} · {s.phone}</div>
                <div className="text-[11px] text-muted-foreground mt-1">{s.orders} orders placed</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {activeTab === 'movements' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.2 }}>
          <SectionLabel>Stock movement log</SectionLabel>
          <div className="bg-card border border-border rounded-lg divide-y divide-border">
            {movements.map((m, i) => (
              <div key={i} className="flex items-start gap-3 px-4 py-3 text-[13px]">
                <LogDot color={m.dot} />
                <span className="flex-1 text-foreground leading-relaxed">{m.text}</span>
                <span className="text-[11px] text-muted-foreground whitespace-nowrap ml-2">{m.time}</span>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}
