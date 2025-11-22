/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#CAEB66",
        secondary: "#606060",
      },
    },
  },
  plugins: [require("daisyui")],
};
