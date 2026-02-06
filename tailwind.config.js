/** @type {import('tailwindcss').Config} */
import defaultTheme from 'tailwindcss/defaultTheme';

export default {
  darkMode: ["class"],
  safelist: ["rounded-xl", "rounded-2xl", "rounded-3xl"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      fontSize: {
        'display-xl': ['var(--fs-display-xl)', { lineHeight: 'var(--lh-display-xl)', fontWeight: '600' }],
        'display-lg': ['var(--fs-display-lg)', { lineHeight: 'var(--lh-display-lg)', fontWeight: '600' }],
        'heading-xl': ['var(--fs-heading-xl)', { lineHeight: 'var(--lh-heading-xl)', fontWeight: '600' }],
        'heading-lg': ['var(--fs-heading-lg)', { lineHeight: 'var(--lh-heading-lg)', fontWeight: '600' }],
        'heading-md': ['var(--fs-heading-md)', { lineHeight: 'var(--lh-heading-md)', fontWeight: '600' }],
        'heading-sm': ['var(--fs-heading-sm)', { lineHeight: 'var(--lh-heading-sm)', fontWeight: '600' }],
        'body-lg': ['var(--fs-body-lg)', { lineHeight: 'var(--lh-body-lg)', fontWeight: '400' }],
        'body-md': ['var(--fs-body-md)', { lineHeight: 'var(--lh-body-md)', fontWeight: '400' }],
        'body-sm': ['var(--fs-body-sm)', { lineHeight: 'var(--lh-body-sm)', fontWeight: '400' }],
        'label-md': ['var(--fs-label-md)', { lineHeight: 'var(--lh-label-md)', fontWeight: '600' }],
        'label-sm': ['var(--fs-label-sm)', { lineHeight: 'var(--lh-label-sm)', fontWeight: '600' }],
        'caption': ['var(--fs-caption)', { lineHeight: 'var(--lh-caption)', fontWeight: '400' }],
        'micro': ['var(--fs-micro)', { lineHeight: 'var(--lh-micro)', fontWeight: '400' }],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        pretendard: ['"Pretendard Variable"', 'Pretendard', ...defaultTheme.fontFamily.sans],
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
        "shake": {
          "0%, 100%": { transform: "rotate(0deg) scale(1.1)" },
          "25%": { transform: "rotate(-10deg) scale(1.1)" },
          "75%": { transform: "rotate(10deg) scale(1.1)" },
        },
        "bubble": {
          "0%": { transform: "translateY(0) scale(0.5)", opacity: "0" },
          "50%": { opacity: "1" },
          "100%": { transform: "translateY(-16px) scale(1)", opacity: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "shake": "shake 0.5s ease-in-out infinite",
        "bubble": "bubble 1s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("tw-animate-css/dist/plugin")],
}