import React from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { Theme } from '../types';
import { SunIcon } from './icons/SunIcon';
import { MoonIcon } from './icons/MoonIcon';
import { ContrastIcon } from './icons/ContrastIcon';

export const ThemeSwitcher: React.FC = () => {
  const { theme, setTheme } = useTheme();

  // FIX: Replaced JSX.Element with React.ReactElement to resolve 'Cannot find namespace JSX' error.
  const themes: { name: Theme; icon: React.ReactElement }[] = [
    { name: 'light', icon: <SunIcon className="w-5 h-5" /> },
    { name: 'dark', icon: <MoonIcon className="w-5 h-5" /> },
    { name: 'high-contrast', icon: <ContrastIcon className="w-5 h-5" /> },
  ];

  return (
    <div className="flex items-center p-1 rounded-full bg-secondary border border-border">
      {themes.map((t) => (
        <button
          key={t.name}
          onClick={() => setTheme(t.name)}
          className={`p-2 rounded-full transition-colors duration-200 ${
            theme === t.name
              ? 'bg-primary text-primary-foreground'
              : 'text-muted-foreground hover:bg-muted'
          }`}
          aria-label={`Switch to ${t.name} theme`}
        >
          {t.icon}
        </button>
      ))}
    </div>
  );
};
