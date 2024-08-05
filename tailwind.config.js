/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#000000",
        secondary: {
          blue: "#377DFF",
          green: "#38CB89",
          orange: "#FFAB00",
          red: "#FF5630",
        },
        "neutral-1": "#FEFEFE",
        "neutral-2": "#F3F5F7",
        "neutral-3": "#E8ECEF",
        "neutral-4": "#6C7275",
        "neutral-5": "#343839",
        "neutral-6": "#232627",
        "neutral-7": "#141718",
      },
    },
  },
  plugins: [],
};
