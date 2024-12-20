import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";
import { fontFamily } from "tailwindcss/defaultTheme"

const config = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        source_sans_3: ['var(--font-source_sans_3)', ...fontFamily.sans],
        hidayatullah_demo: ['var(--font-hidayatullah-demo)', ...fontFamily.mono],
        lateef: ['var(--font-lateef)'],
        amiri: ['var(--font-amiri)', ...fontFamily.mono],
        qalam: ['var(--font-qalam)', ...fontFamily.mono],
        meQuran: ['var(--font-meQuran)', ...fontFamily.mono],
        kfgqpc_hafs: ['var(--font-kfgqpc_hafs)', ...fontFamily.mono],
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '10%, 20%, 30%, 40%, 50%, 60%, 70%, 80%, 90%': { transform: 'translateX(-2px)' },
          '15%, 25%, 35%, 45%, 55%, 65%, 75%, 85%, 95%': { transform: 'translateX(2px)' },
        },
        heartFall: {
          '0%': { transform: 'translateY(0) scale(1)', opacity: '1' },
          '100%': { transform: 'translateY(35vh) scale(0.5)', opacity: '0' },
        },
        slideInStaggered: {
          '0%': { transform: 'translateY(1rem)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        }
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        shake: 'shake 0.3s cubic-bezier(.36,.07,.19,.97) both',
        'heart-fall': 'heartFall 1s ease-in forwards',
        slideInStaggered: 'slideInStaggered 0.5s ease-out forwards',
        fadeIn: 'fadeIn 1s ease-in-out',
      },
      colors: {
        neutral: {
          DEFAULT: '#FFFFFF',
          50: '#FAF6F5',
          100: '#F9F5F1',
          200: '#EDE9E5',
          300: '#E1DCD8',
          400: '#B2A59A',
          500: '#85776A',
          600: '#66574A',
          700: '#50473E',
          800: '#393028',
          900: '#241D18',
          950: '#000000',
        },
        brown: {
          DEFAULT: '',
          100: '#FCF8F3',
          300: '#D1A461',
          500: '#A27B3F',
          600: '#6E4302',
        },
        green: {
          DEFAULT: '#F0FDF4',
          100: '#DCFCE7',
          300: '#86EFAC',
          400: '#4ADE80',
          500: '#479E64',
          700: "#15803D"
        },
        red: {
          500: "#BD544C"
        },
        teal: {
          500: "#1B8885",
          700: '#026E68'
        },
        purple: {
          500: "#736CCD"
        }
      },
      dropShadow: {
        DEFAULT: '0px 1px 3px 0px #0000001A',
        "sm": " 0px 3px 10px 0px rgba(0, 0, 0, 0.06)"
      },
      maxWidth: {
        '4xl': '54.5rem',
        '8xl': '82.5rem',
        '9xl': '97.5rem',
      },
      borderRadius: {
        '4xl': '32px',
      }
    },
  },
  plugins: [tailwindcssAnimate],
} satisfies Config

export default config


