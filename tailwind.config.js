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
    screens: {
      'xs': {'min': '150px', 'max': '300px'},
      // => @media (min-width: 150px and max-width: 300px) { ... }

      'sp': '300px',
      // => @media (min-width: 300px) { ... }

      'sm': '480px',
      // => @media (min-width: 640px) { ... }

      'md': '768px',
      // => @media (min-width: 768px) { ... }

      'lg': '1024px',
      // => @media (min-width: 1024px) { ... }

      'xl': '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... }

      '3xl': '1920px',
      // => @media (min-width: 1920px) { ... }
    },
  },
  plugins: [require('@tailwindcss/forms')],
}

