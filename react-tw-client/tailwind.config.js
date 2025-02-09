/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        hbf: ['"HBF"', "sans-serif"],
        inter: ['"Inter"', "sans-serif"],
      },

      colors: {
        mainBackground: "#212121",
        secondBackground: "#323232",
        textPrimary: "#F7FAFC",
        textSecondary: "#CBD5E0",
        navbarBackground: "#171717",
        navbarBackground2: "#262626",
        navbarTextTitle: "#F0F0F0",
        navbarTextBody: "#EDEDED",
        navbarIcons: "#A4A4A4",

        // Elements
        background: "#16161a",      // Dark background
        button: "#7f5af0",          // Vibrant purple for buttons
        buttonText: "#fffffe",      // White for button text
        headline: "#fffffe",        // White for headlines
        paragraph: "#94a1b2",       // Muted blue-gray for paragraphs
    
        // Illustration
        stroke: "#010101",          // Deep black for strokes
        main: "#fffffe",            // White for main elements
        highlight: "#7f5af0",       // Purple highlight
        secondary: "#72757e",       // Subtle gray-purple secondary tone
        tertiary: "#2cb67d",        // Bright green for tertiary elements
      
      }

 
    },
  },
  plugins: [],
}

