/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundColor: ["en", "ar"],
      textColor: ["en", "ar"],
      opacity: ["en", "ar"],
      borderColor: ["en", "ar"],
      borderWidth: ["en", "ar"],
      borderRadius: ["en", "ar"],
      boxShadow: ["en", "ar"],
      margin: ["en", "ar"],
      padding: ["en", "ar"],
      width: ["en", "ar"],
      height: ["en", "ar"],
      flex: ["en", "ar"],
      fontFamily: {
        "noto-arabic": ['"Noto Sans Arabic"', "sans-serif"],
        quran: ["quran"],
      },
    },
  },
  plugins: [
    function ({ addVariant }) {
      addVariant("en", "&.en");
      addVariant("ar", "&.ar");
    },
  ],
};
