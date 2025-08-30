/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: [
      {
        cupcake: {
          primary: 'oklch(85% 0.138 181.071)',
          'primary-content': 'oklch(43% 0.078 188.216)',
          secondary: 'oklch(89% 0.061 343.231)',
          'secondary-content': 'oklch(45% 0.187 3.815)',
          accent: 'oklch(90% 0.076 70.697)',
          'accent-content': 'oklch(47% 0.157 37.304)',
          neutral: 'oklch(27% 0.006 286.033)',
          'neutral-content': 'oklch(92% 0.004 286.32)',
          'base-100': 'oklch(97.788% 0.004 56.375)',
          'base-200': '#ece8e3',
          'base-300': 'oklch(91.586% 0.006 53.44)',
          'base-content': 'oklch(23.574% 0.066 313.189)',
          info: 'oklch(68% 0.169 237.323)',
          'info-content': 'oklch(29% 0.066 243.157)',
          success: 'oklch(69% 0.17 162.48)',
          'success-content': 'oklch(26% 0.051 172.552)',
          warning: 'oklch(79% 0.184 86.047)',
          'warning-content': 'oklch(28% 0.066 53.813)',
          error: 'oklch(64% 0.246 16.439)',
          'error-content': 'oklch(27% 0.105 12.094)',
        },
      },
      'dark',
    ],
    darkTheme: 'cupcake',
  },
}