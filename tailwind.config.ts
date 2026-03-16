import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./main/**/*.{js,ts,jsx,tsx,mdx}",
    "./System/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          navy: "#0a1628",
          blue: "#1d4ed8",
        },
      },
    },
  },
  plugins: [],
};

export default config;
