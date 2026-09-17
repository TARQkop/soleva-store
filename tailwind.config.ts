import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      screens: {
        xs: '400px',
      },
      colors: {
        cream: '#F5F0E6',
        paper: '#FCFBF7',
        stone: '#E8E0D0',
        line: '#D6CBB3',
        ink: '#17160F',
        'ink-soft': '#524E3C',
        pine: {
          DEFAULT: '#22381F',
          dark: '#152710',
          light: '#3D5C33',
        },
        rust: {
          DEFAULT: '#A8481F',
          dark: '#7E351A',
          light: '#C97A4A',
        },
      },
      fontFamily: {
        display: ['"Fraunces"', 'ui-serif', 'Georgia', 'serif'],
        sans: ['"Inter"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      maxWidth: {
        content: '1440px',
      },
      boxShadow: {
        soft: '0 1px 2px rgba(28,27,23,0.06), 0 8px 24px rgba(28,27,23,0.06)',
        lift: '0 12px 32px rgba(28,27,23,0.14)',
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'slide-up': {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'hero-image-in': {
          '0%': { opacity: '0', transform: 'scale(1.08)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        'hero-shine': {
          '0%': { opacity: '0', transform: 'translateX(-120%)' },
          '35%': { opacity: '0.2' },
          '100%': { opacity: '0', transform: 'translateX(120%)' },
        },
        'slide-in-right': {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        'slide-in-left': {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        'toast-in': {
          '0%': { opacity: '0', transform: 'translateY(-8px) scale(0.98)' },
          '100%': { opacity: '1', transform: 'translateY(0) scale(1)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-400px 0' },
          '100%': { backgroundPosition: '400px 0' },
        },
        'bag-bounce': {
          '0%, 100%': { transform: 'scale(1)' },
          '30%': { transform: 'scale(1.25)' },
          '60%': { transform: 'scale(0.95)' },
        },
      },
      animation: {
        'fade-in': 'fade-in 0.5s ease forwards',
        'slide-up': 'slide-up 0.6s cubic-bezier(0.16,1,0.3,1) forwards',
        'hero-image-in': 'hero-image-in 1.2s cubic-bezier(0.16,1,0.3,1) forwards',
        'hero-shine': 'hero-shine 1.4s cubic-bezier(0.16,1,0.3,1) forwards',
        'slide-in-right': 'slide-in-right 0.35s cubic-bezier(0.16,1,0.3,1) forwards',
        'slide-in-left': 'slide-in-left 0.35s cubic-bezier(0.16,1,0.3,1) forwards',
        'toast-in': 'toast-in 0.25s ease forwards',
        shimmer: 'shimmer 1.6s infinite linear',
        'bag-bounce': 'bag-bounce 0.5s ease',
      },
    },
  },
  plugins: [],
} satisfies Config
