import React from 'react';
import { ThemeSwitcher } from './ThemeSwitcher';
import { LeafIcon } from './icons/LeafIcon';
import { ColorPicker } from './ColorPicker';


export const Header = () => {
  return (
    <header className="bg-background/80 backdrop-blur-sm shadow-sm border-b border-border/50 sticky top-0 z-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
            <LeafIcon className="h-8 w-8 text-primary"/>
            <h1 className="text-xl font-bold text-foreground">
              B&D SmartMeals
            </h1>
          </div>
          <div className="flex items-center space-x-4">
            <ColorPicker />
            <ThemeSwitcher />
          </div>
        </div>
      </div>
    </header>
  );
};