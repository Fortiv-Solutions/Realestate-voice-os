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
      <div className="w-full max-w-md bg-white rounded-2xl border border-[#ECEEF1] shadow-dropdown overflow-hidden animate-in zoom-in-95">
        <div className="px-6 py-4 bg-[#F8F9FA] border-b border-[#ECEEF1] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#2563EB] text-white flex items-center justify-center shadow-xs">
              <Clock className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-extrabold text-[#111827]">Schedule Human Specialist Handoff</h3>
              <p className="text-xs text-[#6B7280]">{selectedLeadForCallback.ownerName} • {selectedLeadForCallback.locality}</p>
            </div>
          </div>
          <button
            onClick={closeScheduleCallbackModal}
            className="p-1.5 rounded-lg text-[#9CA3AF] hover:text-[#111827] hover:bg-[#F4F5F7] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-[#111827] mb-1">Callback Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl bg-[#F8F9FA] border border-[#E5E7EB] text-xs font-medium text-[#111827] focus:outline-hidden focus:border-[#2563EB]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#111827] mb-1">Time Slot Window</label>
            <select
              value={timeSlot}
              onChange={(e) => setTimeSlot(e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl bg-[#F8F9FA] border border-[#E5E7EB] text-xs font-medium text-[#111827] focus:outline-hidden focus:border-[#2563EB]"
            >
              <option>10:00 AM - 12:00 PM (Morning before 2 PM)</option>
              <option>12:00 PM - 02:00 PM (Mid-day)</option>
              <option>04:00 PM - 06:00 PM (Afternoon / Evening)</option>
              <option>06:00 PM - 07:30 PM (Late Evening)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#111827] mb-1">Assigned Property Specialist</label>
            <select
              value={assignedSpecialist}
              onChange={(e) => setAssignedSpecialist(e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl bg-[#F8F9FA] border border-[#E5E7EB] text-xs font-medium text-[#111827] focus:outline-hidden focus:border-[#2563EB]"
            >
              <option>Vikram Joshi (Satellite & Prahlad Nagar Desk)</option>
              <option>Ananya Sharma (Bodakdev Luxury Portfolio)</option>
              <option>Suresh Parmar (Bopal & SG Highway Desk)</option>
              <option>Mitesh Vala (Commercial & Off-plan)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#111827] mb-1">Handoff Instructions / Notes</label>
            <textarea
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl bg-[#F8F9FA] border border-[#E5E7EB] text-xs font-medium text-[#111827] focus:outline-hidden focus:border-[#2563EB]"
            />
          </div>

          <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-[#ECEEF1]">
            <button
              type="button"
              onClick={closeScheduleCallbackModal}
              className="px-4 py-2 rounded-xl border border-[#E5E7EB] text-xs font-semibold text-[#6B7280] hover:text-[#111827] hover:bg-[#F4F5F7] transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-bold shadow-xs transition-all active:scale-98"
            >
              Confirm Schedule
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
