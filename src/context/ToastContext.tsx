import React, { createContext, useContext, useState, ReactNode } from 'react';

export type ToastType = 'success' | 'warning' | 'danger' | 'info';

export interface Toast {
  id: string;
  title: string;
  message?: string;
  type: ToastType;
}

interface ToastContextType {
  toasts: Toast[];
  showToast: (title: string, message?: string, type?: ToastType) => void;
  removeToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = (title: string, message?: string, type: ToastType = 'success') => {
    const id = `toast-${Date.now()}-${Math.random()}`;
    const newToast: Toast = { id, title, message, type };
    setToasts(prev => [...prev, newToast]);

    setTimeout(() => {
      removeToast(id);
    }, 4500);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  return (
    <ToastContext.Provider value={{ toasts, showToast, removeToast }}>
      {children}
      {/* Toast Notification Container */}
      <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2.5 max-w-md w-full pointer-events-none">
        {toasts.map(toast => {
          const isSuccess = toast.type === 'success';
          const isDanger = toast.type === 'danger';
          const isWarning = toast.type === 'warning';

          return (
            <div
              key={toast.id}
              className={`pointer-events-auto flex items-start justify-between p-4 rounded-2xl border shadow-dropdown backdrop-blur-md transition-all duration-300 animate-slide-in-right bg-white ${
                isSuccess
                  ? 'border-[#10B981]/30 text-[#111827]'
                  : isDanger
                  ? 'border-[#EF4444]/30 text-[#111827]'
                  : isWarning
                  ? 'border-[#F59E0B]/30 text-[#111827]'
                  : 'border-[#BFDBFE] text-[#111827]'
              }`}
            >
              <div className="flex items-start gap-3">
                <div
                  className={`mt-1 w-2.5 h-2.5 rounded-full shrink-0 ${
                    isSuccess
                      ? 'bg-[#10B981] shadow-xs'
                      : isDanger
                      ? 'bg-[#EF4444] shadow-xs'
                      : isWarning
                      ? 'bg-[#F59E0B] shadow-xs'
                      : 'bg-[#2563EB] shadow-xs'
                  }`}
                />
                <div>
                  <h4 className="text-xs font-bold text-[#111827] leading-snug">{toast.title}</h4>
                  {toast.message && (
                    <p className="text-xs text-[#6B7280] mt-0.5 leading-relaxed font-medium">{toast.message}</p>
                  )}
                </div>
              </div>
              <button
                onClick={() => removeToast(toast.id)}
                className="text-[#9CA3AF] hover:text-[#111827] text-xs font-bold ml-3 px-1.5 py-0.5 rounded-md hover:bg-[#F4F5F7] transition-colors"
              >
                ✕
              </button>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = (): ToastContextType => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};
