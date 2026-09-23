import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { useToast } from '../../context/ToastContext';
import { Download, X, FileSpreadsheet, Check } from 'lucide-react';

export const ExportModal: React.FC = () => {
  const { isExportOpen, closeExportModal, dateRangeLabel } = useApp();
  const { showToast } = useToast();
  const [exportType, setExportType] = useState<'calls' | 'leads' | 'properties'>('calls');
  const [fileFormat, setFileFormat] = useState<'csv' | 'xlsx' | 'json'>('csv');
  const [includeTranscripts, setIncludeTranscripts] = useState(true);
  const [isExporting, setIsExporting] = useState(false);

  if (!isExportOpen) return null;

  const handleExport = () => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      showToast(
        'Export Generated',
        `Exported ${exportType.toUpperCase()} dataset (${fileFormat.toUpperCase()}) for ${dateRangeLabel}.`,
        'success'
      );
      closeExportModal();
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-in fade-in-50">
      <div className="w-full max-w-md bg-white rounded-2xl border border-[#ECEEF1] shadow-dropdown overflow-hidden animate-in zoom-in-95">
        <div className="px-6 py-4 bg-[#F8F9FA] border-b border-[#ECEEF1] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#2563EB] text-white flex items-center justify-center shadow-xs">
              <Download className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-extrabold text-[#111827]">Export Analytics & CRM Data</h3>
              <p className="text-xs text-[#6B7280]">Download verified reports for {dateRangeLabel}</p>
            </div>
          </div>
          <button
            onClick={closeExportModal}
            className="p-1.5 rounded-lg text-[#9CA3AF] hover:text-[#111827] hover:bg-[#F4F5F7] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-6 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-[#111827] mb-1.5">Dataset</label>
            <div className="grid grid-cols-3 gap-2">
              {(
                [
                  { id: 'calls', label: 'Call Records' },
                  { id: 'leads', label: 'Qualified Leads' },
                  { id: 'properties', label: 'Properties' },
                ] as const
              ).map((t) => (
                <button
                  key={t.id}
                  onClick={() => setExportType(t.id)}
                  className={`p-2.5 rounded-xl text-xs font-bold border transition-all text-center ${
                    exportType === t.id
                      ? 'bg-[#EFF6FF] border-[#BFDBFE] text-[#2563EB] shadow-xs'
                      : 'bg-[#F8F9FA] border-[#ECEEF1] text-[#6B7280] hover:text-[#111827]'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#111827] mb-1.5">Format</label>
            <div className="grid grid-cols-3 gap-2">
              {(
                [
                  { id: 'csv', label: 'CSV (.csv)' },
                  { id: 'xlsx', label: 'Excel (.xlsx)' },
                  { id: 'json', label: 'JSON (.json)' },
                ] as const
              ).map((f) => (
                <button
                  key={f.id}
                  onClick={() => setFileFormat(f.id)}
                  className={`p-2.5 rounded-xl text-xs font-bold border transition-all text-center ${
                    fileFormat === f.id
                      ? 'bg-[#EFF6FF] border-[#BFDBFE] text-[#2563EB] shadow-xs'
                      : 'bg-[#F8F9FA] border-[#ECEEF1] text-[#6B7280] hover:text-[#111827]'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          <label className="flex items-center gap-2.5 p-3 rounded-xl bg-[#F8F9FA] border border-[#ECEEF1] cursor-pointer hover:bg-[#F4F5F7] transition-colors">
            <input
              type="checkbox"
              checked={includeTranscripts}
              onChange={(e) => setIncludeTranscripts(e.target.checked)}
              className="rounded text-[#2563EB] focus:ring-[#2563EB]"
            />
            <span className="text-xs text-[#111827] font-medium">Include AI Conversation Transcripts & Intent Metadata</span>
          </label>

          <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-[#ECEEF1]">
            <button
              onClick={closeExportModal}
              className="px-4 py-2 rounded-xl border border-[#E5E7EB] text-xs font-semibold text-[#6B7280] hover:text-[#111827] hover:bg-[#F4F5F7] transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleExport}
              disabled={isExporting}
              className="px-5 py-2 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-bold shadow-xs transition-all flex items-center gap-1.5 active:scale-98"
            >
              {isExporting ? <span className="animate-spin">⏳</span> : <FileSpreadsheet className="w-3.5 h-3.5" />}
              <span>{isExporting ? 'Generating...' : 'Download File'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
