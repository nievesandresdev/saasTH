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

      '1xl': '1438px',

      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... }

      '3xl': '1920px',
      // => @media (min-width: 1920px) { ... }
    },
    // Opcional: Define el estilo de foco para ser específicamente nada en todo
    outline: {
      none: ['2px solid transparent', '2px'],
    },
    ringWidth: {
      default: '0px',  // Establece el ancho del anillo de foco a 0 por defecto
    },
  },
  variants: {
    extend: {
      borderColor: ['focus-visible'], // Sólo aplica cambios de color en focus-visible
      ringWidth: ['focus-visible'], // Controla la visibilidad del anillo solo con focus-visible
      outline: ['focus-visible'],
    },
  },
  plugins: [
    // require('@tailwindcss/forms'),
    // require('daisyui'),
  ],
}

