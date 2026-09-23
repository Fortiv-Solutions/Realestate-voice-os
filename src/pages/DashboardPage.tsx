import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  CalinaPerformanceOverviewChart,
  CalinaPeakCallingHoursChart,
  DirectLeadsDonutChart,
  DirectLeadsOverTimeChart,
  CallInsightsLineChart,
  WhatsAppInsightsLineChart,
  CallsPerDayChart,
  CallsPerHourChart,
} from '../components/Charts';
import { MetricCard } from '../components/MetricCard';
import { StatusBadge } from '../components/StatusBadge';
import { WaveformPlayer } from '../components/WaveformPlayer';
import {
  Phone,
  PhoneCall,
  MessageSquare,
  Sparkles,
  ArrowRight,
  TrendingUp,
  CheckCircle2,
  XCircle,
  Clock,
  HelpCircle,
  Plus,
  ShieldCheck,
  ChevronRight,
  Play,
  Calendar,
  Zap,
  Bot,
  Filter,
  MoreVertical,
  Activity,
  Smile,
  Radio,
  FileText
} from 'lucide-react';

export const DashboardPage: React.FC = () => {
  const { calls, campaigns, navigate, openScheduleCallbackModal } = useApp();
  const [activeViewTab, setActiveViewTab] = useState<'overview' | 'leads_insights'>('overview');
  const [directLeadsFilter, setDirectLeadsFilter] = useState<'All leads' | 'WhatsApp' | 'Calls' | 'Email'>('All leads');

  // Recent 6 calls
  const recentCalls = calls.slice(0, 6);

  return (
    <div className="space-y-6 pb-16 max-w-[1600px] mx-auto">
      {/* 1. Top Welcome Greeting & Subtitle */}
      <div>
        <h1 className="text-2xl font-extrabold text-[#111827] tracking-tight">
          Welcome back!
        </h1>
        <p className="text-xs text-[#6B7280] mt-1">
          Monitor calls, track outcomes, and stay on top of performance.
        </p>
      </div>

      {/* 2. Top Banner: VoiceOS Status Notice Banner */}
      <div className="px-4 py-2.5 rounded-xl bg-white border border-[#ECEEF1] shadow-card flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-5 h-5 rounded-full bg-[#2563EB] text-white flex items-center justify-center text-[10px] shrink-0">
            <Sparkles className="w-3 h-3 text-white" />
          </div>
          <div className="flex items-center gap-1.5 text-xs">
            <span className="font-bold text-[#111827]">VoiceOS is now live.</span>
            <span className="text-[#6B7280] hidden sm:inline">VoiceOS is now live. Monitor calls and performance instantly.</span>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs font-semibold text-[#10B981] bg-[#ECFDF5] px-2.5 py-0.5 rounded-full border border-[#A7F3D0]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse" />
          <span>Online</span>
        </div>
      </div>

      {/* 3. Section Navigation Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-2.5 rounded-2xl bg-white border border-[#ECEEF1] shadow-card">
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-[#F4F5F7] border border-[#E5E7EB] overflow-x-auto">
          <button
            onClick={() => setActiveViewTab('overview')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
              activeViewTab === 'overview'
                ? 'bg-white text-[#111827] shadow-xs'
                : 'text-[#6B7280] hover:text-[#111827]'
            }`}
          >
            <Activity className="w-3.5 h-3.5 text-[#2563EB]" />
            <span>Overview</span>
          </button>

          <button
            onClick={() => setActiveViewTab('leads_insights')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
              activeViewTab === 'leads_insights'
                ? 'bg-white text-[#111827] shadow-xs'
                : 'text-[#6B7280] hover:text-[#111827]'
            }`}
          >
            <PhoneCall className="w-3.5 h-3.5 text-[#2563EB]" />
            <span>Leads & Call Insights</span>
          </button>
        </div>

        <div className="text-xs font-medium text-[#6B7280] px-3 py-1 bg-[#F4F5F7] rounded-lg border border-[#E5E7EB] self-start sm:self-auto">
          Aug 17 – Sep 22, 2026
        </div>
      </div>

      {/* ========================================================================= */}
      {/* MAIN VIEW: CALINA AI OVERVIEW (MATCHING SCREENSHOT) */}
      {/* ========================================================================= */}
      {activeViewTab === 'overview' && (
        <div className="space-y-6">
          {/* 4. Top KPI Cards Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {/* Card 1: Active Calls (Screenshot Exact) */}
            <MetricCard
              title="Active Calls"
              value="234"
              change="+12.5%"
              changeType="positive"
              subtext="Up from last week!"
              icon={<PhoneCall className="w-4 h-4 text-[#2563EB]" />}
              breakdown={{
                label1: '% Ongoing',
                label2: '% Waiting',
                label3: '% Completed',
              }}
              onClick={() => navigate('/calls/live')}
            />

            {/* Card 2: Customer Sentiment (Screenshot Exact) */}
            <MetricCard
              title="Customer Sentiment"
              value="92%"
              change="+12.5%"
              changeType="positive"
              subtext="Better than last week!"
              icon={<Smile className="w-4 h-4 text-[#10B981]" />}
              breakdown={{
                label1: '% Happy',
                label2: '% Neutral',
                label3: '% Negative',
              }}
              onClick={() => navigate('/analytics')}
            />

            {/* Card 3: Total Calls Dialed */}
            <MetricCard
              title="Total Calls Dialed"
              value="12,482"
              change="+12.8%"
              changeType="positive"
              subtext="842 completed today"
              icon={<Phone className="w-4 h-4 text-[#2563EB]" />}
              breakdown={{
                label1: 'Answered (68%)',
                label2: 'Busy (18%)',
                label3: 'Voicemail (14%)',
              }}
              onClick={() => navigate('/calls')}
            />

            {/* Card 4: Answering Rate */}
            <MetricCard
              title="Answering Rate"
              value="68.4%"
              change="+4.2%"
              changeType="positive"
              subtext="Target goal: >65%"
              icon={<TrendingUp className="w-4 h-4 text-[#10B981]" />}
              breakdown={{
                label1: 'Morning (74%)',
                label2: 'Noon (69%)',
                label3: 'Evening (62%)',
              }}
              onClick={() => navigate('/analytics')}
            />
          </div>

          {/* 5. Middle Charts Row: Performance Overview + Peak Calling Hours */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
            {/* Left 8 Cols: Performance Overview (Results vs Goal) */}
            <div className="lg:col-span-8 p-5 rounded-2xl bg-white border border-[#ECEEF1] shadow-card flex flex-col justify-between">
              <CalinaPerformanceOverviewChart height={165} />
            </div>

            {/* Right 4 Cols: Peak Calling Hours Histogram */}
            <div className="lg:col-span-4 p-5 rounded-2xl bg-white border border-[#ECEEF1] shadow-card flex flex-col justify-between">
              <CalinaPeakCallingHoursChart />
            </div>
          </div>

          {/* 6. Bottom Table: Recent Calls (Matching Recent Orders) */}
          <div className="p-6 rounded-2xl bg-white border border-[#ECEEF1] shadow-card space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#F0F2F5]">
              <div>
                <h3 className="text-base font-extrabold text-[#111827] tracking-tight">Recent calls</h3>
                <p className="text-xs text-[#6B7280]">Latest conversational interactions across campaigns</p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => navigate('/calls')}
                  className="px-3.5 py-1.5 rounded-xl bg-[#F4F5F7] hover:bg-[#E5E7EB] text-xs font-bold text-[#111827] transition-colors flex items-center gap-1.5"
                >
                  <span>View all calls</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-[#ECEEF1] text-[11px] font-bold uppercase tracking-wider text-[#9CA3AF]">
                    <th className="py-3 px-3">Lead / Contact</th>
                    <th className="py-3 px-3">Agent</th>
                    <th className="py-3 px-3">Campaign</th>
                    <th className="py-3 px-3">Duration</th>
                    <th className="py-3 px-3">Sentiment</th>
                    <th className="py-3 px-3">Status</th>
                    <th className="py-3 px-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F0F2F5]">
                  {recentCalls.map((call) => {
                    const sentimentLabel =
                      call.sentimentScore > 0.2
                        ? 'positive'
                        : call.sentimentScore < -0.2
                        ? 'negative'
                        : 'neutral';

                    return (
                      <tr
                        key={call.id}
                        onClick={() => navigate(`/calls/${call.id}`)}
                        className="hover:bg-[#F8F9FA] transition-colors cursor-pointer group"
                      >
                        <td className="py-3 px-3">
                          <div className="flex items-center gap-2.5">
                            <div className="w-8 h-8 rounded-full bg-[#EFF6FF] text-[#2563EB] font-bold flex items-center justify-center text-xs shrink-0">
                              {call.ownerName ? call.ownerName.charAt(0) : 'L'}
                            </div>
                            <div>
                              <span className="font-bold text-[#111827] block group-hover:text-[#2563EB] transition-colors">
                                {call.ownerName}
                              </span>
                              <span className="text-[11px] text-[#6B7280]">{call.phoneNumber}</span>
                            </div>
                          </div>
                        </td>

                        <td className="py-3 px-3">
                          <span className="font-semibold text-[#111827]">{call.agentName}</span>
                        </td>

                        <td className="py-3 px-3">
                          <span className="text-[#6B7280]">{call.campaignName || 'Direct Outbound'}</span>
                        </td>

                        <td className="py-3 px-3">
                          <span className="font-medium text-[#111827]">{call.durationFormatted}</span>
                        </td>

                        <td className="py-3 px-3">
                          <span
                            className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                              sentimentLabel === 'positive'
                                ? 'bg-[#ECFDF5] text-[#10B981] border-[#A7F3D0]'
                                : sentimentLabel === 'negative'
                                ? 'bg-[#FEF2F2] text-[#EF4444] border-[#FECACA]'
                                : 'bg-[#F3F4F6] text-[#4B5563] border-[#E5E7EB]'
                            }`}
                          >
                            {sentimentLabel}
                          </span>
                        </td>

                        <td className="py-3 px-3">
                          <StatusBadge status={call.outcome} />
                        </td>

                        <td className="py-3 px-3 text-right">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              navigate(`/calls/${call.id}`);
                            }}
                            className="px-3 py-1 rounded-lg text-xs font-bold text-[#2563EB] hover:bg-[#EFF6FF] transition-colors"
                          >
                            Details
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* VIEW 2: LEADS, CALL & WHATSAPP INSIGHTS */}
      {/* ========================================================================= */}
      {activeViewTab === 'leads_insights' && (
        <div className="space-y-6">
          {/* SECTION 1: LEADS INSIGHTS */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-extrabold text-[#111827] tracking-tight flex items-center gap-2">
                <span className="w-1.5 h-4 bg-[#2563EB] rounded-full" />
                <span>Leads insights</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
              {/* Direct leads source Donut Card */}
              <div className="lg:col-span-4 p-5 rounded-2xl bg-white border border-[#ECEEF1] shadow-card flex flex-col justify-between">
                <div>
                  <h3 className="text-xs font-bold text-[#6B7280]">Direct leads source</h3>
                  <div className="py-3 flex justify-center">
                    <DirectLeadsDonutChart total="19,621" whatsappCount={17600} callsCount={2000} />
                  </div>
                </div>

                <button
                  onClick={() => navigate('/contacts')}
                  className="text-xs font-bold text-[#2563EB] hover:text-[#1D4ED8] flex items-center gap-1.5 mt-2 self-start"
                >
                  <span>View all contacts</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Direct leads over time Line Chart Card */}
              <div className="lg:col-span-8 p-5 rounded-2xl bg-white border border-[#ECEEF1] shadow-card space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold text-[#6B7280]">Direct leads over time</h3>
                </div>

                <div className="pt-1">
                  <DirectLeadsOverTimeChart
                    selectedChannel={directLeadsFilter}
                    onChannelChange={setDirectLeadsFilter}
                    height={155}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* SECTION 2: CALL INSIGHTS */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-extrabold text-[#111827] tracking-tight flex items-center gap-2">
                <span className="w-1.5 h-4 bg-[#2563EB] rounded-full" />
                <span>Call insights</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
              {/* Left KPI Box */}
              <div className="lg:col-span-4 p-5 rounded-2xl bg-white border border-[#ECEEF1] shadow-card flex flex-col justify-between space-y-4">
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-3 pb-3 border-b border-[#F0F2F5]">
                    <div>
                      <span className="text-[11px] text-[#6B7280] block font-semibold">Total calls</span>
                      <div className="flex items-baseline gap-2 mt-0.5">
                        <span className="text-2xl font-extrabold text-[#111827]">2k</span>
                        <span className="text-[10px] font-bold text-[#10B981] bg-[#ECFDF5] px-1.5 py-0.5 rounded-full border border-[#A7F3D0]">
                          ↑ +38%
                        </span>
                      </div>
                    </div>

                    <div>
                      <span className="text-[11px] text-[#6B7280] block font-semibold">Answering rate</span>
                      <div className="flex items-baseline gap-2 mt-0.5">
                        <span className="text-2xl font-extrabold text-[#111827]">69%</span>
                        <span className="text-[10px] font-bold text-[#10B981] bg-[#ECFDF5] px-1.5 py-0.5 rounded-full border border-[#A7F3D0]">
                          ↑ +6%
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Outcome Breakdown */}
                  <div className="grid grid-cols-3 gap-2 text-xs">
                    <div className="p-2.5 rounded-xl bg-[#F8F9FA] border border-[#ECEEF1]">
                      <div className="flex items-center gap-1 text-[10px] font-semibold text-[#6B7280]">
                        <CheckCircle2 className="w-3 h-3 text-[#2563EB]" />
                        <span>Answered</span>
                      </div>
                      <div className="text-sm font-bold text-[#111827] mt-0.5">1,394</div>
                    </div>

                    <div className="p-2.5 rounded-xl bg-[#F8F9FA] border border-[#ECEEF1]">
                      <div className="flex items-center gap-1 text-[10px] font-semibold text-[#6B7280]">
                        <XCircle className="w-3 h-3 text-[#EF4444]" />
                        <span>Unanswered</span>
                      </div>
                      <div className="text-sm font-bold text-[#111827] mt-0.5">460</div>
                    </div>

                    <div className="p-2.5 rounded-xl bg-[#F8F9FA] border border-[#ECEEF1]">
                      <div className="flex items-center gap-1 text-[10px] font-semibold text-[#6B7280]">
                        <Clock className="w-3 h-3 text-[#9CA3AF]" />
                        <span>Canceled</span>
                      </div>
                      <div className="text-sm font-bold text-[#111827] mt-0.5">168</div>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => navigate('/agents')}
                  className="text-xs font-bold text-[#2563EB] hover:text-[#1D4ED8] flex items-center gap-1.5 self-start"
                >
                  <span>View per agent</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Right Chart Box */}
              <div className="lg:col-span-8 p-5 rounded-2xl bg-white border border-[#ECEEF1] shadow-card">
                <CallInsightsLineChart initialMode="Total calls" />
              </div>
            </div>

            {/* Bottom Row of Call Insights */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              <div className="p-5 rounded-2xl bg-white border border-[#ECEEF1] shadow-card space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#111827]">Calls per day of the week</span>
                  <div className="flex items-center gap-3 text-[10px] font-semibold">
                    <span className="flex items-center gap-1.5 text-[#111827]">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#2563EB]" /> Answered
                    </span>
                    <span className="flex items-center gap-1.5 text-[#6B7280]">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#E5E7EB]" /> Unanswered
                    </span>
                  </div>
                </div>
                <CallsPerDayChart />
              </div>

              <div className="p-5 rounded-2xl bg-white border border-[#ECEEF1] shadow-card space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#111827]">Calls per hour ℹ️</span>
                  <span className="text-[10px] font-bold text-[#2563EB] bg-[#EFF6FF] px-2 py-0.5 rounded-md border border-[#DBEAFE]">
                    Peak: 11 AM – 4 PM
                  </span>
                </div>
                <CallsPerHourChart />
              </div>
            </div>
          </div>

          {/* SECTION 3: WHATSAPP INSIGHTS */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-extrabold text-[#111827] tracking-tight flex items-center gap-2">
                <span className="w-1.5 h-4 bg-[#2563EB] rounded-full" />
                <span>WhatsApp insights</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
              <div className="lg:col-span-4 p-5 rounded-2xl bg-white border border-[#ECEEF1] shadow-card flex flex-col justify-between space-y-4">
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-3 pb-3 border-b border-[#F0F2F5]">
                    <div>
                      <span className="text-[11px] text-[#6B7280] block font-semibold">WhatsApp leads</span>
                      <div className="flex items-baseline gap-2 mt-0.5">
                        <span className="text-2xl font-extrabold text-[#111827]">17.6k</span>
                        <span className="text-[10px] font-bold text-[#10B981] bg-[#ECFDF5] px-1.5 py-0.5 rounded-full border border-[#A7F3D0]">
                          ↑ +50%
                        </span>
                      </div>
                    </div>

                    <div>
                      <span className="text-[11px] text-[#6B7280] block font-semibold">Response rate</span>
                      <div className="flex items-baseline gap-2 mt-0.5">
                        <span className="text-2xl font-extrabold text-[#111827]">99%</span>
                        <span className="text-[10px] font-bold text-[#10B981] bg-[#ECFDF5] px-1.5 py-0.5 rounded-full border border-[#A7F3D0]">
                          ↑ +2%
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2 text-xs">
                    <div className="p-2.5 rounded-xl bg-[#F8F9FA] border border-[#ECEEF1]">
                      <div className="text-[10px] font-semibold text-[#6B7280]">Replied</div>
                      <div className="text-sm font-bold text-[#111827] mt-0.5">17,436</div>
                    </div>

                    <div className="p-2.5 rounded-xl bg-[#F8F9FA] border border-[#ECEEF1]">
                      <div className="text-[10px] font-semibold text-[#6B7280]">Not replied</div>
                      <div className="text-sm font-bold text-[#EF4444] mt-0.5">125</div>
                    </div>

                    <div className="p-2.5 rounded-xl bg-[#F8F9FA] border border-[#ECEEF1]">
                      <div className="text-[10px] font-semibold text-[#6B7280]">Response time</div>
                      <div className="text-sm font-bold text-[#2563EB] mt-0.5">6m</div>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => navigate('/analytics/leads')}
                  className="text-xs font-bold text-[#2563EB] hover:text-[#1D4ED8] flex items-center gap-1.5 self-start"
                >
                  <span>View per agent</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="lg:col-span-8 p-5 rounded-2xl bg-white border border-[#ECEEF1] shadow-card">
                <WhatsAppInsightsLineChart />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
