import {nextui} from '@nextui-org/theme'

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)"],
        mono: ["var(--font-geist-mono)"],
      },
      colors:{
        forrestGreen: "#013132",
        cultured:'#F4F7FA',
        gold:'#C18729'
      }
    },
  },
  darkMode: "class",
  plugins: [nextui({
    prefix: "nextui", // prefix for themes variables
    defaultTheme: "light", // default theme from the themes object
    defaultExtendTheme: "light", // default theme to extend on custom themes
    layout: {}, // common layout tokens (applied to all themes)
    themes: {
      light: {
        colors: {
          background: "#F4F7FA", // or DEFAULT
          foreground: "#11181C", // or 50 to 900 DEFAULT
          primary: {
            //... 50 to 900
            foreground: "#F4F7FA",
            DEFAULT: "#006FEE",
          },
          // ... rest of the colors
        },
      },
      dark: {
        colors: {
          background: "#013132", // or DEFAULT
          foreground: "#ECEDEE", // or 50 to 900 DEFAULT
          primary: {
            //... 50 to 900
            foreground: "#F4F7FA",
            DEFAULT: "#006FEE",
          },
        },
        // ... rest of the colors
      },
    },
  })],
}
