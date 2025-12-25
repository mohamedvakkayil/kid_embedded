/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'robot-blue': '#8ecae6',
        'robot-blue-dark': '#219ebc',
        'robot-pink': '#ffb703',
        'robot-yellow': '#fb8500',
        'robot-green': '#06d6a0',
        'robot-purple': '#6a4c93',
        'bg-primary': '#fdfcfb',
      },
      fontFamily: {
        'sniglet': ['Sniglet', 'cursive'],
        'baloo': ['Baloo 2', 'cursive'],
      },
      boxShadow: {
        'clay': '12px 12px 24px rgba(0, 0, 0, 0.08), inset -8px -8px 16px rgba(0, 0, 0, 0.05), inset 8px 8px 16px rgba(255, 255, 255, 1)',
      },
      borderRadius: {
        'clay': '40px',
      },
      transitionTimingFunction: {
        'bounce': 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
      },
    },
  },
  plugins: [],
}

