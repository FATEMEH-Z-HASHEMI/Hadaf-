/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",

     // Or if using `src` directory:
     "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bgColor : "#f6f6f6",
        activeColor : "#01a219",
        notActiveColor : "#c20404",
      }
    },
  },
  plugins: [],
}

