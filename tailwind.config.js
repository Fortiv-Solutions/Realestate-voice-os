/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        fortiv: {
          bg: '#F8F9FA',
          'bg-subtle': '#F4F5F7',
          card: '#FFFFFF',
          border: '#ECEEF1',
          'border-light': '#F0F2F5',
          'text-primary': '#111827',
          'text-secondary': '#6B7280',
          'text-muted': '#9CA3AF',
          accent: '#2563EB',          // Cobalt Blue
          'accent-hover': '#1D4ED8',
          'accent-light': '#EFF6FF',
          'accent-subtle': '#DBEAFE',
          cyan: '#06B6D4',
          'cyan-hover': '#0891B2',
          'cyan-light': '#ECFEFF',
          'cyan-subtle': '#F0FDFA',
          'cyan-glow': 'rgba(37, 99, 235, 0.25)',
          blue: '#2563EB',
          'blue-light': '#EFF6FF',
          sky: '#38BDF8',
          'sky-light': '#F0F9FF',
          success: '#10B981',
          'success-light': '#ECFDF5',
          warning: '#F59E0B',
          'warning-light': '#FFFBEB',
          danger: '#EF4444',
          'danger-light': '#FEF2F2',
          purple: '#6366F1',
          'purple-light': '#EEF2FF'
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica', 'Arial', 'sans-serif'],
      },
      boxShadow: {
        'subtle': '0 1px 2px rgba(0, 0, 0, 0.03)',
        'card': '0 1px 3px rgba(0, 0, 0, 0.03), 0 2px 8px rgba(0, 0, 0, 0.02)',
        'card-hover': '0 4px 20px -2px rgba(0, 0, 0, 0.06)',
        'dropdown': '0 10px 25px -3px rgba(0, 0, 0, 0.07), 0 4px 6px -2px rgba(0, 0, 0, 0.03)',
        'blue-glow': '0 0 16px rgba(37, 99, 235, 0.25)',
      },
      borderRadius: {
        'card': '16px',
        '2xl': '16px',
        '3xl': '20px',
      },
      spacing: {
        '4.5': '1.125rem',
      },
      animation: {
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow-cyan': 'glowCyan 2.5s ease-in-out infinite alternate',
      },
      keyframes: {
        glowCyan: {
          '0%': { boxShadow: '0 0 8px rgba(6, 182, 212, 0.2)' },
          '100%': { boxShadow: '0 0 20px rgba(6, 182, 212, 0.5)' },
        }
      }
    },
  },
  plugins: [],
}
