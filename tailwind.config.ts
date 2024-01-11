import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  
  theme: {
    colors: {
      main: {
        100: "#EDF9FD",
        200: "#C9ECFA",
        300: "#A6DFF6",
        400: "#82D3F3",
        500: "#5EC6EF",
        600: "#3DBAEC",
      },
      "main-orange": {
        100: "#FEF1ED",
        200: "#FBD4C8",
        300: "#F9B8A3",
        400: "#F79C7E",
        500: "#F47F59",
        600: "#F15A29",
      },
      "main-yellow": {
        100: "#FFF7EC",
        200: "#FEE7C5",
        300: "#FDD79F",
        400: "#FCC778",
        500: "#FBB752",
        600: "#FBB040",
      },
      white: "#ffffff",
      black: "#000929",
      success: "#198754",
      "success-light": "#f0fff8",
      error: "#dc3545",
      "error-light": "#fee",
      warning: "#ffc107",
      info: "#0dcaf0",
      gray: {
        50: "#F9FAFB",
        100: "#F4F4F6",
        200: "#E5E6EB",
        300: "#D3D5DA",
        400: "#9EA3AE",
        500: "#6C727F",
        600: "#4D5461",
        700: "#394150",
        800: "#212936",
        900: "#0B0A0F",
      },
      "main-secondary": "#0009297d",
      green: "#5A9F0B",
      "main-blue": "#100A55",
      red: "#EE6A5F",
    },
    fontFamily: {
      sans: ["Plus Jakarta Sans", "sans-serif"],
    },
    fontSize: {
      xs: [".75rem", "1rem"],
      sm: [".875rem", "1.225rem"],
      base: ["1rem", "1.5rem"],
      "base-tall": ["1rem", "1.6rem"],
      lg: ["1.125rem", "1.75rem"],
      xl: ["1.25rem", "1.75rem"],
      "xl-tall": ["1.25rem", "2rem"],
      "2xl": ["1.5rem", "2rem"],
      "3xl": ["2rem", "2.25rem"],
      "4xl": ["2.5rem", "1"],
      "5xl": ["4rem", "1"],
    },
    fontWeight: {
      regular: "400",
      medium: "500",
      bold: "700",
      extrabold: "800",
    },
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        sm: "2rem",
        lg: "7rem",
        xl: "7rem",
      },
    },
    extend: {
      zIndex: {
        999: "999",
        1: "1",
        2: "2",
      },
      keyframes: {
        sidebarOpen: {
          "0%": { left: "-285px" },
          "100%": { left: "0px" },
        },
        sidebarClose: {
          "0%": { left: "0px" },
          "100%": { left: "-285px" },
        },
        rightLeft: {
          "0%": { right: "-423px" },
          "100%": { right: "0px" },
        },
      },
      animation: {
        swapOpen: "sidebarOpen 0.5s ease-in-out 1",
        swapClose: "sidebarClose 0.5s ease-in-out 1",
        swapRight: "rightLeft 0.5s ease-in-out 1",
      },
      backgroundImage: {
        "slider-bg": "url('/assets/background.avif')",
        "sliderLeft-bg": "url('/assets/slider1.avif')",
        service: "url('/public/service.png')",
        vedioImg: "url('/assets/img1.png')",
        PropertyDefult: "url('/assets/property-1.png')",
        paySuccess: "url('/public/messages/base.png')",
        mailBox: "url('/public/messages/mailbox.png')",
        successMessage: "url('/public/messages/success2.png')",
        caravan: "url('/public/caravan.png')",
      },
      borderWidth: {
        3: "3px",
      },
      spacing: {
        695: "695px",
        52: "52%",
      },
      letterSpacing: {
        tightest: "-.075em",
      },
      boxShadow: {
        basic: "0px 3px 40px rgba(14, 8, 84, 0.05)",
        basicSm: "0px 4px 40px rgba(14, 8, 84, 0.1);",
        basicMd: "0px 4px 20px rgba(14, 8, 84, 0.08);",
        smoothGray: "0px -3px 48px 12px rgba(207, 207, 207, 0.21);",
      },
      dropShadow: {
        basic: " 0px 4px 40px rgba(14, 8, 84, 0.1)",
        "basic-sm": "0px 0px 64px rgba(0, 0, 0, 0.13)",
      },
    },
    backgroundImage: {
      'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      'gradient-conic':
        'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
    },
  },
  plugins: [],
}
export default config
