export const theme = {
  colors: {
    primary: {
      blue: '#2563eb',
      blueHover: '#1d4ed8',
      purple: '#9333ea',
      gradient: 'linear-gradient(135deg, #2563eb 0%, #9333ea 100%)',
    },
    background: {
      light: 'linear-gradient(135deg, #eff6ff 0%, #e0e7ff 100%)',
      dark: 'linear-gradient(135deg, #111827 0%, #1f2937 100%)',
    },
    text: {
      primary: '#111827',
      secondary: '#4b5563',
      white: '#ffffff',
      lightGray: '#d1d5db',
    }
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    '2xl': '3rem',
    '3xl': '4rem',
  },
  fontSize: {
    sm: '0.875rem',
    base: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
    '3xl': '1.875rem',
    '4xl': '2.25rem',
    '5xl': '3rem',
    '6xl': '3.75rem',
    '7xl': '4.5rem',
  },
  borderRadius: {
    sm: '0.125rem',
    default: '0.25rem',
    md: '0.375rem',
    lg: '0.5rem',
  },
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
  }
};

export type Theme = typeof theme;