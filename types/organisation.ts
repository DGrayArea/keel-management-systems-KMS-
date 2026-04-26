import type { ModuleKey } from './modules';

export type UserRole = 'super_admin' | 'admin' | 'manager' | 'client' | 'courier';

export interface Organisation {
  id: string;
  name: string;
  slug: string;
  logo?: string;
  enabledModules: ModuleKey[];
  currency: string;
  timezone: string;
  contactEmail: string;
  createdAt: string;
  status: 'active' | 'suspended' | 'trial';
  plan: 'starter' | 'professional' | 'enterprise';
  userCount: number;
}

export interface OrgUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  orgId: string;
  avatar?: string;
  status: 'active' | 'invited' | 'disabled';
  lastActive?: string;
}

export const ROLE_LABELS: Record<UserRole, string> = {
  super_admin: 'Super Admin',
  admin: 'Admin / Operator',
  manager: 'Manager',
  client: 'Client',
  courier: 'Courier',
};

export const ROLE_COLORS: Record<UserRole, string> = {
  super_admin: 'badge-coral',
  admin: 'badge-blue',
  manager: 'badge-amber',
  client: 'badge-green',
  courier: 'badge-gray',
};

export const MOCK_ORGANISATIONS: Organisation[] = [
  {
    id: 'org-1',
    name: 'Apex Enterprises',
    slug: 'apex',
    enabledModules: ['logistics', 'inventory', 'hr', 'finance', 'crm'],
    currency: 'NGN (₦)',
    timezone: 'Africa/Lagos (WAT)',
    contactEmail: 'admin@apex.ng',
    createdAt: '2024-11-15',
    status: 'active',
    plan: 'enterprise',
    userCount: 42,
  },
  {
    id: 'org-2',
    name: 'Sunrise Hotels Group',
    slug: 'sunrise',
    enabledModules: ['hotel', 'inventory', 'finance', 'hr', 'events'],
    currency: 'NGN (₦)',
    timezone: 'Africa/Lagos (WAT)',
    contactEmail: 'ops@sunrisehotels.ng',
    createdAt: '2025-01-10',
    status: 'active',
    plan: 'professional',
    userCount: 18,
  },
  {
    id: 'org-3',
    name: 'Greenfield Academy',
    slug: 'greenfield',
    enabledModules: ['school', 'finance', 'hr'],
    currency: 'NGN (₦)',
    timezone: 'Africa/Lagos (WAT)',
    contactEmail: 'admin@greenfield.edu.ng',
    createdAt: '2025-02-20',
    status: 'active',
    plan: 'starter',
    userCount: 8,
  },
  {
    id: 'org-4',
    name: 'MediCare Clinic',
    slug: 'medicare',
    enabledModules: ['hospital', 'inventory', 'finance'],
    currency: 'NGN (₦)',
    timezone: 'Africa/Lagos (WAT)',
    contactEmail: 'it@medicare.ng',
    createdAt: '2025-03-05',
    status: 'trial',
    plan: 'starter',
    userCount: 5,
  },
];

export const MOCK_USERS: OrgUser[] = [
  // Apex
  { id: 'u-1', name: 'Adewale Okafor', email: 'adewale@apex.ng', role: 'admin', orgId: 'org-1', status: 'active', lastActive: '2 min ago' },
  { id: 'u-2', name: 'Musa Usman', email: 'musa@apex.ng', role: 'courier', orgId: 'org-1', status: 'active', lastActive: '15 min ago' },
  { id: 'u-3', name: 'Fatima Bello', email: 'fatima@apex.ng', role: 'manager', orgId: 'org-1', status: 'active', lastActive: '1 hr ago' },
  { id: 'u-4', name: 'Chukwu Nnamdi', email: 'chukwu@apex.ng', role: 'client', orgId: 'org-1', status: 'active', lastActive: '3 hrs ago' },
  // Sunrise
  { id: 'u-5', name: 'Aisha Mohammed', email: 'aisha@sunrisehotels.ng', role: 'admin', orgId: 'org-2', status: 'active', lastActive: '5 min ago' },
  { id: 'u-6', name: 'Emeka Obi', email: 'emeka@sunrisehotels.ng', role: 'manager', orgId: 'org-2', status: 'active', lastActive: '30 min ago' },
  // Greenfield
  { id: 'u-7', name: 'Ngozi Adebayo', email: 'ngozi@greenfield.edu.ng', role: 'admin', orgId: 'org-3', status: 'active', lastActive: '10 min ago' },
  // MediCare
  { id: 'u-8', name: 'Dr. Yusuf Kano', email: 'yusuf@medicare.ng', role: 'admin', orgId: 'org-4', status: 'active', lastActive: '20 min ago' },
];
