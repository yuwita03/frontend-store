/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Canvas
        'canvas-night': '#000000',
        'canvas-night-elevated': '#0a0a0a',
        'canvas-light': '#ffffff',
        'canvas-green': '#00ff0d',
        'canvas-cream': '#fbfbf5',
        'surface-dark': '#1e2c31',

        // Shades
        'shade-30': '#d4d4d8',
        'shade-40': '#a1a1aa',
        'shade-50': '#71717a',
        'shade-60': '#52525b',
        'shade-70': '#3f3f46',

        // Hairlines
        'hairline-light': '#e4e4e7',
        'hairline-dark': '#1e2c31',

        // Brand accents
        'aloe': '#c1fbd4',
        'pistachio': '#d4f9e0',

        // Link tones
        'link-cool-1': '#9dabad',
        'link-cool-2': '#9797a2',
        'link-cool-3': '#bdbdca',
        'link-mint': '#99b3ad',
      },
      fontFamily: {
        display: ['NeueHaasGrotesk Display', 'Helvetica', 'Arial', 'sans-serif'],
        body: ['Inter Variable', 'Inter', 'Helvetica', 'Arial', 'sans-serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
      },
      borderRadius: {
        'xs': '4px',
        'sm': '5px',
        'md': '8px',
        'lg': '12px',
        'xl': '20px',
        'pill': '9999px',
      },
      spacing: {
        'xxs': '2px',
        'xs': '4px',
        'sm': '8px',
        'md': '12px',
        'lg': '16px',
        'xl': '24px',
        'xxl': '32px',
        'huge': '64px',
      },
    },
  },
  plugins: [],
}