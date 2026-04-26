"use client";
import { useRouter } from 'next/navigation';

import { motion } from 'framer-motion';
import { PageHeader } from '@/components/shared/PageHeader';
import { SectionLabel } from '@/components/shared/SectionLabel';
import { StatCard } from '@/components/shared/StatCard';
import { useAppContext } from '@/contexts/AppContext';
import { MODULES } from '@/types/modules';
import { MOCK_USERS, ROLE_LABELS, ROLE_COLORS } from '@/types/organisation';
import { Building2, Users, Package, Activity, Plus, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function SuperAdminDashboard() {
  const router = useRouter();
  const { organisations, setCurrentOrg } = useAppContext();

  const totalUsers = MOCK_USERS.length;
  const totalModules = organisations.reduce((sum, org) => sum + org.enabledModules.length, 0);
  const activeOrgs = organisations.filter(o => o.status === 'active').length;

  const handleEnterOrg = (org: typeof organisations[0]) => {
    setCurrentOrg(org);
    router.push(`/org/${org.slug}`);
  };

  return (
    <div className="max-w-6xl">
      <PageHeader
        title="Super Admin Console"
        description="System-wide overview — manage all organisations, users, and modules."
      />

      {/* Global Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
        <StatCard label="Organisations" value={organisations.length} icon={<Building2 className="w-4 h-4" />} />
        <StatCard label="Total Users" value={totalUsers} icon={<Users className="w-4 h-4" />} />
        <StatCard label="Active Modules" value={totalModules} icon={<Package className="w-4 h-4" />} />
        <StatCard label="Active Orgs" value={activeOrgs} icon={<Activity className="w-4 h-4" />} />
      </div>

      {/* Organisations */}
      <div className="flex items-center justify-between mb-3">
        <SectionLabel>Organisations</SectionLabel>
        <Button size="sm" variant="outline" className="gap-1.5">
          <Plus className="w-3.5 h-3.5" /> New Organisation
        </Button>
      </div>

      <div className="grid gap-3">
        {organisations.map((org, i) => {
          const orgUsers = MOCK_USERS.filter(u => u.orgId === org.id);
          const orgModules = MODULES.filter(m => org.enabledModules.includes(m.key));

          return (
            <motion.div
              key={org.id}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="bg-card border border-border rounded-lg p-5 hover:border-primary/30 transition-colors"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">
                    {org.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-foreground">{org.name}</h3>
                    <p className="text-[11px] text-muted-foreground">{org.contactEmail} · {org.timezone}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${
                    org.status === 'active' ? 'badge-green' :
                    org.status === 'trial' ? 'badge-amber' : 'badge-coral'
                  }`}>
                    {org.status}
                  </span>
                  <span className="text-[10px] font-medium px-2 py-0.5 rounded-full badge-blue">
                    {org.plan}
                  </span>
                </div>
              </div>

              {/* Enabled modules */}
              <div className="flex flex-wrap gap-1.5 mb-3">
                {orgModules.map(m => (
                  <span key={m.key} className={`text-[11px] px-2 py-0.5 rounded ${m.color} text-foreground`}>
                    {m.icon} {m.name}
                  </span>
                ))}
              </div>

              {/* Users preview + enter button */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex -space-x-2">
                    {orgUsers.slice(0, 4).map(u => (
                      <div key={u.id} className="w-7 h-7 rounded-full bg-secondary border-2 border-card flex items-center justify-center text-[10px] font-medium text-muted-foreground">
                        {u.name.split(' ').map(n => n[0]).join('')}
                      </div>
                    ))}
                    {org.userCount > 4 && (
                      <div className="w-7 h-7 rounded-full bg-muted border-2 border-card flex items-center justify-center text-[10px] font-medium text-muted-foreground">
                        +{org.userCount - 4}
                      </div>
                    )}
                  </div>
                  <span className="text-[11px] text-muted-foreground">{org.userCount} users</span>
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleEnterOrg(org)}
                  className="gap-1.5 text-xs"
                >
                  Enter <ExternalLink className="w-3 h-3" />
                </Button>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Global User Breakdown */}
      <SectionLabel className="mt-8">User Roles Across System</SectionLabel>
      <div className="bg-card border border-border rounded-lg divide-y divide-border">
        {(['super_admin', 'admin', 'manager', 'courier', 'client'] as const).map(role => {
          const count = role === 'super_admin' ? 1 : MOCK_USERS.filter(u => u.role === role).length;
          return (
            <div key={role} className="flex items-center justify-between px-4 py-3">
              <div className="flex items-center gap-2.5">
                <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${ROLE_COLORS[role]}`}>
                  {ROLE_LABELS[role]}
                </span>
              </div>
              <span className="text-xs text-muted-foreground">{count} users</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
