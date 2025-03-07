/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#3B82F6",
        secondary: "#10B981",
        background: "#F3F4F6",
        card: "#FFFFFF",
        text: "#1F2937",
        error: "#EF4444",
      },
    },
  },
  plugins: [],
};
