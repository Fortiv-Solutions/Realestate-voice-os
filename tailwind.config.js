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
          bg: '#F8FCFF',
          'bg-subtle': '#F0F7FD',
          card: '#FFFFFF',
          border: '#E2EEF8',
          'border-light': '#EDF5FB',
          'text-primary': '#0F172A',
          'text-secondary': '#475569',
          'text-muted': '#94A3B8',
          accent: '#0284C7',          // Electric Ocean Blue
          'accent-hover': '#0369A1',
          'accent-light': '#E0F2FE',
          'accent-subtle': '#F0F9FF',
          cyan: '#06B6D4',            // Electric Cyan
          'cyan-hover': '#0891B2',
          'cyan-light': '#ECFEFF',
          'cyan-subtle': '#F0FDFA',
          'cyan-glow': 'rgba(6, 182, 212, 0.4)',
          blue: '#0284C7',
          'blue-light': '#E0F2FE',
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
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica', 'Arial', 'sans-serif'],
      },
      boxShadow: {
        'subtle': '0 1px 3px rgba(15, 23, 42, 0.04), 0 1px 2px rgba(15, 23, 42, 0.02)',
        'card': '0 4px 12px -2px rgba(15, 23, 42, 0.05), 0 2px 6px -1px rgba(15, 23, 42, 0.02)',
        'dropdown': '0 12px 30px -4px rgba(15, 23, 42, 0.08), 0 4px 12px -2px rgba(15, 23, 42, 0.04)',
        'cyan-glow': '0 0 18px rgba(6, 182, 212, 0.35)',
        'blue-glow': '0 0 18px rgba(2, 132, 199, 0.35)',
      },
      borderRadius: {
        'card': '14px',
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
