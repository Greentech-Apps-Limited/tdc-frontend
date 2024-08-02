import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";

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
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "announce-hide": {
          from: { height: "40px" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "announce-hide": "announce-hide 0.2s ease-out",
      },
      colors: {
      },
      dropShadow: {
        DEFAULT: '0px 1px 3px 0px #0000001A',
      },
      maxWidth: {
        '4xl': '54.5rem',
        '8xl': '82.5rem',
        '9xl': '97.5rem',
      }
    },
  },
  plugins: [tailwindcssAnimate],
} satisfies Config

export default config


