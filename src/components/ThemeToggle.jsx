import React from 'react';
import { IconButton, Tooltip } from '@mui/material';
import { Brightness4, Brightness7 } from '@mui/icons-material';
import { useTheme } from '../components/ThemeChange';

const ThemeToggle = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <Tooltip title={isDarkMode ? 'Включить светлую тему' : 'Включить тёмную тему'}>
      <IconButton
        onClick={toggleTheme}
        color="inherit"
        size="medium"
        sx={{
          ml: 1,
          transition: 'all 0.3s ease',
          '&:hover': {
            transform: 'rotate(15deg)',
            backgroundColor: 'action.hover',
          },
        }}
        aria-label={isDarkMode ? 'Переключить на светлую тему' : 'Переключить на тёмную тему'}
      >
        {isDarkMode ? (
          <Brightness7 sx={{ color: 'warning.main' }} />
        ) : (
          <Brightness4 sx={{ color: 'primary.main' }} />
        )}
      </IconButton>
    </Tooltip>
  );
};

export default ThemeToggle;