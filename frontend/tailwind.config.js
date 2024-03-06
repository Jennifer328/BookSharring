/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    //add the styles to overwrite tailwind styles
    container: { padding: "2rem" },
  },
  plugins: [],
};
