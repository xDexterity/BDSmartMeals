import React from 'react';
import { RecipeBookIcon } from './icons/RecipeBookIcon';
import { ShoppingCartIcon } from './icons/ShoppingCartIcon';
import { ClipboardIcon } from './icons/ClipboardIcon';

type MobileView = 'recipes' | 'shopping' | 'plan';

interface MobileNavProps {
  activeView: MobileView;
  setActiveView: (view: MobileView) => void;
}

export const MobileNav: React.FC<MobileNavProps> = ({ activeView, setActiveView }) => {
  const navItems = [
    { name: 'Recipes', view: 'recipes', icon: RecipeBookIcon },
    { name: 'Shopping', view: 'shopping', icon: ShoppingCartIcon },
    { name: 'My Plan', view: 'plan', icon: ClipboardIcon },
  ] as const;

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-card/80 backdrop-blur-sm border-t border-border z-20">
      <div className="flex justify-around items-center h-16">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeView === item.view;
          return (
            <button
              key={item.name}
              onClick={() => setActiveView(item.view)}
              className={`flex flex-col items-center justify-center w-full h-full text-xs font-medium transition-colors ${
                isActive ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
              }`}
              aria-label={item.name}
            >
              <Icon className="w-6 h-6 mb-1" />
              {item.name}
            </button>
          );
        })}
      </div>
    </nav>
  );
};