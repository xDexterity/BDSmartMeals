
import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import { Theme } from '../types';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  customColor: string | null;
  applyCustomColor: (color: string) => void;
  resetCustomColor: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<Theme>(() => {
    const savedTheme = localStorage.getItem('theme') as Theme;
    return savedTheme || 'light';
  });

  const [customColor, setCustomColor] = useState<string | null>(() => {
    return localStorage.getItem('customColor');
  });

  const applyCustomColor = (color: string) => {
    localStorage.setItem('customColor', color);
    setCustomColor(color);
  };

  const resetCustomColor = () => {
    localStorage.removeItem('customColor');
    setCustomColor(null);
  };

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('theme-light', 'theme-dark', 'theme-high-contrast');
    root.classList.add(`theme-${theme}`);
    localStorage.setItem('theme', theme);

    const rootStyle = root.style;

    const hexToRgb = (hex: string) => {
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
      } : null;
    };

    const getContrastRgbString = (hex: string) => {
      const rgb = hexToRgb(hex);
      if (!rgb) return '255 255 255'; // Default to white
      // Formula to calculate luminance
      const luminance = (0.299 * rgb.r + 0.587 * rgb.g + 0.114 * rgb.b);
      // Return dark color for light backgrounds, light color for dark backgrounds
      return luminance > 150 ? '15 23 42' : '255 255 255';
    };

    if (customColor && (theme === 'light' || theme === 'dark')) {
      const rgb = hexToRgb(customColor);
      if (rgb) {
        rootStyle.setProperty('--color-primary', `${rgb.r} ${rgb.g} ${rgb.b}`);
        const contrastRgbString = getContrastRgbString(customColor);
        rootStyle.setProperty('--color-primary-foreground', contrastRgbString);
      }
    } else {
      // If no custom color or theme is high-contrast, remove the inline styles to revert to CSS definitions
      rootStyle.removeProperty('--color-primary');
      rootStyle.removeProperty('--color-primary-foreground');
    }

  }, [theme, customColor]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, customColor, applyCustomColor, resetCustomColor }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
