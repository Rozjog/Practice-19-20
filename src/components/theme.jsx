import { createTheme } from '@mui/material/styles';

export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#4299e1',     
      light: '#63b3ed',
      dark: '#3182ce',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#6c757d',    
      light: '#a0aec0',
      dark: '#4a5568',
      contrastText: '#ffffff',
    },
    success: {
      main: '#38a169',     
      light: '#68d391',
      dark: '#2f855a',
      contrastText: '#ffffff',
    },
    error: {
      main: '#e53e3e',    
      light: '#fc8181',
      dark: '#c53030',
      contrastText: '#ffffff',
    },
    warning: {
      main: '#d69e2e',      
      light: '#f6ad55',
      dark: '#b7791f',
      contrastText: '#ffffff',
    },
    info: {
      main: '#718096',     
      light: '#a0aec0',
      dark: '#4a5568',
      contrastText: '#ffffff',
    },
    background: {
      default: '#e8e8e8ff',   
      paper: '#ffffff',     
    },
    text: {
      primary: '#2d3748', 
      secondary: '#4a5568', 
      disabled: '#a0aec0',
    },
    divider: '#e2e8f0',
    action: {
      active: '#4299e1',
      hover: 'rgba(66, 153, 225, 0.04)',
      selected: 'rgba(66, 153, 225, 0.08)',
      disabled: 'rgba(0, 0, 0, 0.26)',
      disabledBackground: 'rgba(0, 0, 0, 0.12)',
    },
  },
  typography: {
    fontFamily: '"Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    h1: {
      fontSize: '2.2rem',
      fontWeight: 600,
      color: '#2d3748',
      lineHeight: 1.2,
    },
    h2: {
      fontSize: '1.8rem',
      fontWeight: 600,
      color: '#2d3748',
      lineHeight: 1.3,
    },
    h3: {
      fontSize: '1.5rem',
      fontWeight: 600,
      color: '#2d3748',
      lineHeight: 1.4,
    },
    h4: {
      fontSize: '1.25rem',
      fontWeight: 600,
      color: '#2d3748',
      lineHeight: 1.4,
    },
    h5: {
      fontSize: '1.1rem',
      fontWeight: 600,
      color: '#2d3748',
      lineHeight: 1.4,
    },
    h6: {
      fontSize: '1rem',
      fontWeight: 600,
      color: '#2d3748',
      lineHeight: 1.4,
    },
    subtitle1: {
      fontSize: '1rem',
      fontWeight: 500,
      color: '#4a5568',
      lineHeight: 1.5,
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.5,
      color: '#4a5568',
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.5,
      color: '#718096',
    },
    button: {
      textTransform: 'none',
      fontWeight: 600,
      fontSize: '0.875rem',
    },
    caption: {
      fontSize: '0.75rem',
      color: '#a0aec0',
    },
  },
  shape: {
    borderRadius: 8,
  },
  shadows: [
    'none',
    '0 2px 4px rgba(0, 0, 0, 0.05)',
    '0 2px 6px rgba(0, 0, 0, 0.08)',
    '0 4px 12px rgba(0, 0, 0, 0.12)',
    '0 8px 16px rgba(0, 0, 0, 0.16)',
    '0 16px 32px rgba(0, 0, 0, 0.2)',
    ...Array(19).fill('none'),
  ],
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 6,
          fontWeight: 600,
          padding: '8px 16px',
          '&:hover': {
            transform: 'translateY(-1px)',
            transition: 'all 0.3s ease',
          },
        },
        contained: {
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        },
        outlined: {
          borderWidth: 2,
          '&:hover': {
            borderWidth: 2,
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          boxShadow: '0 2px 6px rgba(0, 0, 0, 0.08)',
          transition: 'all 0.3s ease',
          '&:hover': {
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.12)',
            transform: 'translateY(-2px)',
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#ffffff',
          color: '#2d3748',
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 6,
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: '#cbd5e0',
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: '#4299e1',
              borderWidth: 2,
            },
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontWeight: 500,
          '&.MuiChip-outlined': {
            borderWidth: 1.5,
          },
        },
      },
    },
    MuiLinearProgress: {
      styleOverrides: {
        root: {
          borderRadius: 4,
          height: 8,
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          borderColor: '#e2e8f0',
        },
      },
    },
    MuiListItem: {
      styleOverrides: {
        root: {
          '&:hover': {
            backgroundColor: 'rgba(66, 153, 225, 0.04)',
          },
        },
      },
    },
  },
});

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#63b3ed',     
      light: '#90cdf4',
      dark: '#4299e1',
      contrastText: '#1a202c',
    },
    secondary: {
      main: '#a0aec0',      
      light: '#cbd5e0',
      dark: '#718096',
      contrastText: '#1a202c',
    },
    success: {
      main: '#68d391',     
      light: '#9ae6b4',
      dark: '#38a169',
      contrastText: '#1a202c',
    },
    error: {
      main: '#fc8181',     
      light: '#fed7d7',
      dark: '#e53e3e',
      contrastText: '#1a202c',
    },
    warning: {
      main: '#f6ad55',   
      light: '#fbd38d',
      dark: '#d69e2e',
      contrastText: '#1a202c',
    },
    info: {
      main: '#a0aec0',    
      light: '#cbd5e0',
      dark: '#718096',
      contrastText: '#1a202c',
    },
    background: {
      default: '#2d3748',   
      paper: '#1e1e1e',  
    },
    text: {
      primary: '#ffffff',          
      secondary: '#e2e8f0',         
      disabled: 'rgba(255, 255, 255, 0.5)',
    },
    divider: 'rgba(255, 255, 255, 0.12)',
    action: {
      active: '#63b3ed',
      hover: 'rgba(99, 179, 237, 0.08)',
      selected: 'rgba(99, 179, 237, 0.16)',
      disabled: 'rgba(255, 255, 255, 0.3)',
      disabledBackground: 'rgba(255, 255, 255, 0.12)',
    },
  },
  typography: {
    fontFamily: '"Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    h1: {
      fontSize: '2.2rem',
      fontWeight: 600,
      color: '#ffffff',
      lineHeight: 1.2,
    },
    h2: {
      fontSize: '1.8rem',
      fontWeight: 600,
      color: '#ffffff',
      lineHeight: 1.3,
    },
    h3: {
      fontSize: '1.5rem',
      fontWeight: 600,
      color: '#ffffff',
      lineHeight: 1.4,
    },
    h4: {
      fontSize: '1.25rem',
      fontWeight: 600,
      color: '#ffffff',
      lineHeight: 1.4,
    },
    h5: {
      fontSize: '1.1rem',
      fontWeight: 600,
      color: '#ffffff',
      lineHeight: 1.4,
    },
    h6: {
      fontSize: '1rem',
      fontWeight: 600,
      color: '#ffffff',
      lineHeight: 1.4,
    },
    subtitle1: {
      fontSize: '1rem',
      fontWeight: 500,
      color: '#e2e8f0',
      lineHeight: 1.5,
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.5,
      color: '#e2e8f0',
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.5,
      color: '#a0aec0',
    },
    button: {
      textTransform: 'none',
      fontWeight: 600,
      fontSize: '0.875rem',
    },
    caption: {
      fontSize: '0.75rem',
      color: '#718096',
    },
  },
  shape: {
    borderRadius: 8,
  },
  shadows: [
    'none',
    '0 2px 4px rgba(0, 0, 0, 0.2)',
    '0 2px 6px rgba(0, 0, 0, 0.3)',
    '0 4px 12px rgba(0, 0, 0, 0.4)',
    '0 8px 16px rgba(0, 0, 0, 0.5)',
    '0 16px 32px rgba(0, 0, 0, 0.6)',
    ...Array(19).fill('none'),
  ],
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 6,
          fontWeight: 600,
          padding: '8px 16px',
          '&:hover': {
            transform: 'translateY(-1px)',
            transition: 'all 0.3s ease',
          },
        },
        contained: {
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
        },
        outlined: {
          borderWidth: 2,
          '&:hover': {
            borderWidth: 2,
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          boxShadow: '0 2px 6px rgba(0, 0, 0, 0.3)',
          backgroundColor: '#1e1e1e',
          transition: 'all 0.3s ease',
          '&:hover': {
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.4)',
            transform: 'translateY(-2px)',
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#1e1e1e',
          color: '#ffffff',
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 6,
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: '#718096',
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: '#63b3ed',
              borderWidth: 2,
            },
          },
          '& .MuiInputLabel-root': {
            color: '#a0aec0',
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontWeight: 500,
          '&.MuiChip-outlined': {
            borderWidth: 1.5,
          },
        },
      },
    },
    MuiLinearProgress: {
      styleOverrides: {
        root: {
          borderRadius: 4,
          height: 8,
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          borderColor: 'rgba(255, 255, 255, 0.12)',
        },
      },
    },
    MuiListItem: {
      styleOverrides: {
        root: {
          '&:hover': {
            backgroundColor: 'rgba(99, 179, 237, 0.08)',
          },
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          color: '#e2e8f0',
          '&:hover': {
            backgroundColor: 'rgba(99, 179, 237, 0.1)',
          },
        },
      },
    },
    MuiBadge: {
      styleOverrides: {
        badge: {
          fontWeight: 600,
        },
      },
    },
  },
});

export default { lightTheme, darkTheme };