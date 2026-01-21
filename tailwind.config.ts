import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx,scss,svg}",
    "./components/**/*.{js,ts,jsx,tsx,mdx,scss,svg}",
    "./src/**/*.{js,ts,jsx,tsx,mdx,scss,svg}",
    "./src/**/*.{js,ts,jsx,tsx,mdx,scss,svg}",
  ],
  theme: {
    fontFamily: {
      nunito: "var(--font-nunito)",
      playfair: "var(--font-playfair)",
    },
    container: {
      padding: "1rem",
      center: true,
    },
    colors: {
      transparent: "transparent",
      background: "var(--background)",
      foreground: "var(--foreground)",
      darkBackground: "#111214",
      white: "#ffffff",
      black: "#000000",
      primary: "#9046E5",
      "primary-light": "#ECDBFF",
      "light-background": "#F9F4FF",
      secondary: "#F2E8FF",
      "grey-100": "#E8E8E8",
      "grey-400": "#666666",
      "grey-600": "#333333",
      "blue-100": "#379DFF",
      "green-100": "#26970C",
      "red-100": "#DB221F",
      "pink-100": "#C988A8",
      "orange-800": "#C7752A",
    },
    fontSize: {
      xs: "1.2rem",
      sm: "1.4rem",
      base: "1.6rem",
      md: "1.8rem",
      lg: "2rem",
      xl: "2.4rem",
      "2xl": "2.6rem",
      "3xl": "2.8rem",
      "4xl": "3rem",
      "5xl": "3.2rem",
      "6xl": "3.4rem",
      "7xl": "3.6rem",
      "8xl": "3.8rem",
      "9xl": "4rem",
      "10xl": "7rem",
      "11xl": "12.8rem",
    },

    extend: {
      screens: {
        xxs: "320px",
        xs: "375px",
        base: "425px",
      },
      dropShadow: {
        sm: "0px 0px 15px 0px #0000001A",
        md: " 0px 1.08px 2.16px 0px #1018280A",
      },
      boxShadow: {
        sm: "2px 12px 10px -2px rgba(0,0,0,0.45)",
        md: "0px 1.08px 2.16px 0px #1018280A",
      },
      backgroundImage: {
        wallet_gradient: "linear-gradient(0deg, #143CAE, #143CAE)",
        primary_gradient: "linear-gradient(90deg, #1C86FF 0%, #1333A5 100%)",
        disabled_gradient: "linear-gradient(90deg, #8e9bae 0%, #8e9bae 100%)",
        disabled_login_gradient:
          "linear-gradient(90deg, #272729 0%, #272729 100%)",
        destructive_gradient:
          "linear-gradient(90deg, #D44B4B 0%, #6E2727 100%)",
        primary_reversed_gradient:
          "linear-gradient(90deg, #1333A5 0%, #1C86FF 100%)",
        custom_gradient: "linear-gradient(90deg, #0539E1 0%, #00A4EF 99.97%)",
        small_button_gradient:
          "linear-gradient(180deg, #1C86FF 0%, #115099 100%)",
        footer_gradient:
          "linear-gradient(180deg, rgba(18, 20, 20, 0.19) 32.61%, #121314 62.93%)",
        "success-gradient": "linear-gradient(90deg, #19B360 0%, #1B653D 100%)",
        "warning-gradient": "linear-gradient(90deg, #FF931D 0%, #6A4217 100%)",
        square_background: "url('/assets/svg/profile-bg-svg')",
        hero_background: "url('/Hero-Gradient-Background.png')",
        marketing_background: "url('/marketing_background.svg')",
        done_for_you_background: "url('/done-for-you-bg.png')",
        login_background_pattern: "url('/assets/svg/pattern_login.svg')",
      },
      borderColor: {
        border_image:
          "linear-gradient(180deg, #2388FF 0%, rgba(35, 136, 255, 0) 100%)",
      },
      maxWidth: {
        // default: "144rem",
        default: "192rem",
      },

      animation: {
        fadeIn: "fadeIn 0.3s ease-in",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
