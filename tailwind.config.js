module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  mode: 'jit',
  theme: {
    colors: {
      blue: '#0F54E4',
      greyblue: '#BECEE1',
      white: '#FFFFFF',
      pink: '#E893AD',
    },
    borderRadius: {
      DEFAULT: '80px',
      md: '0.375rem',
      full: '9999px',
    },
    boxShadow: {
      DEFAULT: '9px 25px 30px rgba(15, 84, 228, 0.38)',
      hoverState: '4px 15px 30px rgba(15, 84, 228, 0.38)',
      hoverStateWhite: '4px 15px 30px white',
    },
    extend: {
      animation: {
        'bounce-in': 'bounceIn 1s ease forwards',
        'bounce-out': 'bounceOut 1s ease forwards',
        'unblur': 'unBlur 1s ease forwards',
        'progressbargrow': 'progressBarGrow 8s ease forwards',
        'linegrow': 'lineGrow 0.8s ease forwards',
        'fromright': 'fromRight 1.5s ease forwards',
        'fromrightpayement': 'fromRightPayement 2.5s ease forwards',
        'fromleft': 'fromLeft 1.5s ease forwards',
        'slideup': 'slideUp 1.5s ease forwards'
      },
      keyframes: {
        bounceIn: {
          '0%': {
            opacity: 0,
            transform: 'scale3d(0.3, 0.3, 0.3)',
          },
          '25%': {
            opacity: 1,
            transform: 'scale3d(0.95, 0.95, 0.95)',
          },
          '50%': { transform: 'scale3d(0.8, 0.8, 0.8)' },
          '100%': { opacity: 1, transform: 'scale3d(0.9, 0.9, 0.9)' },
        },
        bounceOut: {
          '0%': {
            transform: 'scale3d(0.9, 0.9, 0.9)',
            opacity: 1,
          },
          '25%': {
            transform: 'scale3d(0.85, 0.85, 0.85)',
            opacity: 1,
          },
          '50%': {
            opacity: 1,
            transform: 'scale3d(1, 1, 1)',
          },
          '100%': {
            opacity: 0,
            transform: 'scale3d(0.3, 0.3, 0.3)',
          },
        },
        unBlur: {
          '0%': {
            transform: 'scale3d(0.9, 0.9, 0.9)',
            opacity: 1,
          },
          '100%': {
            transform: 'scale3d(0.9, 0.9, 0.9)',
            transform: 'scale3d(1, 1, 1)',
            opacity: 1,
          },
        },
        progressBarGrow: {
          '0%': {
            width: '0%',
            opacity: 1,
          },
          '100%': {
            width: '100%',
            opacity: 1,
          },
        },
        lineGrow: {
          '0%': {
            width: '0',
          },
          '100%': {
            width: '100px',
          }
        },
        fromRight: {
          '0%': {
            right: '-800px',
          },
          '100%': {
            right: '-50px',
          }
        },
        fromRightPayement: {
          '0%': {
            right: '-80%',
          },
          '100%': {
            right: '-15%',
          }
        },
        fromLeft: {
          '0%': {
            left: '-50%',
          },
          '100%': {
            left: '20%',
          }
        },
        slideUp: {
          '0%': {
            transform: 'translate3d(0, 0, 0)',
          },
          '100%': {
            transform: 'translate3d(0, -100%, 0)',
          }
        }
      }

    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
