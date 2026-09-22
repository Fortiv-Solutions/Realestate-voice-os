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
      <div className="w-full max-w-md bg-white rounded-2xl border border-[#E2EEF8] shadow-2xl overflow-hidden animate-in zoom-in-95">
        <div className="px-6 py-4 bg-[#F8FCFF] border-b border-[#E2EEF8] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#06B6D4] to-[#0284C7] text-white flex items-center justify-center shadow-xs">
              <Download className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-extrabold text-[#0F172A]">Export Analytics & CRM Data</h3>
              <p className="text-xs text-[#64748B]">Download verified reports for {dateRangeLabel}</p>
            </div>
          </div>
          <button
            onClick={closeExportModal}
            className="p-1.5 rounded-lg text-[#94A3B8] hover:text-[#0F172A] hover:bg-[#F0F7FD] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-6 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-[#0F172A] mb-1.5">Dataset</label>
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
                      ? 'bg-[#E0F2FE] border-[#BAE6FD] text-[#0284C7] shadow-xs'
                      : 'bg-[#F8FCFF] border-[#E2EEF8] text-[#64748B] hover:text-[#0F172A]'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#0F172A] mb-1.5">Format</label>
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
                      ? 'bg-[#E0F2FE] border-[#BAE6FD] text-[#0284C7] shadow-xs'
                      : 'bg-[#F8FCFF] border-[#E2EEF8] text-[#64748B] hover:text-[#0F172A]'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          <label className="flex items-center gap-2.5 p-3 rounded-xl bg-[#F8FCFF] border border-[#E2EEF8] cursor-pointer hover:bg-[#F0F7FD] transition-colors">
            <input
              type="checkbox"
              checked={includeTranscripts}
              onChange={(e) => setIncludeTranscripts(e.target.checked)}
              className="rounded text-[#0284C7] focus:ring-[#06B6D4]"
            />
            <span className="text-xs text-[#0F172A] font-medium">Include AI Conversation Transcripts & Intent Metadata</span>
          </label>

          <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-[#E2EEF8]">
            <button
              onClick={closeExportModal}
              className="px-4 py-2 rounded-xl border border-[#E2EEF8] text-xs font-semibold text-[#64748B] hover:text-[#0F172A] hover:bg-[#F0F7FD] transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleExport}
              disabled={isExporting}
              className="px-5 py-2 rounded-xl bg-gradient-to-r from-[#0284C7] to-[#06B6D4] hover:from-[#0369A1] hover:to-[#0891B2] text-white text-xs font-bold shadow-md shadow-cyan-500/20 transition-all flex items-center gap-1.5 active:scale-98"
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
