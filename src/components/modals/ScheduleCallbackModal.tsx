import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { useToast } from '../../context/ToastContext';
import { leadService } from '../../services/leadService';
import { Calendar, Clock, User, X, Check } from 'lucide-react';

export const ScheduleCallbackModal: React.FC = () => {
  const { isScheduleCallbackOpen, closeScheduleCallbackModal, selectedLeadForCallback } = useApp();
  const { showToast } = useToast();

  const [date, setDate] = useState('2026-09-23');
  const [timeSlot, setTimeSlot] = useState('11:00 AM - 01:00 PM (Morning)');
  const [assignedSpecialist, setAssignedSpecialist] = useState('Vikram Joshi (Satellite Desk)');
  const [notes, setNotes] = useState('Follow up with 5-minute comparable sales update.');

  if (!isScheduleCallbackOpen || !selectedLeadForCallback) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    leadService.assignSpecialist(selectedLeadForCallback.id, assignedSpecialist);
    leadService.updateLeadStatus(selectedLeadForCallback.id, 'CALLBACK');

    showToast(
      'Callback Scheduled',
      `Assigned ${selectedLeadForCallback.ownerName} to ${assignedSpecialist} for ${date} (${timeSlot}).`,
      'success'
    );
    closeScheduleCallbackModal();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-in fade-in-50">
      <div className="w-full max-w-md bg-white rounded-2xl border border-[#E2EEF8] shadow-2xl overflow-hidden animate-in zoom-in-95">
        <div className="px-6 py-4 bg-[#F8FCFF] border-b border-[#E2EEF8] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#06B6D4] to-[#0284C7] text-white flex items-center justify-center shadow-xs">
              <Clock className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-extrabold text-[#0F172A]">Schedule Human Specialist Handoff</h3>
              <p className="text-xs text-[#64748B]">{selectedLeadForCallback.ownerName} • {selectedLeadForCallback.locality}</p>
            </div>
          </div>
          <button
            onClick={closeScheduleCallbackModal}
            className="p-1.5 rounded-lg text-[#94A3B8] hover:text-[#0F172A] hover:bg-[#F0F7FD] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-[#0F172A] mb-1">Callback Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl bg-[#F8FCFF] border border-[#E2EEF8] text-xs font-medium text-[#0F172A] focus:outline-hidden focus:border-[#0284C7]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#0F172A] mb-1">Time Slot Window</label>
            <select
              value={timeSlot}
              onChange={(e) => setTimeSlot(e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl bg-[#F8FCFF] border border-[#E2EEF8] text-xs font-medium text-[#0F172A] focus:outline-hidden focus:border-[#0284C7]"
            >
              <option>10:00 AM - 12:00 PM (Morning before 2 PM)</option>
              <option>12:00 PM - 02:00 PM (Mid-day)</option>
              <option>04:00 PM - 06:00 PM (Afternoon / Evening)</option>
              <option>06:00 PM - 07:30 PM (Late Evening)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#0F172A] mb-1">Assigned Property Specialist</label>
            <select
              value={assignedSpecialist}
              onChange={(e) => setAssignedSpecialist(e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl bg-[#F8FCFF] border border-[#E2EEF8] text-xs font-medium text-[#0F172A] focus:outline-hidden focus:border-[#0284C7]"
            >
              <option>Vikram Joshi (Satellite & Prahlad Nagar Desk)</option>
              <option>Ananya Sharma (Bodakdev Luxury Portfolio)</option>
              <option>Suresh Parmar (Bopal & SG Highway Desk)</option>
              <option>Mitesh Vala (Commercial & Off-plan)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#0F172A] mb-1">Handoff Instructions / Notes</label>
            <textarea
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl bg-[#F8FCFF] border border-[#E2EEF8] text-xs font-medium text-[#0F172A] focus:outline-hidden focus:border-[#0284C7]"
            />
          </div>

          <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-[#E2EEF8]">
            <button
              type="button"
              onClick={closeScheduleCallbackModal}
              className="px-4 py-2 rounded-xl border border-[#E2EEF8] text-xs font-semibold text-[#64748B] hover:text-[#0F172A] hover:bg-[#F0F7FD] transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-gradient-to-r from-[#0284C7] to-[#06B6D4] hover:from-[#0369A1] hover:to-[#0891B2] text-white text-xs font-bold shadow-md shadow-cyan-500/20 transition-all active:scale-98"
            >
              Confirm Schedule
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
