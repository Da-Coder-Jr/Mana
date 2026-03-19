export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        mana: {
          bg: '#060816',
          panel: '#0b1224',
          glow: '#6ee7ff',
          purple: '#7c3aed',
          text: '#dbeafe',
          muted: '#93a4c3',
        },
      },
      boxShadow: {
        glow: '0 0 40px rgba(110, 231, 255, 0.18)',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        pulseGrid: {
          '0%, 100%': { opacity: '0.2' },
          '50%': { opacity: '0.5' },
        },
        spinSlow: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
      },
      animation: {
        float: 'float 7s ease-in-out infinite',
        pulseGrid: 'pulseGrid 8s ease-in-out infinite',
        spinSlow: 'spinSlow 16s linear infinite',
      },
    },
  },
  plugins: [],
};
