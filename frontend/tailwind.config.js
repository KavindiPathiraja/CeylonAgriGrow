/** @type {import('tailwindcss').Config} */

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': 'rgb(10, 70, 66)',
        'secondary': 'rgb(139, 160, 128)'
      },
      fontFamily: {
        'Carnero': ['Carnero', 'sans-serif'],
        'Playwrite': ['Playwrite', 'sans-serif'],
        'Pacifico': ['Pacifico', 'sans-serif']
      },
      backgroundImage: {
        'addCropBG': "url('public/bg.jpg')",
        'allCropBG': "url('public/allCrop.jpg')",
        'homepage': "url('public/home1.jpg')",
        'homepage2': "url('public/home2.jpg')",
        'aboutus': "url('public/aboutus.jpg')",
        'img2': "url('public/img2.jpg')"
      }
    },
    boxShadow: {
      'custom-bottom': '0px 50px 110px -15px brown',
      'bottom-soft': '-15px 14px 33px 8px #663333',
    },
  },
  plugins: [],
}

