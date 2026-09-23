import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { MetricCard } from '../components/MetricCard';
import { RinggVolumeChart } from '../components/RinggVolumeChart';
import { ConnectivityChart } from '../components/ConnectivityChart';
import { CallsPerDayChart, CallsPerHourChart } from '../components/Charts';
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
  Sparkles,
  MousePointerClick,
  Info,
  ArrowUpDown,
  Ghost,
  ChevronDown
} from 'lucide-react';

export const AnalyticsPage: React.FC<{ initialSubTab?: string }> = ({ initialSubTab = 'calls' }) => {
  const { agents } = useApp();
  const [subTab, setSubTab] = useState<'calls' | 'leads' | 'agents' | 'conversion'>(
    initialSubTab as any
  );
  const [selectedAgent, setSelectedAgent] = useState<string>('All');
  const [sortField, setSortField] = useState<'name' | 'calls' | 'connected' | 'minutes' | 'cost'>('calls');
  const [sortAsc, setSortAsc] = useState<boolean>(false);

  const assistantStats = [
    {
      id: 'agent-1',
      name: 'Ananya — Thaltej & Bodakdev Resale Agent',
      shortName: 'Ananya (Resale)',
      calls: 12482,
      connected: 8538,
      minutes: 4850.5,
      cost: '₹14,250',
    },
    {
      id: 'agent-2',
      name: 'Vikram Joshi (Satellite Desk)',
      shortName: 'Vikram Joshi (Satellite)',
      calls: 8240,
      connected: 5690,
      minutes: 3120.0,
      cost: '₹9,410',
    },
    {
      id: 'agent-3',
      name: 'Ananya Sharma (Bodakdev Luxury Portfolio)',
      shortName: 'Ananya (Luxury)',
      calls: 6150,
      connected: 4320,
      minutes: 2480.0,
      cost: '₹7,120',
    },
    {
      id: 'agent-4',
      name: 'Suresh Parmar (Bopal & SG Highway)',
      shortName: 'Suresh Parmar (Bopal)',
      calls: 4890,
      connected: 3280,
      minutes: 1940.5,
      cost: '₹5,580',
    },
  ];

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div>
        <h2 className="text-base font-extrabold text-[#111827]">Operations & Intelligence Analytics</h2>
        <p className="text-xs text-[#6B7280]">Comprehensive metrics across calling velocity, lead sources, and conversion funnels</p>
      </div>

      {/* Analytics Sub-tabs Navigation */}
      <div className="flex items-center gap-1.5 p-1 rounded-xl bg-[#F4F5F7] border border-[#E5E7EB] shadow-card overflow-x-auto">
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
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all ${
                isActive
                  ? 'bg-white text-[#111827] shadow-xs'
                  : 'text-[#6B7280] hover:text-[#111827]'
              }`}
            >
              <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#2563EB]' : 'text-[#6B7280]'}`} />
              <span>{t.label}</span>
            </button>
          );
        })}
      </div>

      {/* Sub-tab 1: Call Analytics */}
      {subTab === 'calls' && (
        <div className="space-y-6">
          {/* 4 Metric Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <MetricCard title="Total calls" value="12,482" change="+12.8%" />
            <MetricCard title="Connectivity rate" value="68.4%" change="+4.2%" />
            <MetricCard title="Avg handle time" value="56s" change="-14s" changeType="positive" />
            <MetricCard title="Total handle time" value="21m 30s" change="+18.5%" changeType="positive" />
          </div>

          {/* Main Ringg.ai Style Graph Card */}
          <div className="p-6 rounded-2xl bg-white border border-[#ECEEF1] shadow-card space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-extrabold text-[#111827]">Velocity & Performance Telemetry</h3>
                <p className="text-xs text-[#6B7280] mt-0.5">Real-time engagement trends across calling operations</p>
              </div>
            </div>
            <RinggVolumeChart height={260} />
          </div>

          {/* Ringg.ai Style Performance Banner */}
          <div className="space-y-2">
            <div className="text-xs font-bold text-[#6B7280] uppercase tracking-wider">
              Performance
            </div>

            <div className="p-6 rounded-2xl bg-white border border-[#ECEEF1] shadow-card flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-2.5 text-xs text-[#6B7280] font-medium">
                <MousePointerClick className="w-4 h-4 text-[#2563EB]" />
                <span>
                  Pick an{' '}
                  <select
                    value={selectedAgent}
                    onChange={(e) => setSelectedAgent(e.target.value)}
                    className="font-bold text-[#2563EB] bg-[#EFF6FF] border border-[#BFDBFE] rounded-lg px-2 py-1 text-xs cursor-pointer focus:outline-hidden"
                  >
                    <option value="All">All Voice Agents</option>
                    {agents.map((a) => (
                      <option key={a.id} value={a.id}>
                        {a.name.split('—')[0]}
                      </option>
                    ))}
                  </select>{' '}
                  to see goal metrics
                </span>
              </div>

              <div className="flex items-center gap-10 sm:gap-14 self-end md:self-center">
                <div className="space-y-0.5">
                  <span className="text-xs font-semibold text-[#6B7280]">Total cost</span>
                  <div className="text-2xl font-extrabold text-[#111827]">₹192</div>
                </div>

                <div className="space-y-0.5">
                  <span className="text-xs font-semibold text-[#6B7280]">Latency</span>
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-extrabold text-[#111827]">639ms</span>
                    <span className="text-[11px] font-semibold text-[#9CA3AF]">Avg</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 2 Side-by-Side Cards: Connectivity and Cohort Analysis */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left Card: Connectivity */}
            <div className="p-6 rounded-2xl bg-white border border-[#ECEEF1] shadow-card space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <h3 className="text-sm font-extrabold text-[#111827]">Connectivity</h3>
                  <Info className="w-3.5 h-3.5 text-[#9CA3AF] cursor-help" />
                </div>
                <span className="text-[11px] font-bold text-[#2563EB] bg-[#EFF6FF] px-2 py-0.5 rounded-full border border-[#DBEAFE]">
                  Attempt Distribution
                </span>
              </div>
              <ConnectivityChart height={200} />
            </div>

            {/* Right Card: Cohort Analysis */}
            <div className="p-6 rounded-2xl bg-white border border-[#ECEEF1] shadow-card flex flex-col justify-between space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-extrabold text-[#111827]">Cohort analysis</h3>
                <span className="text-[11px] font-semibold text-[#9CA3AF]">Retention</span>
              </div>

              <div className="flex-1 flex flex-col items-center justify-center text-center py-10 space-y-2">
                <div className="w-10 h-10 rounded-full bg-[#F4F5F7] text-[#9CA3AF] flex items-center justify-center">
                  <Ghost className="w-5 h-5" />
                </div>
                <p className="text-xs font-medium text-[#6B7280]">No cohort data in this range</p>
                <span className="text-[11px] text-[#9CA3AF]">Try expanding the date range filter</span>
              </div>
            </div>
          </div>

          {/* Assistant Breakdown Table */}
          <div className="p-6 rounded-2xl bg-white border border-[#ECEEF1] shadow-card space-y-4 overflow-hidden">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-extrabold text-[#111827]">Assistant Performance Breakdown</h3>
                <p className="text-xs text-[#6B7280] mt-0.5">Detailed call minutes and infrastructure cost per consultant</p>
              </div>
            </div>

            <div className="overflow-x-auto -mx-6 px-6">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-[#ECEEF1] text-[11px] font-bold text-[#6B7280] uppercase tracking-wider">
                    <th className="py-3 px-3 font-bold">Assistant</th>
                    <th className="py-3 px-3 font-bold text-right">
                      <div className="flex items-center justify-end gap-1 cursor-pointer hover:text-[#111827]">
                        <span>Calls</span>
                        <ArrowUpDown className="w-3 h-3 text-[#9CA3AF]" />
                      </div>
                    </th>
                    <th className="py-3 px-3 font-bold text-right">
                      <div className="flex items-center justify-end gap-1 cursor-pointer hover:text-[#111827]">
                        <span>Connected</span>
                        <ArrowUpDown className="w-3 h-3 text-[#9CA3AF]" />
                      </div>
                    </th>
                    <th className="py-3 px-3 font-bold text-right">
                      <div className="flex items-center justify-end gap-1 cursor-pointer hover:text-[#111827]">
                        <span>Minutes</span>
                        <ArrowUpDown className="w-3 h-3 text-[#9CA3AF]" />
                      </div>
                    </th>
                    <th className="py-3 px-3 font-bold text-right">
                      <div className="flex items-center justify-end gap-1 cursor-pointer hover:text-[#111827]">
                        <span>Cost</span>
                        <ArrowUpDown className="w-3 h-3 text-[#9CA3AF]" />
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#ECEEF1] text-xs font-medium text-[#111827]">
                  {assistantStats.map((item) => (
                    <tr key={item.id} className="hover:bg-[#F8F9FA] transition-colors">
                      <td className="py-3.5 px-3">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-[#2563EB]" />
                          <span className="font-bold text-[#111827]">{item.name}</span>
                        </div>
                      </td>
                      <td className="py-3.5 px-3 text-right font-bold text-[#111827]">
                        {item.calls.toLocaleString()}
                      </td>
                      <td className="py-3.5 px-3 text-right font-bold text-[#10B981]">
                        {item.connected.toLocaleString()}
                      </td>
                      <td className="py-3.5 px-3 text-right text-[#6B7280]">
                        {item.minutes.toLocaleString()}
                      </td>
                      <td className="py-3.5 px-3 text-right font-bold text-[#111827]">
                        {item.cost}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="pt-2 text-xs font-medium text-[#6B7280]">
              {assistantStats.length} assistants
            </div>
          </div>

          {/* Breakdown cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            <div className="p-5 rounded-2xl bg-white border border-[#ECEEF1] shadow-card space-y-2">
              <span className="text-xs font-bold text-[#111827]">Calls per day of the week</span>
              <CallsPerDayChart />
            </div>
            <div className="p-5 rounded-2xl bg-white border border-[#ECEEF1] shadow-card space-y-2">
              <span className="text-xs font-bold text-[#111827]">Calls per hour</span>
              <CallsPerHourChart />
            </div>
          </div>
        </div>
      )}

      {/* Sub-tab 2: Lead & Channel Analytics */}
      {subTab === 'leads' && (
        <div className="space-y-6">
          <div className="p-5 rounded-2xl bg-white border border-[#ECEEF1] shadow-card space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#ECEEF1]">
              <div>
                <h3 className="text-sm font-extrabold text-[#111827]">Direct Leads Channel Breakdown</h3>
                <p className="text-xs text-[#6B7280]">Property Portal, Inbound Voice vs WhatsApp volume</p>
              </div>
              <span className="text-xs font-bold text-[#2563EB] bg-[#EFF6FF] px-3 py-1 rounded-full border border-[#DBEAFE]">
                19,621 Total Inbound
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-[#F8F9FA] border border-[#ECEEF1] space-y-2">
                <span className="text-xs font-bold text-[#6B7280] uppercase tracking-wider">WhatsApp Leads</span>
                <div className="text-2xl font-extrabold text-[#111827]">17,600</div>
                <div className="text-xs text-[#2563EB] font-bold">89.7% of total volume</div>
                <p className="text-[11px] text-[#6B7280]">Avg response time: 6m • 99% response rate</p>
              </div>

              <div className="p-4 rounded-xl bg-[#F8F9FA] border border-[#ECEEF1] space-y-2">
                <span className="text-xs font-bold text-[#6B7280] uppercase tracking-wider">Phone Calls</span>
                <div className="text-2xl font-extrabold text-[#111827]">2,000</div>
                <div className="text-xs text-[#2563EB] font-bold">10.3% of total volume</div>
                <p className="text-[11px] text-[#6B7280]">1,394 answered • 69% answer rate</p>
              </div>

              <div className="p-4 rounded-xl bg-[#F8F9FA] border border-[#ECEEF1] space-y-2">
                <span className="text-xs font-bold text-[#6B7280] uppercase tracking-wider">Co-Broke Reality</span>
                <div className="text-2xl font-extrabold text-[#2563EB]">33% Agents</div>
                <div className="text-xs text-[#6B7280] font-semibold">67% Direct Client Owners</div>
                <p className="text-[11px] text-[#6B7280]">Filtered automatically to prevent broker confusion</p>
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
              <div key={agent.id} className="p-5 rounded-2xl bg-white border border-[#ECEEF1] hover:border-[#CBD5E1] shadow-card space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold text-[#111827]">{agent.name.split('—')[0]}</h3>
                  <span className="text-xs font-bold text-[#2563EB] bg-[#EFF6FF] px-2 py-0.5 rounded-lg border border-[#BFDBFE]">
                    Score: {agent.metrics.activityScore}
                  </span>
                </div>
                <div className="space-y-1.5 text-xs text-[#6B7280]">
                  <div className="flex justify-between">
                    <span>Calls Today:</span>
                    <span className="font-bold text-[#111827]">{agent.metrics.callsToday}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Answer Rate:</span>
                    <span className="font-bold text-[#2563EB]">{agent.metrics.answerRate}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Qualified Leads:</span>
                    <span className="font-bold text-[#10B981]">{agent.metrics.qualifiedLeads}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Sub-tab 4: Conversion Funnel */}
      {subTab === 'conversion' && (
        <div className="p-6 rounded-2xl bg-white border border-[#ECEEF1] shadow-card space-y-4">
          <h3 className="text-sm font-extrabold text-[#111827]">Calling Conversion Pipeline</h3>
          <div className="space-y-3">
            {[
              { stage: '1. Total Verified Owner Contacts', count: 12482, pct: '100%', color: 'bg-[#2563EB]' },
              { stage: '2. Answered Calls (Human Pickups)', count: 8538, pct: '68.4%', color: 'bg-[#3B82F6]' },
              { stage: '3. Conversational Deep Engagement (>1m)', count: 5210, pct: '41.7%', color: 'bg-[#60A5FA]' },
              { stage: '4. Qualified Leads (HOT + WARM)', count: 1284, pct: '10.3%', color: 'bg-[#93C5FD]' },
              { stage: '5. Specialist Appointments & Handoffs', count: 342, pct: '2.7%', color: 'bg-[#10B981]' },
            ].map((step, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex justify-between text-xs font-semibold text-[#111827]">
                  <span>{step.stage}</span>
                  <span>{step.count.toLocaleString()} ({step.pct})</span>
                </div>
                <div className="w-full bg-[#F0F2F5] h-3 rounded-full overflow-hidden border border-[#ECEEF1]">
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
