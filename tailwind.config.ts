import type { Config } from "tailwindcss"

const config: Config = {
  important: true,
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backdropFilter: {
        none: "none",
        blur: "blur(2px)",
      },
    },
  },
  plugins: [require("tailwindcss-filters")],
}
export default config
