const { spacing, fontFamily } = require('tailwindcss/defaultTheme')

module.exports = {
  content: [
    './pages/**/*.tsx',
    './components/**/*.tsx',
    './layouts/**/*.tsx',
    './templates/**/*.tsx',
    './contexts/**/*.tsx',
    './icons/**/*.tsx'
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['IBM Plex Sans', ...fontFamily.sans]
      },
      colors: {
        gray: {
          0: '#fff',
          100: '#fafafa',
          150: '#f5f5f5',
          200: '#eaeaea',
          250: '#e5e5e5',
          300: '#999999',
          400: '#888888',
          500: '#666666',
          600: '#444444',
          700: '#333333',
          800: '#222222',
          900: '#111111'
        },

        slate1: 'hsl(206, 30.0%, 98.8%)',
        slate2: 'hsl(210, 16.7%, 97.6%)',
        slate3: 'hsl(209, 13.3%, 95.3%)',
        slate4: 'hsl(209, 12.2%, 93.2%)',
        slate5: 'hsl(208, 11.7%, 91.1%)',
        slate6: 'hsl(208, 11.3%, 88.9%)',
        slate7: 'hsl(207, 11.1%, 85.9%)',
        slate8: 'hsl(205, 10.7%, 78.0%)',
        slate9: 'hsl(206, 6.0%, 56.1%)',
        slate10: 'hsl(206, 5.8%, 52.3%)',
        slate11: 'hsl(206, 6.0%, 43.5%)',
        slate12: 'hsl(206, 24.0%, 9.0%)',

        slateDark1: 'hsl(200, 7.0%, 8.8%)',
        slateDark2: 'hsl(195, 7.1%, 11.0%)',
        slateDark3: 'hsl(197, 6.8%, 13.6%)',
        slateDark4: 'hsl(198, 6.6%, 15.8%)',
        slateDark5: 'hsl(199, 6.4%, 17.9%)',
        slateDark6: 'hsl(201, 6.2%, 20.5%)',
        slateDark7: 'hsl(203, 6.0%, 24.3%)',
        slateDark8: 'hsl(207, 5.6%, 31.6%)',
        slateDark9: 'hsl(206, 6.0%, 43.9%)',
        slateDark10: 'hsl(206, 5.2%, 49.5%)',
        slateDark11: 'hsl(206, 6.0%, 63.0%)',
        slateDark12: 'hsl(210, 6.0%, 93.0%)',

        mauve1: 'hsl(300, 20.0%, 99.0%)',
        mauve2: 'hsl(300, 7.7%, 97.5%)',
        mauve3: 'hsl(294, 5.5%, 95.3%)',
        mauve4: 'hsl(289, 4.7%, 93.3%)',
        mauve5: 'hsl(283, 4.4%, 91.3%)',
        mauve6: 'hsl(278, 4.1%, 89.1%)',
        mauve7: 'hsl(271, 3.9%, 86.3%)',
        mauve8: 'hsl(255, 3.7%, 78.8%)',
        mauve9: 'hsl(252, 4.0%, 57.3%)',
        mauve10: 'hsl(253, 3.5%, 53.5%)',
        mauve11: 'hsl(252, 4.0%, 44.8%)',
        mauve12: 'hsl(260, 25.0%, 11.0%)',

        mauveDark1: 'hsl(246, 6.0%, 9.0%)',
        mauveDark2: 'hsl(240, 5.1%, 11.6%)',
        mauveDark3: 'hsl(241, 5.0%, 14.3%)',
        mauveDark4: 'hsl(242, 4.9%, 16.5%)',
        mauveDark5: 'hsl(243, 4.9%, 18.8%)',
        mauveDark6: 'hsl(244, 4.9%, 21.5%)',
        mauveDark7: 'hsl(245, 4.9%, 25.4%)',
        mauveDark8: 'hsl(247, 4.8%, 32.5%)',
        mauveDark9: 'hsl(252, 4.0%, 45.2%)',
        mauveDark10: 'hsl(247, 3.4%, 50.7%)',
        mauveDark11: 'hsl(253, 4.0%, 63.7%)',
        mauveDark12: 'hsl(256, 6.0%, 93.2%)',

        blue1: 'hsl(206, 100%, 99.2%)',
        blue2: 'hsl(210, 100%, 98.0%)',
        blue3: 'hsl(209, 100%, 96.5%)',
        blue4: 'hsl(210, 98.8%, 94.0%)',
        blue5: 'hsl(209, 95.0%, 90.1%)',
        blue6: 'hsl(209, 81.2%, 84.5%)',
        blue7: 'hsl(208, 77.5%, 76.9%)',
        blue8: 'hsl(206, 81.9%, 65.3%)',
        blue9: 'hsl(206, 100%, 50.0%)',
        blue10: 'hsl(208, 100%, 47.3%)',
        blue11: 'hsl(211, 100%, 43.2%)',
        blue12: 'hsl(211, 100%, 15.0%)',

        blueDark1: 'hsl(212, 35.0%, 9.2%)',
        blueDark2: 'hsl(216, 50.0%, 11.8%)',
        blueDark3: 'hsl(214, 59.4%, 15.3%)',
        blueDark4: 'hsl(214, 65.8%, 17.9%)',
        blueDark5: 'hsl(213, 71.2%, 20.2%)',
        blueDark6: 'hsl(212, 77.4%, 23.1%)',
        blueDark7: 'hsl(211, 85.1%, 27.4%)',
        blueDark8: 'hsl(211, 89.7%, 34.1%)',
        blueDark9: 'hsl(206, 100%, 50.0%)',
        blueDark10: 'hsl(209, 100%, 60.6%)',
        blueDark11: 'hsl(210, 100%, 66.1%)',
        blueDark12: 'hsl(206, 98.0%, 95.8%)',

        violet1: 'hsl(255, 65.0%, 99.4%)',
        violet2: 'hsl(252, 100%, 99.0%)',
        violet3: 'hsl(252, 96.9%, 97.4%)',
        violet4: 'hsl(252, 91.5%, 95.5%)',
        violet5: 'hsl(252, 85.1%, 93.0%)',
        violet6: 'hsl(252, 77.8%, 89.4%)',
        violet7: 'hsl(252, 71.0%, 83.7%)',
        violet8: 'hsl(252, 68.6%, 76.3%)',
        violet9: 'hsl(252, 56.0%, 57.5%)',
        violet10: 'hsl(251, 48.1%, 53.5%)',
        violet11: 'hsl(250, 43.0%, 48.0%)',
        violet12: 'hsl(254, 60.0%, 18.5%)',

        violetDark1: 'hsl(250, 20.0%, 10.2%)',
        violetDark2: 'hsl(255, 30.3%, 12.9%)',
        violetDark3: 'hsl(253, 37.0%, 18.4%)',
        violetDark4: 'hsl(252, 40.1%, 22.5%)',
        violetDark5: 'hsl(252, 42.2%, 26.2%)',
        violetDark6: 'hsl(251, 44.3%, 31.1%)',
        violetDark7: 'hsl(250, 46.8%, 38.9%)',
        violetDark8: 'hsl(250, 51.8%, 51.2%)',
        violetDark9: 'hsl(252, 56.0%, 57.5%)',
        violetDark10: 'hsl(251, 63.2%, 63.2%)',
        violetDark11: 'hsl(250, 95.0%, 76.8%)',
        violetDark12: 'hsl(252, 87.0%, 96.4%)',

        violetA5: 'hsla(252, 99.0%, 45.7%, 0.130)',
        violetDarkA5: 'hsla(252, 99.7%, 66.4%, 0.286)'
      },
      keyframes: {
        overlayShow: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        contentShow: {
          '0%': { opacity: '0', transform: 'translate(-50%, -48%) scale(.96)' },
          '100%': { opacity: '1', transform: 'translate(-50%, -50%) scale(1)' }
        },
        dropdownMenuShow: {
          '0%': { transform: 'scale(0.5)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' }
        }
      },
      animation: {
        overlayShow: 'overlayShow 200ms cubic-bezier(0.16, 1, 0.3, 1)',
        contentShow: 'contentShow 200ms cubic-bezier(0.16, 1, 0.3, 1)',
        dropdownMenuShow: 'dropdownMenuShow 200ms cubic-bezier(0.2, 0, 0.13, 1.5);'
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme('colors.slate12'),
            a: {
              color: theme('colors.blue.500'),
              '&:hover': {
                color: theme('colors.blue.700')
              },
              code: { color: theme('colors.blue.400') }
            },
            'h2,h3,h4': {
              'scroll-margin-top': spacing[32]
            },
            thead: {
              borderBottomColor: theme('colors.gray.200')
            },
            code: { color: theme('colors.pink.500') },
            'blockquote p:first-of-type::before': false,
            'blockquote p:last-of-type::after': false
          }
        },
        dark: {
          css: {
            color: theme('colors.slateDark12'),
            a: {
              color: theme('colors.blue.400'),
              '&:hover': {
                color: theme('colors.blue.600')
              },
              code: { color: theme('colors.blue.400') }
            },
            blockquote: {
              borderLeftColor: theme('colors.gray.700'),
              color: theme('colors.gray.300')
            },
            'h2,h3,h4': {
              color: theme('colors.slateDark12'),
              'scroll-margin-top': spacing[32]
            },
            hr: { borderColor: theme('colors.slateDark6') },
            ol: {
              li: {
                '&:before': { color: theme('colors.gray.500') }
              }
            },
            ul: {
              li: {
                '&:before': { backgroundColor: theme('colors.gray.500') }
              }
            },
            strong: { color: theme('colors.gray.100') },
            thead: {
              color: theme('colors.gray.100'),
              borderBottomColor: theme('colors.gray.600')
            },
            tbody: {
              tr: {
                borderBottomColor: theme('colors.gray.700')
              }
            }
          }
        }
      })
    }
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/line-clamp')
  ],
  variants: {
    typography: ['dark'],
    extend: {
      backgroundColor: ['disabled'],
      cursor: ['disabled'],
      opacity: ['disabled']
    }
  }
}
