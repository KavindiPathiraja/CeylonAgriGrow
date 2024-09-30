/** @type {import('tailwindcss').Config} */

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': 'rgb(10, 70, 66)'
      },
      fontFamily: {
        'Carnero': ['Carnero', 'sans-serif']
      },
      backgroundImage: {
        'addCropBG': "url('public/bg.jpg')",
        'allCropBG': "url('public/allCrop.jpg')",
      }
    },
  },
  plugins: [],
}

