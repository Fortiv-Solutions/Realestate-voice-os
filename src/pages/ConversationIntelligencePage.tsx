import React from 'react';
import { MetricCard } from '../components/MetricCard';
import {
  BrainCircuit,
  Sparkles,
  Target,
  CheckCircle2,
  AlertTriangle,
  UserCheck,
  Building2,
  ShieldCheck,
  BarChart2
} from 'lucide-react';

export const ConversationIntelligencePage: React.FC = () => {
  const extractedEntities = [
    { name: 'Owner Name & Identity', accuracy: '99.4%', status: 'Verified' },
    { name: 'Property Locality & Project', accuracy: '98.1%', status: 'Verified' },
    { name: 'Property Type & BHK', accuracy: '97.6%', status: 'Verified' },
    { name: 'Carpet Area (Sq Ft)', accuracy: '94.2%', status: 'Extracted' },
    { name: 'Occupancy (Living vs Rented)', accuracy: '96.8%', status: 'Verified' },
    { name: 'Rental Yield / Rent Amount', accuracy: '91.5%', status: 'Extracted' },
    { name: 'Ownership Duration', accuracy: '93.0%', status: 'Extracted' },
    { name: 'Selling Intent (Immediate vs Future)', accuracy: '98.5%', status: 'Verified' },
    { name: 'Selling Reason (Downsizing, Reinvest)', accuracy: '92.4%', status: 'Extracted' },
    { name: 'Future Selling Possibility', accuracy: '96.1%', status: 'Verified' },
    { name: 'Selling Timeline', accuracy: '95.3%', status: 'Verified' },
    { name: 'Owner Expected Target Price', accuracy: '97.2%', status: 'Verified' },
    { name: 'Other Properties in City', accuracy: '89.0%', status: 'Extracted' },
    { name: 'Callback Time Window', accuracy: '99.0%', status: 'Verified' },
    { name: 'Human Specialist Handoff Request', accuracy: '99.7%', status: 'Verified' },
    { name: 'Explicit DNC Opt-Out Detection', accuracy: '100.0%', status: 'Enforced' },
  ];

  return (
    <div className="space-y-6 pb-12">
      <div>
        <h2 className="text-base font-extrabold text-[#0F172A]">Conversation Intelligence & AI Extraction</h2>
        <p className="text-xs text-[#64748B]">Real-time natural language entity extraction, sentiment detection & safety enforcement</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-3.5">
        <MetricCard title="Conversations Analyzed" value="12,482" change="+12.8%" />
        <MetricCard title="Intent Detection Rate" value="98.4%" change="+1.2%" />
        <MetricCard title="Qualification Precision" value="96.2%" change="+2.4%" />
        <MetricCard title="Human Handoff Rate" value="28.4%" change="+3.1%" />
      </div>

      {/* Extracted Entity Accuracy Grid */}
      <div className="p-6 rounded-2xl bg-white border border-[#E2EEF8] shadow-card space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-[#E2EEF8]">
          <div>
            <h3 className="text-sm font-extrabold text-[#0F172A]">Extracted Property & Owner Entities</h3>
            <p className="text-xs text-[#64748B]">Automated CRM entity parsing benchmarks</p>
          </div>
          <span className="text-xs font-bold text-[#0284C7] bg-[#E0F2FE] px-3 py-1 rounded-full border border-[#BAE6FD]">
            16 / 16 Active Extraction Models
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {extractedEntities.map((e, idx) => (
            <div key={idx} className="p-3.5 rounded-xl bg-[#F8FCFF] border border-[#E2EEF8] hover:border-[#BAE6FD] hover:shadow-cyan-glow/15 transition-all space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#0F172A] leading-tight">{e.name}</span>
                <span className="text-[10px] font-bold text-[#0891B2] bg-[#ECFEFF] px-1.5 py-0.5 rounded border border-[#A5F3FC]">
                  {e.accuracy}
                </span>
              </div>
              <div className="flex justify-between items-center text-[10px] text-[#64748B] pt-1 border-t border-[#E2EEF8]">
                <span>Status:</span>
                <span className="font-bold text-[#0284C7]">{e.status}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
