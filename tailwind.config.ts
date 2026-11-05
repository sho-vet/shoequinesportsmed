import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Brand palette: pure white, deep black, corporate navy, soft clay accent.
        ink: "#0A0A0A",
        navy: {
          DEFAULT: "#0B1F3A",
          50: "#EEF1F5",
          100: "#D7DEE8",
          600: "#132C4D",
          700: "#0B1F3A",
          900: "#060F1D",
        },
        clay: {
          DEFAULT: "#C17A56",
          50: "#FBF2EC",
          600: "#A8623F",
        },
        line: "#E6E8EB",
      },
      fontFamily: {
        sans: ["Arial", "Helvetica Neue", "Helvetica", "system-ui", "sans-serif"],
      },
      boxShadow: {
        card: "0 1px 2px 0 rgba(10,10,10,0.04), 0 1px 1px 0 rgba(10,10,10,0.03)",
      },
      borderRadius: {
        card: "0.5rem",
      },
    },
  },
  plugins: [],
};

export default config;
