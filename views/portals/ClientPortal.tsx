"use client";
import { useState } from 'react';
import { motion } from 'framer-motion';
import { PageHeader } from '@/components/shared/PageHeader';
import { SectionLabel } from '@/components/shared/SectionLabel';
import { Button } from '@/components/ui/button';
import { Plus, Send, FileText, MessageSquare, CheckCircle, Clock } from 'lucide-react';
import { useAppContext } from '@/contexts/AppContext';

interface Request {
  id: string;
  subject: string;
  desc: string;
  status: 'open' | 'in-progress' | 'resolved';
  date: string;
}

const initialRequests: Request[] = [
  { id: 'REQ-012', subject: 'Delivery status inquiry', desc: 'Asked about ETA on shipment #0043', status: 'open', date: 'Today' },
  { id: 'REQ-011', subject: 'Invoice correction request', desc: 'Wrong amount on INV-2024-087', status: 'in-progress', date: 'Yesterday' },
  { id: 'REQ-010', subject: 'Address update', desc: 'New billing address provided', status: 'resolved', date: '3 days ago' },
];

export default function ClientPortal() {
  const { currentOrg } = useAppContext();
  const [requests, setRequests] = useState<Request[]>(initialRequests);
  const [showForm, setShowForm] = useState(false);
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');

  const submit = () => {
    if (!subject.trim()) return;
    setRequests([
      { id: `REQ-${String(Math.floor(Math.random() * 900) + 100)}`, subject, desc: body || '—', status: 'open', date: 'Just now' },
      ...requests,
    ]);
    setSubject('');
    setBody('');
    setShowForm(false);
  };

  return (
    <div className="max-w-3xl">
      <PageHeader
        title="Welcome back"
        description={`${currentOrg?.name} — your portal`}
        actions={
          <Button size="sm" className="gap-1.5" onClick={() => setShowForm(s => !s)}>
            <Plus className="w-3.5 h-3.5" /> New request
          </Button>
        }
      />

      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="bg-card border border-border rounded-lg p-4 text-center">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-2">
            <FileText className="w-5 h-5 text-primary" />
          </div>
          <p className="text-lg font-semibold text-foreground">5</p>
          <p className="text-[11px] text-muted-foreground">My records</p>
        </div>
        <div className="bg-card border border-border rounded-lg p-4 text-center">
          <div className="w-10 h-10 rounded-full badge-amber flex items-center justify-center mx-auto mb-2">
            <Clock className="w-5 h-5" />
          </div>
          <p className="text-lg font-semibold text-foreground">{requests.filter(r => r.status !== 'resolved').length}</p>
          <p className="text-[11px] text-muted-foreground">Pending</p>
        </div>
        <div className="bg-card border border-border rounded-lg p-4 text-center">
          <div className="w-10 h-10 rounded-full badge-green flex items-center justify-center mx-auto mb-2">
            <CheckCircle className="w-5 h-5" />
          </div>
          <p className="text-lg font-semibold text-foreground">{requests.filter(r => r.status === 'resolved').length + 7}</p>
          <p className="text-[11px] text-muted-foreground">Completed</p>
        </div>
      </div>

      {showForm && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card border border-border rounded-lg p-4 mb-4"
        >
          <SectionLabel>New request</SectionLabel>
          <input
            type="text"
            placeholder="Subject"
            value={subject}
            onChange={e => setSubject(e.target.value)}
            className="w-full h-9 px-3 mb-2 text-sm bg-secondary rounded-md border-0 focus:outline-none focus:ring-2 focus:ring-ring/20"
          />
          <textarea
            placeholder="Describe your request..."
            value={body}
            onChange={e => setBody(e.target.value)}
            rows={3}
            className="w-full px-3 py-2 mb-3 text-sm bg-secondary rounded-md border-0 resize-none focus:outline-none focus:ring-2 focus:ring-ring/20"
          />
          <div className="flex justify-end gap-2">
            <Button size="sm" variant="outline" onClick={() => setShowForm(false)}>Cancel</Button>
            <Button size="sm" className="gap-1.5" onClick={submit}><Send className="w-3.5 h-3.5" /> Submit</Button>
          </div>
        </motion.div>
      )}

      <SectionLabel>My recent requests</SectionLabel>
      <div className="bg-card border border-border rounded-lg divide-y divide-border">
        {requests.map(req => (
          <div key={req.id} className="flex items-start gap-3 px-4 py-3">
            <MessageSquare className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-[13px] font-medium text-foreground">{req.subject}</p>
              <p className="text-[11px] text-muted-foreground">{req.id} · {req.date} · {req.desc}</p>
            </div>
            <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${
              req.status === 'open' ? 'badge-blue' :
              req.status === 'in-progress' ? 'badge-amber' : 'badge-green'
            }`}>
              {req.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
