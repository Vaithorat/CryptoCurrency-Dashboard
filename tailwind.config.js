/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    screens: {
      'xs': {'min': '0px', 'max': '639px'},
      'sm': {'min': '640px', 'max': '767px'},
      'md': {'min': '768px', 'max': '1023px'},
      // 'lg': "1024px",
      'lg': {'min': '1024px', 'max': '1280px'},
      'xl': "1280px",
      "2xl": "1536px",
      "3xl": "2000px",
    },
  },
  plugins: [require("flowbite/plugin")],
};
