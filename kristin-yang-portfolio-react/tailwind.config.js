// Tailwind CSS v4 loads this compatibility config through @config in src/index.css.
// The original design tokens remain in src/index.css (@theme and CSS variables).
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: { extend: {} },
  plugins: [],
};
