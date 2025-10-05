
import React from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { XIcon } from './icons/XIcon';

export const ColorPicker: React.FC = () => {
    const { customColor, applyCustomColor, resetCustomColor, theme } = useTheme();

    if (theme === 'high-contrast') {
        return null;
    }

    const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        applyCustomColor(e.target.value);
    };
    
    // Default green color from the light theme
    const defaultColor = '#16a34a';

    return (
        <div className="flex items-center space-x-2">
            <div className="relative w-7 h-7">
                <div 
                    className="w-full h-full rounded-md border border-border" 
                    style={{ backgroundColor: customColor || defaultColor }}
                ></div>
                <input
                    type="color"
                    value={customColor || defaultColor}
                    onChange={handleColorChange}
                    className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                    aria-label="Select custom theme color"
                />
            </div>
            {customColor && (
                 <button 
                    onClick={resetCustomColor} 
                    className="p-1 rounded-full text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                    aria-label="Reset color"
                 >
                    <XIcon className="w-4 h-4" />
                 </button>
            )}
        </div>
    );
};
