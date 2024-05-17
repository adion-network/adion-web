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
      boxShadow: {
        halo: "0px 0px 15px 15px rgba(0, 0, 0, 0.5)",
      },
      colors: {
        "logo-from": "#0066FF",
        "logo-to": "#00CCFF",
      },
    },
  },
  plugins: [require("tailwindcss-filters")],
}
export default config
