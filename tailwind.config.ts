import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      primary: "#cb82ff",
      secondary: "#ffc2fa",
      accent: "#ff0496",
      text: "#fbf6e6",
      bg: "#201f1d",
    },
    extend: {},
  },
  plugins: [],
};
export default config;
