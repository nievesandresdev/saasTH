module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],  
  theme: {
    extend: {
      colors: {
        black: '#333333',
        'shadow-border': 'rgba(0, 0, 0, 0.08)', // Ajusta el color según tus necesidades
      },
      boxShadow: {
          'outline-34A98F': '0 0 0 1px #34A98F, 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)', // Agregando sombra exterior similar a shadow-md
      },
      maxHeight: {
      '32': '8rem', // Ajusta esto según tus necesidades
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
}

