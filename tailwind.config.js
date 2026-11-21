/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        paper: {
          DEFAULT: '#f5f3ed',
          card: '#faf8f2',
          surface: '#fdfcf9',
          dark: '#e8e5db',
        },
        ink: {
          DEFAULT: '#181511',
          light: '#524d44',
          muted: '#8f887a',
          faint: '#d1cbc0',
        },
        crayon: {
          yellow: '#f7c948',
          yellowLight: '#fdedaf',
          pink: '#ff4d8d',
          pinkSoft: '#ffc6da',
          blue: '#2b57d6',
          cyan: '#99b6ff',
          mint: '#9de5c1',
          orange: '#ff6a35',
          purple: '#b39ddb',
          tan: '#eddcb5',
        }
      },
      fontFamily: {
        sans: ['"Space Grotesk"', 'sans-serif'],
        handwriting: ['"Caveat"', '"Kalam"', 'cursive'],
        mono: ['"Space Mono"', 'monospace'],
      },
      boxShadow: {
        'brutal-sm': '2px 2px 0px #181511',
        'brutal': '4px 4px 0px #181511',
        'brutal-md': '6px 6px 0px #181511',
        'brutal-lg': '8px 8px 0px #181511',
        'brutal-xl': '12px 12px 0px #181511',
        'paper': '0 2px 6px rgba(24, 21, 17, 0.05), 0 10px 24px rgba(24, 21, 17, 0.07)',
        'polaroid': '0 4px 14px rgba(24, 21, 17, 0.12), 2px 8px 20px rgba(24, 21, 17, 0.08)',
        'tape': '0 1px 3px rgba(24, 21, 17, 0.16)',
      },
      keyframes: {
        wobble: {
          '0%, 100%': { transform: 'rotate(0deg)' },
          '25%': { transform: 'rotate(-1.5deg)' },
          '75%': { transform: 'rotate(1.5deg)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        spinSlow: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        }
      },
      animation: {
        wobble: 'wobble 0.6s ease-in-out',
        float: 'float 4s ease-in-out infinite',
        'spin-slow': 'spinSlow 20s linear infinite',
      }
    },
  },
  plugins: [],
}

