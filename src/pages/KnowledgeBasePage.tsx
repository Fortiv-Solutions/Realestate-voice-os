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
          <h2 className="text-base font-extrabold text-[#111827]">AI Knowledge Base & Guidelines</h2>
          <p className="text-xs text-[#6B7280]">Market documents, pricing registries and objection handling guidelines for AI voice models</p>
        </div>

        <button
          onClick={() => showToast('Upload Document', 'Knowledge ingestion modal opened.', 'info')}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-bold shadow-xs transition-all active:scale-98"
        >
          <Plus className="w-4 h-4" />
          <span>Upload Document</span>
        </button>
      </div>

      <div className="p-3.5 rounded-2xl bg-white border border-[#ECEEF1] shadow-xs">
        <div className="relative w-full sm:w-80">
          <Search className="w-3.5 h-3.5 text-[#9CA3AF] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search knowledge documents..."
            className="w-full pl-9 pr-3.5 py-1.5 rounded-xl bg-[#F8F9FA] border border-[#E5E7EB] text-xs font-medium text-[#111827] focus:outline-hidden focus:border-[#2563EB]"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {documents.map((doc) => (
          <div key={doc.id} className="p-5 rounded-2xl bg-white border border-[#ECEEF1] hover:border-[#BFDBFE] hover:shadow-subtle shadow-xs transition-all space-y-3">
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-[#EFF6FF] text-[#2563EB] flex items-center justify-center border border-[#BFDBFE]">
                  <FileText className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-[#111827] leading-snug">{doc.title}</h3>
                  <span className="text-[10px] text-[#2563EB] font-semibold">{doc.category}</span>
                </div>
              </div>
            </div>

            <p className="text-xs text-[#6B7280] leading-relaxed">{doc.snippet}</p>

            <div className="flex items-center justify-between text-[11px] text-[#9CA3AF] pt-2 border-t border-[#ECEEF1]">
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
