import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  DirectLeadsDonutChart,
  DirectLeadsOverTimeChart,
  CallInsightsLineChart,
  WhatsAppInsightsLineChart,
  CallsPerDayChart,
  CallsPerHourChart,
  ProfolioListingPerformanceChart,
} from '../components/Charts';
import { StatusBadge } from '../components/StatusBadge';
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
  Eye,
  MousePointer,
  HelpCircle,
  Plus,
  Wallet,
  ShieldCheck,
  ChevronRight,
  Play,
  Layers,
  Building2,
  Calendar,
  Zap
} from 'lucide-react';

export const DashboardPage: React.FC = () => {
  const { calls, campaigns, navigate, openTestCallModal } = useApp();
  const [activeDashboardTab, setActiveDashboardTab] = useState<'leads_insights' | 'profolio_performance'>('leads_insights');
  const [directLeadsFilter, setDirectLeadsFilter] = useState<'All leads' | 'WhatsApp' | 'Calls' | 'Email'>('All leads');
  const [performanceViewMode, setPerformanceViewMode] = useState<'daily' | 'monthly'>('daily');
  const [showListingBreakdown, setShowListingBreakdown] = useState(false);

  return (
    <div className="space-y-6 pb-16">
      {/* Top Banner: Real Estate Voice OS & Quick Live Simulator */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-[#E0F2FE] via-white to-[#ECFEFF] border border-[#BAE6FD] shadow-subtle flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-[#06B6D4] to-[#0284C7] text-white flex items-center justify-center shrink-0 shadow-md shadow-cyan-500/25">
            <Zap className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-xs font-black text-[#0F172A] tracking-wider uppercase">
                AI Voice Calling Operations • Online
              </h3>
              <span className="w-2 h-2 rounded-full bg-[#06B6D4] animate-ping" />
            </div>
            <p className="text-xs text-[#64748B] mt-0.5">
              Autonomous conversational voice agents calling property owners across Satellite, Bodakdev, Bopal & SG Highway.
            </p>
          </div>
        </div>

        <button
          onClick={() => openTestCallModal()}
          className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#0284C7] to-[#06B6D4] hover:from-[#0369A1] hover:to-[#0891B2] text-white text-xs font-extrabold shadow-md shadow-cyan-500/25 transition-all shrink-0 active:scale-98"
        >
          <PhoneCall className="w-4 h-4 fill-white" />
          <span>Launch Live Simulator</span>
        </button>
      </div>

      {/* Top Toggle Switcher: Switch between Property Finder Leads View & Profolio Performance View */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 rounded-2xl bg-white border border-[#E2EEF8] shadow-card">
        <div className="flex items-center gap-2">
          <div className="p-1 rounded-xl bg-[#F0F7FD] border border-[#E2EEF8] flex items-center gap-1">
            <button
              onClick={() => setActiveDashboardTab('leads_insights')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2 ${
                activeDashboardTab === 'leads_insights'
                  ? 'bg-white text-[#0284C7] shadow-sm border border-[#BAE6FD]'
                  : 'text-[#64748B] hover:text-[#0F172A]'
              }`}
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>Leads, Call & WhatsApp Insights</span>
            </button>

            <button
              onClick={() => setActiveDashboardTab('profolio_performance')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2 ${
                activeDashboardTab === 'profolio_performance'
                  ? 'bg-white text-[#0284C7] shadow-sm border border-[#BAE6FD]'
                  : 'text-[#64748B] hover:text-[#0F172A]'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Profolio™ Listing Performance</span>
            </button>
          </div>
        </div>

        <div className="text-xs font-semibold text-[#64748B] px-3 py-1 bg-[#F8FCFF] rounded-lg border border-[#E2EEF8]">
          Aug 17 – Sep 22, 2026
        </div>
      </div>

      {/* ========================================================================= */}
      {/* VIEW 1: LEADS, CALL & WHATSAPP INSIGHTS */}
      {/* ========================================================================= */}
      {activeDashboardTab === 'leads_insights' && (
        <div className="space-y-6">
          {/* SECTION 1: LEADS INSIGHTS */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-extrabold text-[#0F172A] tracking-tight flex items-center gap-2">
                <span className="w-2 h-4 bg-gradient-to-b from-[#06B6D4] to-[#0284C7] rounded-full" />
                <span>Leads insights</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
              {/* Direct leads source Donut Card */}
              <div className="lg:col-span-4 p-5 rounded-2xl bg-white border border-[#E2EEF8] shadow-card flex flex-col justify-between">
                <div>
                  <h3 className="text-xs font-bold text-[#64748B]">Direct leads source</h3>
                  <div className="py-3 flex justify-center">
                    <DirectLeadsDonutChart total="19,621" whatsappCount={17600} callsCount={2000} />
                  </div>
                </div>

                <button
                  onClick={() => navigate('/contacts')}
                  className="text-xs font-bold text-[#0284C7] hover:text-[#0369A1] flex items-center gap-1.5 mt-2 self-start"
                >
                  <span>View all contacts</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Direct leads over time Line Chart Card */}
              <div className="lg:col-span-8 p-5 rounded-2xl bg-white border border-[#E2EEF8] shadow-card space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold text-[#64748B]">Direct leads over time</h3>
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
              <h2 className="text-sm font-extrabold text-[#0F172A] tracking-tight flex items-center gap-2">
                <span className="w-2 h-4 bg-gradient-to-b from-[#0284C7] to-[#06B6D4] rounded-full" />
                <span>Call insights</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
              {/* Left KPI Box */}
              <div className="lg:col-span-4 p-5 rounded-2xl bg-white border border-[#E2EEF8] shadow-card flex flex-col justify-between space-y-4">
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-3 pb-3 border-b border-[#E2EEF8]">
                    <div>
                      <span className="text-[11px] text-[#64748B] block font-semibold">Total calls</span>
                      <div className="flex items-baseline gap-2 mt-0.5">
                        <span className="text-2xl font-extrabold text-[#0F172A]">2k</span>
                        <span className="text-[10px] font-bold text-[#0284C7] bg-[#E0F2FE] px-1.5 py-0.5 rounded border border-[#BAE6FD]">
                          ↑ +38%
                        </span>
                      </div>
                    </div>

                    <div>
                      <span className="text-[11px] text-[#64748B] block font-semibold">Answering rate</span>
                      <div className="flex items-baseline gap-2 mt-0.5">
                        <span className="text-2xl font-extrabold text-[#0F172A]">69%</span>
                        <span className="text-[10px] font-bold text-[#0284C7] bg-[#E0F2FE] px-1.5 py-0.5 rounded border border-[#BAE6FD]">
                          ↑ +6%
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Outcome Breakdown */}
                  <div className="grid grid-cols-3 gap-2 text-xs">
                    <div className="p-2.5 rounded-xl bg-[#F0F7FD] border border-[#E2EEF8]">
                      <div className="flex items-center gap-1 text-[10px] font-semibold text-[#64748B]">
                        <CheckCircle2 className="w-3 h-3 text-[#0284C7]" />
                        <span>Answered</span>
                      </div>
                      <div className="text-sm font-bold text-[#0F172A] mt-0.5">1,394</div>
                    </div>

                    <div className="p-2.5 rounded-xl bg-[#F0F7FD] border border-[#E2EEF8]">
                      <div className="flex items-center gap-1 text-[10px] font-semibold text-[#64748B]">
                        <XCircle className="w-3 h-3 text-[#EF4444]" />
                        <span>Unanswered</span>
                      </div>
                      <div className="text-sm font-bold text-[#0F172A] mt-0.5">460</div>
                    </div>

                    <div className="p-2.5 rounded-xl bg-[#F0F7FD] border border-[#E2EEF8]">
                      <div className="flex items-center gap-1 text-[10px] font-semibold text-[#64748B]">
                        <Clock className="w-3 h-3 text-[#94A3B8]" />
                        <span>Canceled</span>
                      </div>
                      <div className="text-sm font-bold text-[#0F172A] mt-0.5">168</div>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => navigate('/agents')}
                  className="text-xs font-bold text-[#0284C7] hover:text-[#0369A1] flex items-center gap-1.5 self-start"
                >
                  <span>View per agent</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Right Chart Box */}
              <div className="lg:col-span-8 p-5 rounded-2xl bg-white border border-[#E2EEF8] shadow-card">
                <CallInsightsLineChart initialMode="Total calls" />
              </div>
            </div>

            {/* Bottom Row of Call Insights */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              <div className="p-5 rounded-2xl bg-white border border-[#E2EEF8] shadow-card space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#0F172A]">Calls per day of the week ℹ️</span>
                  <div className="flex items-center gap-3 text-[10px] font-semibold">
                    <span className="flex items-center gap-1.5 text-[#0F172A]">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#06B6D4]" /> Answered
                    </span>
                    <span className="flex items-center gap-1.5 text-[#64748B]">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#BAE6FD]" /> Unanswered
                    </span>
                  </div>
                </div>
                <CallsPerDayChart />
              </div>

              <div className="p-5 rounded-2xl bg-white border border-[#E2EEF8] shadow-card space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#0F172A]">Calls per hour ℹ️</span>
                  <span className="text-[10px] font-bold text-[#0284C7] bg-[#E0F2FE] px-2 py-0.5 rounded-md">
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
              <h2 className="text-sm font-extrabold text-[#0F172A] tracking-tight flex items-center gap-2">
                <span className="w-2 h-4 bg-gradient-to-b from-[#06B6D4] to-[#0284C7] rounded-full" />
                <span>WhatsApp insights</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
              <div className="lg:col-span-4 p-5 rounded-2xl bg-white border border-[#E2EEF8] shadow-card flex flex-col justify-between space-y-4">
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-3 pb-3 border-b border-[#E2EEF8]">
                    <div>
                      <span className="text-[11px] text-[#64748B] block font-semibold">WhatsApp leads</span>
                      <div className="flex items-baseline gap-2 mt-0.5">
                        <span className="text-2xl font-extrabold text-[#0F172A]">17.6k</span>
                        <span className="text-[10px] font-bold text-[#0284C7] bg-[#E0F2FE] px-1.5 py-0.5 rounded border border-[#BAE6FD]">
                          ↑ +50%
                        </span>
                      </div>
                    </div>

                    <div>
                      <span className="text-[11px] text-[#64748B] block font-semibold">Response rate</span>
                      <div className="flex items-baseline gap-2 mt-0.5">
                        <span className="text-2xl font-extrabold text-[#0F172A]">99%</span>
                        <span className="text-[10px] font-bold text-[#0284C7] bg-[#E0F2FE] px-1.5 py-0.5 rounded border border-[#BAE6FD]">
                          ↑ +2%
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2 text-xs">
                    <div className="p-2.5 rounded-xl bg-[#F0F7FD] border border-[#E2EEF8]">
                      <div className="text-[10px] font-semibold text-[#64748B]">Replied</div>
                      <div className="text-sm font-bold text-[#0F172A] mt-0.5">17,436</div>
                    </div>

                    <div className="p-2.5 rounded-xl bg-[#F0F7FD] border border-[#E2EEF8]">
                      <div className="text-[10px] font-semibold text-[#64748B]">Not replied</div>
                      <div className="text-sm font-bold text-[#0891B2] mt-0.5">125</div>
                    </div>

                    <div className="p-2.5 rounded-xl bg-[#F0F7FD] border border-[#E2EEF8]">
                      <div className="text-[10px] font-semibold text-[#64748B]">Response time</div>
                      <div className="text-sm font-bold text-[#0284C7] mt-0.5">6m</div>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => navigate('/analytics/leads')}
                  className="text-xs font-bold text-[#0284C7] hover:text-[#0369A1] flex items-center gap-1.5 self-start"
                >
                  <span>View per agent</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="lg:col-span-8 p-5 rounded-2xl bg-white border border-[#E2EEF8] shadow-card">
                <WhatsAppInsightsLineChart />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* VIEW 2: PROFOLIO™ LISTING PERFORMANCE */}
      {/* ========================================================================= */}
      {activeDashboardTab === 'profolio_performance' && (
        <div className="space-y-6">
          {/* Top Banner: Seller Leads, Simplified */}
          <div className="p-6 rounded-2xl bg-gradient-to-r from-[#E0F2FE] via-white to-[#ECFEFF] border border-[#BAE6FD] shadow-card flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#06B6D4] to-[#0284C7] text-white flex items-center justify-center shrink-0 shadow-md shadow-cyan-500/25">
                <Building2 className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-sm font-extrabold text-[#0F172A] tracking-wider uppercase">
                  Seller Leads, Simplified
                </h3>
                <p className="text-xs text-[#64748B] mt-0.5">
                  Gain instant access to high-quality property leads submitted directly by owners in Ahmedabad & Dubai.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2.5 shrink-0">
              <button
                onClick={() => navigate('/leads')}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#0284C7] to-[#06B6D4] hover:from-[#0369A1] hover:to-[#0891B2] text-white text-xs font-bold shadow-md shadow-cyan-500/20 transition-all active:scale-98"
              >
                Explore Seller Leads
              </button>
              <button
                onClick={() => navigate('/knowledge-base')}
                className="px-4 py-2.5 rounded-xl bg-white border border-[#E2EEF8] text-[#0F172A] text-xs font-bold hover:bg-[#F0F7FD] transition-colors"
              >
                Learn more
              </button>
            </div>
          </div>

          {/* Greeting Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-2xl bg-white border border-[#E2EEF8] shadow-subtle text-xs font-semibold">
            <div className="text-[#0F172A] flex items-center gap-2">
              <span>👋 Good morning, White & Co / Fortiv Real Estate!</span>
            </div>
            <div className="flex items-center gap-3 text-[#64748B]">
              <span>Active Stories: <strong className="text-[#0F172A]">23</strong></span>
              <span>•</span>
              <span>Review Requests: <strong className="text-[#0F172A]">0</strong></span>
              <span>•</span>
              <button
                onClick={() => navigate('/campaigns')}
                className="text-xs font-bold text-[#0284C7] hover:underline"
              >
                + Add Story
              </button>
            </div>
          </div>

          {/* Listings Breakdown & Credit Wallet Row */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
            {/* Active Listings Card */}
            <div className="lg:col-span-7 p-6 rounded-2xl bg-white border border-[#E2EEF8] shadow-card space-y-4 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-[#E2EEF8]">
                  <div>
                    <span className="text-[11px] text-[#64748B] font-semibold block">Active Listings</span>
                    <div className="text-2xl font-extrabold text-[#0F172A] mt-0.5">8,035</div>
                  </div>

                  <div className="flex items-center gap-3 text-xs text-[#64748B] font-medium">
                    <span><strong className="text-[#0F172A]">3,865</strong> Rent</span>
                    <span>•</span>
                    <span><strong className="text-[#0F172A]">3,329</strong> Sale</span>
                    <span>•</span>
                    <span><strong className="text-[#0F172A]">841</strong> Off-Plan</span>
                  </div>
                </div>

                {/* Product Tiers */}
                <div className="pt-3">
                  <span className="text-[10px] font-bold text-[#94A3B8] uppercase tracking-wider block mb-2">
                    Listings Breakdown by Products
                  </span>
                  <div className="grid grid-cols-3 gap-3 text-center text-xs">
                    <div className="p-3 rounded-xl bg-[#F0F7FD] border border-[#E2EEF8] flex items-center justify-between px-3.5">
                      <span className="text-[10px] font-bold text-[#0284C7]">SIGNATURE</span>
                      <span className="font-extrabold text-[#0F172A]">131 &gt;</span>
                    </div>

                    <div className="p-3 rounded-xl bg-[#F0F7FD] border border-[#E2EEF8] flex items-center justify-between px-3.5">
                      <span className="text-[10px] font-bold text-[#0891B2]">HOT</span>
                      <span className="font-extrabold text-[#0F172A]">172 &gt;</span>
                    </div>

                    <div className="p-3 rounded-xl bg-[#F0F7FD] border border-[#E2EEF8] flex items-center justify-between px-3.5">
                      <span className="text-[10px] font-bold text-[#64748B]">BASIC</span>
                      <span className="font-extrabold text-[#0F172A]">7,731 &gt;</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => navigate('/properties')}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#0284C7] to-[#06B6D4] hover:from-[#0369A1] hover:to-[#0891B2] text-white text-xs font-bold shadow-md shadow-cyan-500/20 transition-all active:scale-98"
                >
                  + Add Property
                </button>
              </div>
            </div>

            {/* Wallet Balance Card */}
            <div className="lg:col-span-5 p-6 rounded-2xl bg-white border border-[#E2EEF8] shadow-card space-y-4 flex flex-col justify-between">
              <div>
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[11px] text-[#64748B] font-semibold block">Wallet Balance ℹ️</span>
                    <div className="text-2xl font-extrabold text-[#0F172A] mt-0.5 flex items-center gap-2">
                      <Wallet className="w-6 h-6 text-[#0284C7]" />
                      <span>307,272</span>
                    </div>
                  </div>

                  <button
                    onClick={() => navigate('/settings')}
                    className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#0284C7] to-[#06B6D4] hover:from-[#0369A1] hover:to-[#0891B2] text-white text-xs font-bold shadow-sm transition-all"
                  >
                    Top-up Credits
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs pt-2 border-t border-[#E2EEF8]">
                <button
                  onClick={() => navigate('/settings')}
                  className="p-2.5 rounded-xl bg-[#F0F7FD] text-[#475569] hover:text-[#0284C7] font-semibold text-center hover:bg-[#E0F2FE] transition-colors"
                >
                  Credits Calculator
                </button>
                <button
                  onClick={() => navigate('/settings')}
                  className="p-2.5 rounded-xl bg-[#F0F7FD] text-[#475569] hover:text-[#0284C7] font-semibold text-center hover:bg-[#E0F2FE] transition-colors"
                >
                  Credit Consumption
                </button>
              </div>
            </div>
          </div>

          {/* MAIN LISTING PERFORMANCE SECTION WITH CYAN SPLINE AREA CHART */}
          <div className="p-6 rounded-2xl bg-white border border-[#E2EEF8] shadow-card space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-[#E2EEF8]">
              <div>
                <h3 className="text-sm font-extrabold text-[#0F172A]">Listing Performance</h3>
                <p className="text-xs text-[#64748B]">Aug 17, 2026 – Sep 16, 2026</p>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex items-center p-1 rounded-xl bg-[#F0F7FD] border border-[#E2EEF8]">
                  <button
                    onClick={() => setPerformanceViewMode('daily')}
                    className={`px-3.5 py-1 text-xs font-bold rounded-lg transition-all ${
                      performanceViewMode === 'daily'
                        ? 'bg-white text-[#0284C7] shadow-sm'
                        : 'text-[#64748B] hover:text-[#0F172A]'
                    }`}
                  >
                    Daily
                  </button>
                  <button
                    onClick={() => setPerformanceViewMode('monthly')}
                    className={`px-3.5 py-1 text-xs font-bold rounded-lg transition-all ${
                      performanceViewMode === 'monthly'
                        ? 'bg-white text-[#0284C7] shadow-sm'
                        : 'text-[#64748B] hover:text-[#0F172A]'
                    }`}
                  >
                    Monthly
                  </button>
                </div>
              </div>
            </div>

            {/* 3 Top KPI Cards: Impressions (Cyan), Clicks, TruLeads */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4.5 rounded-2xl bg-gradient-to-br from-[#E0F2FE] to-[#ECFEFF] border border-[#BAE6FD] space-y-1 shadow-sm">
                <div className="flex items-center gap-1.5 text-xs font-bold text-[#0284C7]">
                  <Eye className="w-4 h-4" />
                  <span>Impressions</span>
                </div>
                <div className="text-2xl font-black text-[#0284C7] tracking-tight">13,786,944</div>
                <p className="text-[10px] text-[#0284C7]/80 font-semibold">Over 13.7M buyer views</p>
              </div>

              <div className="p-4.5 rounded-2xl bg-white border border-[#E2EEF8] space-y-1 shadow-sm">
                <div className="flex items-center gap-1.5 text-xs font-bold text-[#0F172A]">
                  <MousePointer className="w-4 h-4 text-[#06B6D4]" />
                  <span>Clicks</span>
                </div>
                <div className="text-2xl font-black text-[#0F172A] tracking-tight">534,450</div>
                <p className="text-[10px] text-[#64748B] font-medium">3.87% CTR</p>
              </div>

              <div className="p-4.5 rounded-2xl bg-white border border-[#E2EEF8] space-y-1 shadow-sm">
                <div className="flex items-center gap-1.5 text-xs font-bold text-[#0F172A]">
                  <PhoneCall className="w-4 h-4 text-[#0284C7]" />
                  <span>TruLeads™</span>
                </div>
                <div className="text-2xl font-black text-[#0F172A] tracking-tight">20,972</div>
                <p className="text-[10px] text-[#64748B] font-medium">Verified buyer inquiries</p>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs text-[#64748B]">
              <input
                type="checkbox"
                id="listingBreakdown"
                checked={showListingBreakdown}
                onChange={(e) => setShowListingBreakdown(e.target.checked)}
                className="rounded text-[#0284C7] focus:ring-[#0284C7]"
              />
              <label htmlFor="listingBreakdown" className="cursor-pointer font-medium">
                Show listing count breakdown
              </label>
            </div>

            {/* The Dynamic Cyan Spline Area Chart */}
            <div className="pt-2">
              <ProfolioListingPerformanceChart height={280} />
            </div>

            <div className="flex items-center justify-between text-[11px] text-[#94A3B8] pt-2 border-t border-[#E2EEF8] font-medium">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#00A3FF] shadow-cyan-glow" />
                <span>Impressions Velocity Curve</span>
              </div>
              <span>This data was last updated at 7:59 AM (GST).</span>
            </div>
          </div>

          {/* ProConnect™ Section */}
          <div className="p-6 rounded-2xl bg-white border border-[#E2EEF8] shadow-card space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#E2EEF8]">
              <div>
                <h3 className="text-sm font-extrabold text-[#0F172A]">ProConnect™ Matched Posts</h3>
                <p className="text-xs text-[#64748B]">Exclusively available on the Profolio™ App</p>
              </div>
              <span className="text-xs font-bold text-[#0284C7] bg-[#E0F2FE] px-3.5 py-1 rounded-full border border-[#BAE6FD]">
                19 Matched Posts
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4.5 rounded-2xl bg-[#F0F7FD] border border-[#E2EEF8] space-y-1.5 hover:border-[#BAE6FD] transition-colors">
                <div className="text-2xl font-black text-[#0284C7]">49</div>
                <div className="text-xs font-bold text-[#0F172A]">posts about Properties for Sale</div>
                <p className="text-[11px] text-[#64748B]">in Jumeirah Village Circle (JVC) / Satellite</p>
              </div>

              <div className="p-4.5 rounded-2xl bg-[#F0F7FD] border border-[#E2EEF8] space-y-1.5 hover:border-[#BAE6FD] transition-colors">
                <div className="text-2xl font-black text-[#06B6D4]">24</div>
                <div className="text-xs font-bold text-[#0F172A]">posts about Properties for Rent</div>
                <p className="text-[11px] text-[#64748B]">in Downtown Dubai / Bodakdev</p>
              </div>

              <div className="p-4.5 rounded-2xl bg-[#F0F7FD] border border-[#E2EEF8] space-y-1.5 hover:border-[#BAE6FD] transition-colors">
                <div className="text-2xl font-black text-[#0284C7]">27</div>
                <div className="text-xs font-bold text-[#0F172A]">posts about Properties for Rent</div>
                <p className="text-[11px] text-[#64748B]">in Business Bay / Prahlad Nagar</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
