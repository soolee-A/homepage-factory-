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
        wtoko: {
          blue: "#1E3A8A",
          orange: "#F97316",
        }
      },
      animation: {
        "fade-in-up": "fadeInUp 0.5s ease-out forwards",
      },
      keyframes: {
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
