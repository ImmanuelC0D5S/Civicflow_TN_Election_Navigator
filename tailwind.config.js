/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#FFC107', // Neon Saffron
          light: '#FFD54F',
          dark: '#FFA000',
        },
        secondary: {
          DEFAULT: '#00F5D4', // Electric Teal
          light: '#64FFDA',
          dark: '#00BFA5',
        },
        background: '#121414', // Deep Charcoal
        surface: {
          low: '#161818',
          DEFAULT: '#1E2020', // Glass Base
          high: '#282A2B',
          higher: '#333535',
        },
        text: {
          primary: '#FFFFFF',
          secondary: '#C0C0C0',
          muted: '#9C8F78',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
      },
      backdropBlur: {
        xs: '2px',
        glass: '20px',
        'glass-lg': '40px',
      },
      boxShadow: {
        'neon-saffron': '0 0 20px rgba(255, 193, 7, 0.15)',
        'neon-teal': '0 0 20px rgba(0, 245, 212, 0.15)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.5s ease-out forwards',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow-saffron': 'glowSaffron 2s ease-in-out infinite alternate',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        glowSaffron: {
          '0%': { boxShadow: '0 0 5px rgba(255, 193, 7, 0.2)' },
          '100%': { boxShadow: '0 0 20px rgba(255, 193, 7, 0.4)' },
        }
      }
    },
  },
  plugins: [],
}
