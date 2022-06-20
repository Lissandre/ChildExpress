module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  mode: 'jit',
  theme: {
    colors: {
      blue: '#0F54E4',
      black: '#000000',
      green: '#61E4B4',
      grey: '#8998A8',
      greyblue: '#BECEE1',
      pink: '#E893AD',
      white: '#FFFFFF',
    },
    borderRadius: {
      DEFAULT: '80px',
      sm: '0.375rem',
      md: '30px',
      lg: '60px',
      full: '9999px',
    },
    boxShadow: {
      DEFAULT: '9px 25px 30px rgba(15, 84, 228, 0.38)',
      hoverState: '4px 15px 30px rgba(15, 84, 228, 0.38)',
      hoverStateNone: 'none',
      hoverStateWhite: '4px 15px 30px white',
    },
    extend: {
      animation: {
        'bounce-in': 'bounceIn 1s ease forwards',
        'bounce-out': 'bounceOut 1s ease forwards',
        unblur: 'unBlur 1s ease forwards',
        progressbargrow: 'progressBarGrow 8s ease forwards',
        linegrow: 'lineGrow 0.8s ease forwards',
        fromright: 'fromRight 1.5s ease forwards',
        fromrightpayement: 'fromRightPayement 2.5s ease forwards',
        fromleft: 'fromLeft 1.5s ease forwards',
        slideup: 'slideUp 1.5s ease forwards',
        opacityfadein: 'opacityFadeIn 1.5s ease forwards',
        opacityfadeout: 'opacityFadeOut 1.5s ease forwards',
        revealtext: 'revealText 1.5s cubic-bezier(0.7, 0, 0.3, 1) forwards',
        'dollar-opacity': 'dollarOpacity 0.5s ease forwards',
        'fade-up-out': 'fadeUpOut 0.5s ease forwards',
        'fade-up-in': 'fadeUpIn 0.5s ease forwards',
        'fade-up-in2': 'fadeUpIn2 0.5s ease forwards',
        'fade-up-in3': 'fadeUpIn3 0.5s ease forwards',
        'scale-up': 'scaleUp 6s ease forwards',
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
          '70%': {
            width: '100%',
            opacity: 1,
          },
          '90%': {
            width: '100%',
          },
        },
        lineGrow: {
          '0%': {
            width: '0',
          },
          '100%': {
            width: '100px',
          },
        },
        fromRight: {
          '0%': {
            right: '-800px',
          },
          '100%': {
            right: '-50px',
          },
        },
        fromRightPayement: {
          '0%': {
            right: '-80%',
          },
          '100%': {
            right: '-15%',
          },
        },
        fromLeft: {
          '0%': {
            left: '-50%',
          },
          '100%': {
            left: '20%',
          },
        },
        slideUp: {
          '0%': {
            transform: 'translate3d(0, 0, 0)',
          },
          '100%': {
            transform: 'translate3d(0, -100%, 0)',
          },
        },
        opacityFadeIn: {
          '0%': {
            opacity: 0,
          },
          '100%': {
            opacity: 1,
          },
        },
        opacityFadeOut: {
          '0%': {
            opacity: 1,
          },
          '100%': {
            opacity: 0,
          },
        },
        revealText: {
          '0%': {
            opacity: 0,
            transform: 'translate(0%, 100%) matrix(1, 0, 0, 1, 0, 0)',
          },
          '100%': {
            opacity: 1,
            transform: 'translate(0%, 0%) matrix(1, 0, 0, 1, 0, 0)',
          },
        },
        dollarOpacity: {
          '0%': {
            opacity: 0,
          },
          '33%': {
            opacity: 1,
          },
          '66%': {
            opacity: 0,
          },
          '100%': {
            opacity: 1,
          },
        },
        fadeUpOut: {
          '0%': {
            opacity: 1,
            left: '-0px',
            top: '-0px',
          },
          '100%': {
            opacity: 0,
            left: '-25px',
            top: '-25px',
          },
        },
        fadeUpIn: {
          '0%': {
            opacity: 0,
            left: '75px',
            top: '75px',
          },
          '100%': {
            opacity: 1,
            left: '50px',
            top: '50px',
          },
        },
        fadeUpIn2: {
          '0%': {
            left: '50px',
            top: '50px',
          },
          '100%': {
            left: '25px',
            top: '25px',
          },
        },
        fadeUpIn3: {
          '0%': {
            left: '25px',
            top: '25px',
          },
          '100%': {
            left: '0px',
            top: '0px',
          },
        },
        pinkRectangle1: {
          '0%': {
            width: '0',
            height: '0',
          },
          '100%': {
            width: '584',
            height: '100',
          },
        },
        pinkRectangle2: {
          '0%': {
            transform: 'rotate3d(0, 0, 1, 0)',
          },
          '100%': {
            transform: 'rotate3d(0, 0, 1, -2.6deg)',
          },
        },
        greenRectangle1: {
          '0%': {
            width: '0',
            height: '0',
          },
          '100%': {
            width: '584',
            height: '100',
          },
        },
        greenRectangle2: {
          '0%': {
            transform: 'rotate3d(0, 0, 1, 0)',
          },
          '100%': {
            transform: 'rotate3d(0, 0, 1, -2.6deg)',
          },
        },
        scaleUp: {
          '0%': {
            transform: 'scale3d(0, 0, 0)',
          },
          '10%': {
            transform: 'scale3d(1, 1, 1)',
          },
          '90%': {
            transform: 'scale3d(1, 1, 1)',
          },
          '100%': {
            transform: 'scale3d(0, 0, 0)',
          },
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
