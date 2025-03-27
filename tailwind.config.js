/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx,html}',
    './src/usecases/shared/styles/*.css',
  ],
  theme: {
    extend: {
      borderRadius: {
        4: '4px',
        6: '6px',
      },
      fontFamily: {
        sans: ['Noto Sans JP', 'sans-serif'],
      },
    },
  },
  plugins: [require('@digital-go-jp/tailwind-theme-plugin')],
}
