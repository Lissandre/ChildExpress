module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  mode: 'jit',
  theme: {
    height: (theme) => ({
      auto: 'auto',
      ...theme('spacing'),
      full: '100%',
      screen: 'calc(var(--vh, 1vh) * 100)',
    }),
    minHeight: (theme) => ({
      0: '0',
      ...theme('spacing'),
      full: '100%',
      screen: 'calc(var(--vh, 1vh) * 100)',
    }),
    maxHeight: (theme) => ({
      0: '0',
      ...theme('spacing'),
      full: '100%',
      screen: 'calc(var(--vh, 1vh) * 100)',
    }),
    colors: {
      blue: '#0F54E4',
      white: '#FFFFFF',
    },
    borderRadius: {
      DEFAULT: '80px',
    },
    boxShadow: {
      DEFAULT: '9px 25px 30px rgba(15, 84, 228, 0.38)',
      hoverState: '4px 15px 30px rgba(15, 84, 228, 0.38)',
    },
    extend: {
      animation: {
        'bounce-in': 'bounceIn 1s ease forwards',
        'bounce-out': 'bounceOut 1s ease forwards',
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
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
