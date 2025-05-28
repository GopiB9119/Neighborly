import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: "var(--primary)",
        "primary-dark": "var(--primary-dark)",
        secondary: "var(--secondary)",
        accent: "var(--accent)",
        border: "var(--border)",
        "card-bg": "var(--card-bg)",
        "card-border": "var(--card-border)",
      },
      keyframes: {
        heartbeat: {
          '0%, 100%': { transform: 'scale(1)', opacity: '1' },
          '50%': { transform: 'scale(1.4)', opacity: '0.6' },
        },
        colorCycle: {
          '0%, 100%': { color: '#26890d' },      // green
          '50%': { color: '#000000' },           // black
        },
      },
      animation: {
        heartbeat: 'heartbeat 1.2s infinite',
        colorCycle: 'colorCycle 3.6s infinite',
        heartbeatColorCycle: 'heartbeat 1.2s infinite, colorCycle 3.6s infinite',
      },
    },
  
  },
  plugins: [],
} satisfies Config;
