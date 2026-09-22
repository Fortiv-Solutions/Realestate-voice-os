import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { MetricCard } from '../components/MetricCard';
import { MainAnalyticsChart, CallsPerDayChart, CallsPerHourChart } from '../components/Charts';
import {
  BarChart3,
  TrendingUp,
  Bot,
  Target,
  PhoneCall,
  MessageSquare,
  Users,
  CheckCircle2,
  Clock,
  Sparkles
} from 'lucide-react';

export const AnalyticsPage: React.FC<{ initialSubTab?: string }> = ({ initialSubTab = 'calls' }) => {
  const { agents } = useApp();
  const [subTab, setSubTab] = useState<'calls' | 'leads' | 'agents' | 'conversion'>(
    initialSubTab as any
  );

  const chartData = [
    { date: 'Aug 23', impressions: 450000, clicks: 17800, leads: 690 },
    { date: 'Aug 27', impressions: 530000, clicks: 20500, leads: 810 },
    { date: 'Aug 31', impressions: 510000, clicks: 19800, leads: 790 },
    { date: 'Sep 04', impressions: 540000, clicks: 21000, leads: 840 },
    { date: 'Sep 08', impressions: 560000, clicks: 21800, leads: 870 },
    { date: 'Sep 12', impressions: 580000, clicks: 22500, leads: 890 },
    { date: 'Sep 16', impressions: 610000, clicks: 23800, leads: 940 },
    { date: 'Sep 20', impressions: 640000, clicks: 24900, leads: 990 },
  ];

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div>
        <h2 className="text-base font-extrabold text-[#0F172A]">Operations & Intelligence Analytics</h2>
        <p className="text-xs text-[#64748B]">Comprehensive metrics across calling velocity, lead sources, and conversion funnels</p>
      </div>

      {/* Analytics Sub-tabs Navigation */}
      <div className="flex items-center gap-1 p-1 rounded-2xl bg-white border border-[#E2EEF8] shadow-card overflow-x-auto">
        {(
          [
            { id: 'calls', label: 'Call Analytics', icon: BarChart3 },
            { id: 'leads', label: 'Lead & Channel Analytics', icon: TrendingUp },
            { id: 'agents', label: 'Agent Performance', icon: Bot },
            { id: 'conversion', label: 'Conversion Funnel', icon: Target },
          ] as const
        ).map((t) => {
          const Icon = t.icon;
          const isActive = subTab === t.id;
          return (
            <button
              key={t.id}
              onClick={() => setSubTab(t.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                isActive
                  ? 'bg-gradient-to-r from-[#0284C7] to-[#06B6D4] text-white shadow-sm shadow-cyan-500/20'
                  : 'text-[#64748B] hover:text-[#0F172A] hover:bg-[#F0F7FD]'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{t.label}</span>
            </button>
          );
        })}
      </div>

      {/* Sub-tab 1: Call Analytics */}
      {subTab === 'calls' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-3.5">
            <MetricCard title="Total Calls Dialed" value="12,482" change="+12.8%" />
            <MetricCard title="Answering Rate" value="68.4%" change="+4.2%" />
            <MetricCard title="Avg Call Length" value="4m 32s" changeType="neutral" />
            <MetricCard title="Telephony Uptime" value="99.98%" changeType="positive" />
          </div>

          <div className="p-6 rounded-2xl bg-white border border-[#E2EEF8] shadow-card space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-extrabold text-[#0F172A]">Profolio™ Velocity & Listing Telemetry</h3>
                <p className="text-xs text-[#64748B]">Real-time engagement trends across listing stories</p>
              </div>
            </div>
            <MainAnalyticsChart data={chartData} height={280} />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            <div className="p-5 rounded-2xl bg-white border border-[#E2EEF8] shadow-card space-y-2">
              <span className="text-xs font-bold text-[#0F172A]">Calls per day of the week</span>
              <CallsPerDayChart />
            </div>
            <div className="p-5 rounded-2xl bg-white border border-[#E2EEF8] shadow-card space-y-2">
              <span className="text-xs font-bold text-[#0F172A]">Calls per hour</span>
              <CallsPerHourChart />
            </div>
          </div>
        </div>
      )}

      {/* Sub-tab 2: Lead & Channel Analytics */}
      {subTab === 'leads' && (
        <div className="space-y-6">
          <div className="p-5 rounded-2xl bg-white border border-[#E2EEF8] shadow-card space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#E2EEF8]">
              <div>
                <h3 className="text-sm font-extrabold text-[#0F172A]">Direct Leads Channel Breakdown</h3>
                <p className="text-xs text-[#64748B]">Property Finder, Bayut & Inbound Voice vs WhatsApp volume</p>
              </div>
              <span className="text-xs font-bold text-[#0284C7] bg-[#E0F2FE] px-3 py-1 rounded-full border border-[#BAE6FD]">
                19,621 Total Portal Inbound
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-[#F0F7FD] border border-[#E2EEF8] space-y-2">
                <span className="text-xs font-bold text-[#64748B] uppercase tracking-wider">WhatsApp Leads</span>
                <div className="text-2xl font-extrabold text-[#0F172A]">17,600</div>
                <div className="text-xs text-[#0284C7] font-bold">89.7% of total volume</div>
                <p className="text-[11px] text-[#64748B]">Avg response time: 6m • 99% response rate</p>
              </div>

              <div className="p-4 rounded-xl bg-[#F0F7FD] border border-[#E2EEF8] space-y-2">
                <span className="text-xs font-bold text-[#64748B] uppercase tracking-wider">Phone Calls</span>
                <div className="text-2xl font-extrabold text-[#0F172A]">2,000</div>
                <div className="text-xs text-[#06B6D4] font-bold">10.3% of total volume</div>
                <p className="text-[11px] text-[#64748B]">1,394 answered • 69% answer rate</p>
              </div>

              <div className="p-4 rounded-xl bg-[#F0F7FD] border border-[#E2EEF8] space-y-2">
                <span className="text-xs font-bold text-[#64748B] uppercase tracking-wider">Co-Broke Reality</span>
                <div className="text-2xl font-extrabold text-[#0284C7]">33% Agents</div>
                <div className="text-xs text-[#64748B] font-semibold">67% Direct Client Owners</div>
                <p className="text-[11px] text-[#64748B]">Filtered automatically to prevent broker confusion</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Sub-tab 3: Agent Performance */}
      {subTab === 'agents' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {agents.map((agent) => (
              <div key={agent.id} className="p-5 rounded-2xl bg-white border border-[#E2EEF8] shadow-card space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold text-[#0F172A]">{agent.name.split('—')[0]}</h3>
                  <span className="text-xs font-bold text-[#0284C7] bg-[#E0F2FE] px-2 py-0.5 rounded-lg border border-[#BAE6FD]">
                    Score: {agent.metrics.activityScore}
                  </span>
                </div>
                <div className="space-y-1.5 text-xs text-[#64748B]">
                  <div className="flex justify-between">
                    <span>Calls Today:</span>
                    <span className="font-bold text-[#0F172A]">{agent.metrics.callsToday}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Answer Rate:</span>
                    <span className="font-bold text-[#06B6D4]">{agent.metrics.answerRate}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Qualified Leads:</span>
                    <span className="font-bold text-[#0284C7]">{agent.metrics.qualifiedLeads}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Sub-tab 4: Conversion Funnel */}
      {subTab === 'conversion' && (
        <div className="p-6 rounded-2xl bg-white border border-[#E2EEF8] shadow-card space-y-4">
          <h3 className="text-sm font-extrabold text-[#0F172A]">Calling Conversion Pipeline</h3>
          <div className="space-y-3">
            {[
              { stage: '1. Total Verified Owner Contacts', count: 12482, pct: '100%', color: 'bg-[#0284C7]' },
              { stage: '2. Answered Calls (Human Pickups)', count: 8538, pct: '68.4%', color: 'bg-[#06B6D4]' },
              { stage: '3. Conversational Deep Engagement (>1m)', count: 5210, pct: '41.7%', color: 'bg-[#0284C7]' },
              { stage: '4. Qualified Leads (HOT + WARM)', count: 1284, pct: '10.3%', color: 'bg-[#06B6D4]' },
              { stage: '5. Specialist Appointments & Handoffs', count: 342, pct: '2.7%', color: 'bg-[#10B981]' },
            ].map((step, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex justify-between text-xs font-semibold text-[#0F172A]">
                  <span>{step.stage}</span>
                  <span>{step.count.toLocaleString()} ({step.pct})</span>
                </div>
                <div className="w-full bg-[#F0F7FD] h-3 rounded-full overflow-hidden border border-[#E2EEF8]">
                  <div
                    className={`${step.color} h-full rounded-full transition-all duration-500`}
                    style={{ width: step.pct }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
