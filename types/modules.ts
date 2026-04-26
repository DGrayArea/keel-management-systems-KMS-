export type ModuleKey = 'hotel' | 'logistics' | 'school' | 'inventory' | 'hospital' | 'finance' | 'hr' | 'crm' | 'events';

export interface ModuleConfig {
  key: ModuleKey;
  name: string;
  description: string;
  icon: string;
  path: string;
  color: string;
}

export const MODULES: ModuleConfig[] = [
  { key: 'hotel', name: 'Hotel', description: 'Bookings, rooms, guests', icon: '🏨', path: '/modules/hotel', color: 'bg-[hsl(213,60%,94%)]' },
  { key: 'logistics', name: 'Logistics', description: 'Shipments, routes, drivers', icon: '🚚', path: '/modules/logistics', color: 'bg-[hsl(100,45%,90%)]' },
  { key: 'school', name: 'School', description: 'Students, classes, fees', icon: '🎓', path: '/modules/school', color: 'bg-[hsl(38,70%,90%)]' },
  { key: 'inventory', name: 'Inventory', description: 'Stock, suppliers, orders', icon: '📦', path: '/modules/inventory', color: 'bg-[hsl(16,70%,93%)]' },
  { key: 'hospital', name: 'Hospital', description: 'Patients, appointments, pharmacy', icon: '🏥', path: '/modules/hospital', color: 'bg-[hsl(340,55%,93%)]' },
  { key: 'finance', name: 'Finance', description: 'Income, expenses, reports', icon: '💰', path: '/modules/finance', color: 'bg-[hsl(260,45%,93%)]' },
  { key: 'hr', name: 'HR', description: 'Employees, payroll, leave', icon: '👥', path: '/modules/hr', color: 'bg-[hsl(180,40%,90%)]' },
  { key: 'crm', name: 'CRM', description: 'Leads, deals, customers', icon: '🤝', path: '/modules/crm', color: 'bg-[hsl(280,50%,93%)]' },
  { key: 'events', name: 'Events', description: 'Venues, schedules, tickets', icon: '🎫', path: '/modules/events', color: 'bg-[hsl(60,55%,90%)]' },
];

export type StatusVariant = 'green' | 'amber' | 'blue' | 'coral' | 'gray';
