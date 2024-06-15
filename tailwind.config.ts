import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: theme => ({
        'test': "url('/bg.jpg')"
      }),
      fontFamily: {
        sans: ['Arial', 'sans-serif'],
      },
      text:{
        'stroke': '-webkit-text-stroke: 1px; '
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
export default config;
