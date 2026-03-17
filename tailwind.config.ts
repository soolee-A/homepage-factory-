import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,tsx,mdx}",
    "./components/**/*.{js,ts,tsx,mdx}",
    "./app/**/*.{js,ts,tsx,mdx}",
    "./System/**/*.{js,ts,tsx,mdx}",
    "./main/**/*.{js,ts,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: { DEFAULT: "#0F172A", light: "#1E293B" },
        royal: "#2563EB",
        kvibe: "#CD2E3A",
        premium: "#F8FAFC",
      },
      borderRadius: {
        "4xl": "2.5rem",
        "5xl": "3rem",
      },
      animation: {
        "fade-in-up": "fadeInUp 0.6s ease forwards",
        float: "float 6s ease-in-out infinite",
        "pulse-slow": "pulse 3s ease-in-out infinite",
      },
      keyframes: {
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
