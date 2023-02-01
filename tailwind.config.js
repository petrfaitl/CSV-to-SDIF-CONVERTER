/** @type {import('tailwindcss').Config} */
const FormKitVariants = require('@formkit/themes/tailwindcss');
module.exports = {
  // content: [
  //   './components/**/*.{html,vue,js}',
  //   './pages/**/*.vue',
  //   './app.vue',
  //   './formkit.config.{js,mjs,ts}',
  //   './node_modules/@formkit/themes/dist/tailwindcss/genesis/index.cjs'
  // ],
  css: ["~/assets/css/tailwind.css"], theme: {

    fontFamily: {
      sans: ['Montserrat', 'sans'],
    }, extend: {
      colors: {
        'primary': '#00aec7',
      },
      backgroundImage:{
        'header-image': 'url("~/assets/images/swimming-image.jpg")',
        'footer-image': 'url("~/assets/images/liz-long-swim-cap.jpg")'
      },
    },
  }, plugins: [FormKitVariants],

}
