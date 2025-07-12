/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          background: '#000000',
          foreground: '#ffffff',
          border: '#333333',
          primary: {
            50: '#f8f9fa',
            100: '#e9ecef',
            200: '#dee2e6',
            300: '#ced4da',
            400: '#adb5bd',
            500: '#6c757d',
            600: '#495057',
            700: '#343a40',
            800: '#212529',
            900: '#000000',
          },
          gray: {
            50: '#fafafa',
            100: '#f5f5f5',
            200: '#e5e5e5',
            300: '#d4d4d4',
            400: '#a3a3a3',
            500: '#737373',
            600: '#525252',
            700: '#404040',
            800: '#262626',
            900: '#171717',
          },
          accent: {
            50: '#ffffff',
            100: '#f8f9fa',
            200: '#e9ecef',
            300: '#dee2e6',
            400: '#ced4da',
            500: '#adb5bd',
            600: '#6c757d',
            700: '#495057',
            800: '#343a40',
            900: '#212529',
          },
          gold: {
            50: '#fffbeb',
            100: '#fef3c7',
            200: '#fde68a',
            300: '#fcd34d',
            400: '#fbbf24',
            500: '#f59e0b',
            600: '#d97706',
            700: '#b45309',
            800: '#92400e',
            900: '#78350f',
          }
        },
        fontFamily: {
          sans: ['Inter', 'system-ui', 'sans-serif'],
          serif: ['Georgia', 'Times New Roman', 'serif'],
        },
        animation: {
          'fade-in': 'fadeIn 0.8s ease-out',
          'slide-up': 'slideUp 1s ease-out',
          'slide-in-left': 'slideInLeft 0.8s ease-out',
          'slide-in-right': 'slideInRight 0.8s ease-out',
          'elegant-float': 'elegantFloat 8s ease-in-out infinite',
          'subtle-pulse': 'subtlePulse 3s ease-in-out infinite',
          'professional-glow': 'professionalGlow 2s ease-in-out infinite alternate',
          'typewriter': 'typewriter 4s steps(40, end)',
          'underline-expand': 'underlineExpand 0.3s ease-out',
        },
        keyframes: {
          fadeIn: {
            '0%': { opacity: '0', transform: 'translateY(30px)' },
            '100%': { opacity: '1', transform: 'translateY(0)' },
          },
          slideUp: {
            '0%': { opacity: '0', transform: 'translateY(50px)' },
            '100%': { opacity: '1', transform: 'translateY(0)' },
          },
          slideInLeft: {
            '0%': { opacity: '0', transform: 'translateX(-50px)' },
            '100%': { opacity: '1', transform: 'translateX(0)' },
          },
          slideInRight: {
            '0%': { opacity: '0', transform: 'translateX(50px)' },
            '100%': { opacity: '1', transform: 'translateX(0)' },
          },
          elegantFloat: {
            '0%, 100%': { transform: 'translateY(0px)' },
            '50%': { transform: 'translateY(-10px)' },
          },
          subtlePulse: {
            '0%, 100%': { opacity: '1' },
            '50%': { opacity: '0.8' },
          },
          professionalGlow: {
            '0%': { boxShadow: '0 0 20px rgba(255, 255, 255, 0.1)' },
            '100%': { boxShadow: '0 0 30px rgba(255, 255, 255, 0.2)' },
          },
          typewriter: {
            'from': { width: '0' },
            'to': { width: '100%' },
          },
          underlineExpand: {
            '0%': { width: '0%' },
            '100%': { width: '100%' },
          },
        },
        backgroundImage: {
          'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
          'legal-pattern': 'linear-gradient(45deg, rgba(255,255,255,0.02) 25%, transparent 25%), linear-gradient(-45deg, rgba(255,255,255,0.02) 25%, transparent 25%), linear-gradient(45deg, transparent 75%, rgba(255,255,255,0.02) 75%), linear-gradient(-45deg, transparent 75%, rgba(255,255,255,0.02) 75%)',
        },
        backgroundSize: {
          'pattern': '20px 20px',
        },
      },
    },
    plugins: [],
  }