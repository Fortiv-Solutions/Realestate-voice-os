import React, { useState } from 'react';
import { useToast } from '../context/ToastContext';
import { BookOpen, Plus, Search, FileText, CheckCircle2, Building2 } from 'lucide-react';

export const KnowledgeBasePage: React.FC = () => {
  const { showToast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');

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

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-base font-extrabold text-[#0F172A]">AI Knowledge Base & Guidelines</h2>
          <p className="text-xs text-[#64748B]">Market documents, pricing registries and objection handling guidelines for AI voice models</p>
        </div>

        <button
          onClick={() => showToast('Upload Document', 'Knowledge ingestion modal opened.', 'info')}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-[#0284C7] to-[#06B6D4] hover:from-[#0369A1] hover:to-[#0891B2] text-white text-xs font-bold shadow-md shadow-cyan-500/20 transition-all active:scale-98"
        >
          <Plus className="w-4 h-4" />
          <span>Upload Document</span>
        </button>
      </div>

      <div className="p-3.5 rounded-2xl bg-white border border-[#E2EEF8] shadow-card">
        <div className="relative w-full sm:w-80">
          <Search className="w-3.5 h-3.5 text-[#94A3B8] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search knowledge documents..."
            className="w-full pl-9 pr-3.5 py-1.5 rounded-xl bg-[#F8FCFF] border border-[#E2EEF8] text-xs font-medium text-[#0F172A] focus:outline-hidden focus:border-[#0284C7]"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {documents.map((doc) => (
          <div key={doc.id} className="p-5 rounded-2xl bg-white border border-[#E2EEF8] hover:border-[#BAE6FD] hover:shadow-cyan-glow/20 shadow-card transition-all space-y-3">
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-[#E0F2FE] text-[#0284C7] flex items-center justify-center border border-[#BAE6FD]">
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
  );
};
