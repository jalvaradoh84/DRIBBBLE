/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./index.html"
  ],
  darkMode: 'class',
  theme: {
    extend: {
      screens: {
        'xs': '480px',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 3s ease-in-out infinite',
        'slide-up': 'slideUp 0.3s ease-out',
        'slide-down': 'slideDown 0.3s ease-out',
        'fade-in': 'fadeIn 0.3s ease-out',
        'fade-out': 'fadeOut 0.3s ease-out',
        'shimmer': 'shimmer 2s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeOut: {
          '0%': { opacity: '1' },
          '100%': { opacity: '0' },
        },
        shimmer: {
          '0%': {
            'background-position': '-1000px 0',
          },
          '100%': {
            'background-position': '1000px 0',
          },
        },
      },
      backgroundImage: {
        'skeleton-gradient': 'linear-gradient(90deg, #f8f7f4 0%, #e7e7e9 50%, #f8f7f4 100%)',
      },
      transitionDelay: {
        '0': '0ms',
        '100': '100ms',
        '200': '200ms',
        '300': '300ms',
        '400': '400ms',
        '500': '500ms',
      },
    },
  },
  plugins: [
    function({ addUtilities, theme }) {
      const utilities = {
        '.scrollbar-hide': {
          '-ms-overflow-style': 'none',
          'scrollbar-width': 'none',
          '&::-webkit-scrollbar': {
            display: 'none'
          }
        },
        '.hover-lift': {
          'transition': 'transform 0.2s ease-out',
          '&:hover': {
            'transform': 'translateY(-2px)'
          }
        },
        '.hover-glow': {
          'transition': 'box-shadow 0.2s ease-out',
          '&:hover': {
            'box-shadow': '0 0 20px rgba(234, 76, 137, 0.2)'
          }
        },
        '.skeleton': {
          'background-size': '1000px 100%',
          'background-image': theme('backgroundImage.skeleton-gradient'),
          'animation': theme('animation.shimmer'),
        }
      };

      // Add animation delay utilities
      const animationDelays = theme('transitionDelay');
      Object.entries(animationDelays).forEach(([key, value]) => {
        utilities[`.animation-delay-${key}`] = {
          'animation-delay': value
        };
      });

      addUtilities(utilities);
    }
  ],
}
