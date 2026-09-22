import React, { useState } from 'react';
import { useToast } from '../context/ToastContext';
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
  BarChart2,
  FileCheck2,
  BookOpen,
  Search,
  Plus,
  FileText,
  Clock,
  Zap,
  Activity,
  CheckCircle
} from 'lucide-react';

export const AIIntelligencePage: React.FC<{ initialSubTab?: 'intelligence' | 'evals' | 'knowledge_base' }> = ({
  initialSubTab = 'intelligence',
}) => {
  const { showToast } = useToast();
  const [subTab, setSubTab] = useState<'intelligence' | 'evals' | 'knowledge_base'>(initialSubTab);
  const [searchQuery, setSearchQuery] = useState('');

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

  const evalTestSuites = [
    {
      id: 'eval-1',
      title: 'Zero-Hallucination Pricing Guardrail',
      category: 'Safety & Compliance',
      passRate: '100%',
      testsRun: 450,
      status: 'Passed',
      description: 'Ensures voice agent never fabricates unverified registry rates and redirects pricing queries to area specialist.',
      latency: '340ms',
    },
    {
      id: 'eval-2',
      title: 'Instant DNC Blacklist Opt-Out Detection',
      category: 'Regulatory',
      passRate: '100%',
      testsRun: 280,
      status: 'Passed',
      description: 'Verifies instantaneous recognition of opt-out phrases, immediate caller termination, and CRM blacklist synchronization.',
      latency: '180ms',
    },
    {
      id: 'eval-3',
      title: 'Caller Source Objection Handling (RERA Database)',
      category: 'Objection Handling',
      passRate: '98.4%',
      testsRun: 620,
      status: 'Passed',
      description: 'Evaluates prompt fidelity when challenged regarding number source, citing verified public RERA registry databases.',
      latency: '390ms',
    },
    {
      id: 'eval-4',
      title: 'BHK & Locality Entity Disambiguation',
      category: 'ASR & Entity Parsing',
      passRate: '97.8%',
      testsRun: 850,
      status: 'Passed',
      description: 'Checks speech-to-text accuracy across Gujarati and Indian English accents for Ahmedabad locality names.',
      latency: '240ms',
    },
  ];

  const documents = [
    {
      id: 'kb-1',
      title: 'Satellite & Prahlad Nagar Sub-Market Registry Valuation Guide (Q3 2026)',
      category: 'Pricing Guide',
      snippet: 'Average 3 BHK registry rates: ₹1.25 Cr - ₹1.45 Cr. High-end gated communities command 12% premium.',
      updatedAt: 'Sep 20, 2026',
    },
    {
      id: 'kb-2',
      title: 'Bodakdev & Thaltej Standalone Plot & Bungalow Benchmarks',
      category: 'Luxury Inventory',
      snippet: '500-1000 sq yd plots trading between ₹4.5 Cr - ₹7.0 Cr based on road width and zoning permissions.',
      updatedAt: 'Sep 18, 2026',
    },
    {
      id: 'kb-3',
      title: 'Standard RERA Regulatory & DNC Compliance Directives',
      category: 'Compliance',
      snippet: 'Strict rules on immediate caller removal and transparent disclosure of agency license.',
      updatedAt: 'Sep 15, 2026',
    },
    {
      id: 'kb-4',
      title: 'Objection Handling Playbook: Overcoming Number Origin & Pricing Hesitation',
      category: 'Objection Handling',
      snippet: 'Proven scripts for deflecting unverified price speculation to verified 5-minute specialist comps.',
      updatedAt: 'Sep 21, 2026',
    },
  ];

  const filteredDocs = documents.filter(
    (d) =>
      d.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.snippet.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-base font-extrabold text-[#0F172A]">AI Intelligence & Knowledge Center</h2>
          <p className="text-xs text-[#64748B]">Real-time conversational intelligence, automated evaluations, and RAG knowledge playbooks</p>
        </div>

        {subTab === 'knowledge_base' && (
          <button
            onClick={() => showToast('Upload Document', 'Knowledge ingestion modal opened.', 'info')}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-[#0284C7] to-[#06B6D4] hover:from-[#0369A1] hover:to-[#0891B2] text-white text-xs font-bold shadow-md shadow-cyan-500/20 transition-all active:scale-98"
          >
            <Plus className="w-4 h-4" />
            <span>Upload Document</span>
          </button>
        )}
      </div>

      {/* Sub-tabs Navigation */}
      <div className="flex items-center gap-1 p-1 rounded-2xl bg-white border border-[#E2EEF8] shadow-card overflow-x-auto">
        {(
          [
            { id: 'intelligence', label: 'Conversation Intelligence', icon: BrainCircuit },
            { id: 'evals', label: 'AI Evaluations', icon: FileCheck2 },
            { id: 'knowledge_base', label: 'Knowledge Base', icon: BookOpen },
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

      {/* ========================================================================= */}
      {/* SUB-TAB 1: CONVERSATION INTELLIGENCE */}
      {/* ========================================================================= */}
      {subTab === 'intelligence' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
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
                <div
                  key={idx}
                  className="p-3.5 rounded-xl bg-[#F8FCFF] border border-[#E2EEF8] hover:border-[#BAE6FD] hover:shadow-cyan-glow/15 transition-all space-y-2"
                >
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
      )}

      {/* ========================================================================= */}
      {/* SUB-TAB 2: AI EVALUATIONS */}
      {/* ========================================================================= */}
      {subTab === 'evals' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <MetricCard title="Safety Compliance Score" value="99.8%" change="+0.4%" />
            <MetricCard title="Hallucination Defense" value="100%" change="0.0%" changeType="positive" />
            <MetricCard title="Avg Voice Latency" value="760ms" change="-45ms" changeType="positive" />
            <MetricCard title="Total Evals Run" value="2,200" change="+18.5%" />
          </div>

          <div className="p-6 rounded-2xl bg-white border border-[#E2EEF8] shadow-card space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#E2EEF8]">
              <div>
                <h3 className="text-sm font-extrabold text-[#0F172A]">Automated Model Evaluation Suites</h3>
                <p className="text-xs text-[#64748B]">Continuous regression testing and zero-hallucination guardrail benchmarks</p>
              </div>
              <button
                onClick={() => showToast('Test Suite Triggered', 'Running 500 automated conversational scenarios...', 'info')}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#E0F2FE] hover:bg-[#BAE6FD] text-[#0284C7] text-xs font-bold transition-colors"
              >
                <Zap className="w-3.5 h-3.5" />
                <span>Run Full Eval Suite</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {evalTestSuites.map((suite) => (
                <div
                  key={suite.id}
                  className="p-4 rounded-xl bg-[#F8FCFF] border border-[#E2EEF8] hover:border-[#BAE6FD] hover:shadow-cyan-glow/15 transition-all space-y-3"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h4 className="text-xs font-bold text-[#0F172A] leading-snug">{suite.title}</h4>
                      <span className="text-[10px] text-[#0284C7] font-semibold">{suite.category}</span>
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#ECFEFF] text-[#0891B2] border border-[#A5F3FC]">
                      {suite.passRate} Pass
                    </span>
                  </div>

                  <p className="text-xs text-[#64748B] leading-relaxed">{suite.description}</p>

                  <div className="flex items-center justify-between text-[10px] text-[#64748B] pt-2 border-t border-[#E2EEF8]">
                    <span>Tests Run: <strong className="text-[#0F172A]">{suite.testsRun}</strong></span>
                    <span>Avg Turn Latency: <strong className="text-[#0284C7]">{suite.latency}</strong></span>
                    <span className="flex items-center gap-1 text-[#10B981] font-bold">
                      <CheckCircle className="w-3 h-3" />
                      <span>{suite.status}</span>
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SUB-TAB 3: KNOWLEDGE BASE */}
      {/* ========================================================================= */}
      {subTab === 'knowledge_base' && (
        <div className="space-y-6">
          <div className="p-3.5 rounded-2xl bg-white border border-[#E2EEF8] shadow-card">
            <div className="relative w-full sm:w-80">
              <Search className="w-3.5 h-3.5 text-[#94A3B8] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search knowledge documents, playbooks & pricing..."
                className="w-full pl-9 pr-3.5 py-1.5 rounded-xl bg-[#F8FCFF] border border-[#E2EEF8] text-xs font-medium text-[#0F172A] focus:outline-hidden focus:border-[#0284C7]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {filteredDocs.map((doc) => (
              <div
                key={doc.id}
                className="p-5 rounded-2xl bg-white border border-[#E2EEF8] hover:border-[#BAE6FD] hover:shadow-cyan-glow/20 shadow-card transition-all space-y-3"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-[#E0F2FE] text-[#0284C7] flex items-center justify-center border border-[#BAE6FD] shrink-0">
                      <FileText className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="text-xs font-bold text-[#0F172A] leading-snug">{doc.title}</h3>
                      <span className="text-[10px] text-[#0284C7] font-semibold">{doc.category}</span>
                    </div>
                  </div>
                </div>

                <p className="text-xs text-[#64748B] leading-relaxed">{doc.snippet}</p>

                <div className="flex items-center justify-between text-[11px] text-[#94A3B8] pt-2 border-t border-[#E2EEF8]">
                  <span>Updated: {doc.updatedAt}</span>
                  <span className="text-[#10B981] font-semibold flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>Indexed in Vector DB</span>
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
