// src/context/ThemeContext.jsx
import React, { createContext, useState, useEffect, useContext, useCallback } from 'react';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { lightTheme, darkTheme } from '../components/theme';

// Создаём контекст
const ThemeContext = createContext({
  isDarkMode: false,
  toggleTheme: () => {},
  theme: lightTheme,
});

// Кастомный хук для использования темы
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme должен использоваться внутри ThemeProvider');
  }
  return context;
};

// Провайдер темы
export const ThemeProvider = ({ children }) => {
  // Определяем начальную тему:
  // 1. Из localStorage
  // 2. Из системных настроек
  // 3. По умолчанию светлая
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Проверяем localStorage
    const savedTheme = localStorage.getItem('tech-tracker-theme');
    if (savedTheme) {
      return savedTheme === 'dark';
    }
    
    // Проверяем системные настройки
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return true;
    }
    
    // По умолчанию светлая тема
    return false;
  });

  // Функция переключения темы
  const toggleTheme = useCallback(() => {
    setIsDarkMode((prevMode) => !prevMode);
  }, []);

  // Сохраняем тему в localStorage и обновляем data-theme атрибут
  useEffect(() => {
    // Сохраняем в localStorage
    localStorage.setItem('tech-tracker-theme', isDarkMode ? 'dark' : 'light');
    
    // Обновляем data-theme атрибут для CSS переменных
    document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
    
    // Также добавляем класс для body для дополнительных стилей
    if (isDarkMode) {
      document.body.classList.add('dark-theme');
      document.body.classList.remove('light-theme');
    } else {
      document.body.classList.add('light-theme');
      document.body.classList.remove('dark-theme');
    }
    
    console.log(`Тема изменена на: ${isDarkMode ? 'тёмная' : 'светлая'}`);
  }, [isDarkMode]);

  // Слушаем изменения системной темы (только если пользователь не выбрал тему вручную)
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleSystemThemeChange = (e) => {
      // Меняем тему только если пользователь не сохранял своё предпочтение
      const hasUserPreference = localStorage.getItem('tech-tracker-theme');
      if (!hasUserPreference) {
        setIsDarkMode(e.matches);
        console.log('Системная тема изменена, применяем:', e.matches ? 'тёмную' : 'светлую');
      }
    };

    // Добавляем слушатель
    mediaQuery.addEventListener('change', handleSystemThemeChange);

    // Очистка при размонтировании
    return () => {
      mediaQuery.removeEventListener('change', handleSystemThemeChange);
    };
  }, []);

  // Выбираем текущую тему
  const theme = isDarkMode ? darkTheme : lightTheme;

  // Значение контекста
  const contextValue = {
    isDarkMode,
    toggleTheme,
    theme,
  };

  return (
    <ThemeContext.Provider value={contextValue}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
};

// Экспорт по умолчанию для удобства
export default ThemeContext;