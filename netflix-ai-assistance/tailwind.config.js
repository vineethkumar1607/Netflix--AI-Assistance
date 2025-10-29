import { defineConfig } from 'tailwindcss';
import scrollbarHide from 'tailwind-scrollbar-hide';

export default defineConfig({
  plugins: [
    scrollbarHide,
    './node_modules/flowbite/**/*.js'
  ],
  plugins: [
    require('flowbite/plugin')
  ]
});