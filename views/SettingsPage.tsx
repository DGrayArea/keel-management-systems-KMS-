"use client";
import { PageHeader } from '@/components/shared/PageHeader';
import { SectionLabel } from '@/components/shared/SectionLabel';
import { Button } from '@/components/ui/button';
import { MODULES } from '@/types/modules';

export default function SettingsPage() {
  return (
    <div className="max-w-3xl">
      <PageHeader title="Settings" description="Organisation configuration and module management" />

      {/* Org Info */}
      <SectionLabel>Organisation</SectionLabel>
      <div className="bg-card border border-border rounded-lg p-5 mb-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-[11px] text-muted-foreground uppercase tracking-wider">Name</label>
            <input
              type="text"
              defaultValue="Apex Enterprises"
              className="mt-1 w-full h-9 px-3 text-sm bg-secondary rounded-md border-0 text-foreground focus:outline-none focus:ring-2 focus:ring-ring/20"
            />
          </div>
          <div>
            <label className="text-[11px] text-muted-foreground uppercase tracking-wider">Currency</label>
            <input
              type="text"
              defaultValue="NGN (₦)"
              className="mt-1 w-full h-9 px-3 text-sm bg-secondary rounded-md border-0 text-foreground focus:outline-none focus:ring-2 focus:ring-ring/20"
            />
          </div>
          <div>
            <label className="text-[11px] text-muted-foreground uppercase tracking-wider">Timezone</label>
            <input
              type="text"
              defaultValue="Africa/Lagos (WAT)"
              className="mt-1 w-full h-9 px-3 text-sm bg-secondary rounded-md border-0 text-foreground focus:outline-none focus:ring-2 focus:ring-ring/20"
            />
          </div>
          <div>
            <label className="text-[11px] text-muted-foreground uppercase tracking-wider">Contact Email</label>
            <input
              type="email"
              defaultValue="admin@apex.ng"
              className="mt-1 w-full h-9 px-3 text-sm bg-secondary rounded-md border-0 text-foreground focus:outline-none focus:ring-2 focus:ring-ring/20"
            />
          </div>
        </div>
        <div className="mt-4 flex justify-end">
          <Button size="sm">Save changes</Button>
        </div>
      </div>

      {/* Module Management */}
      <SectionLabel>Enabled Modules</SectionLabel>
      <div className="bg-card border border-border rounded-lg divide-y divide-border mb-6">
        {MODULES.map((mod) => (
          <div key={mod.key} className="flex items-center gap-3 px-4 py-3">
            <div className={`w-8 h-8 rounded-lg ${mod.color} flex items-center justify-center text-base`}>
              {mod.icon}
            </div>
            <div className="flex-1">
              <div className="text-[13px] font-medium text-foreground">{mod.name}</div>
              <div className="text-[11px] text-muted-foreground">{mod.description}</div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" defaultChecked className="sr-only peer" />
              <div className="w-9 h-5 bg-secondary rounded-full peer peer-checked:bg-primary transition-colors after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-card after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:after:translate-x-4 after:shadow-sm" />
            </label>
          </div>
        ))}
      </div>

      {/* Roles */}
      <SectionLabel>User Roles</SectionLabel>
      <div className="bg-card border border-border rounded-lg divide-y divide-border">
        {[
          { role: 'Super Admin', desc: 'Full system access across all modules and organisations', count: 1 },
          { role: 'Admin / Operator', desc: 'Full dashboard access within assigned modules', count: 4 },
          { role: 'Client / End User', desc: 'Limited portal — view own records, submit requests', count: 23 },
        ].map((r) => (
          <div key={r.role} className="flex items-center gap-3 px-4 py-3">
            <div className="flex-1">
              <div className="text-[13px] font-medium text-foreground">{r.role}</div>
              <div className="text-[11px] text-muted-foreground">{r.desc}</div>
            </div>
            <span className="text-xs text-muted-foreground">{r.count} users</span>
          </div>
        ))}
      </div>
    </div>
  );
}
