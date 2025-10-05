import React from 'react';
import { Recipe } from '../types';
import { RecipeCard } from './RecipeCard';

interface RecipeTabsProps {
  recipesByDay: Record<string, Recipe[]>;
  activeDay: string;
  setActiveDay: (day: string) => void;
  onSelectRecipe: (recipe: Recipe) => void;
}

export const RecipeTabs: React.FC<RecipeTabsProps> = ({ recipesByDay, activeDay, setActiveDay, onSelectRecipe }) => {
  const days = Object.keys(recipesByDay);

  return (
    <div>
      <div className="border-b border-border mb-6">
        <div className="overflow-x-auto hide-scrollbar">
          <nav className="-mb-px flex space-x-4" aria-label="Tabs">
            {days.map((day) => (
              <button
                key={day}
                onClick={() => setActiveDay(day)}
                className={`whitespace-nowrap py-3 px-1 border-b-2 font-semibold text-sm transition-colors
                  ${
                    activeDay === day
                      ? 'border-primary text-primary'
                      : 'border-transparent text-muted-foreground hover:text-foreground hover:border-gray-300'
                  }`}
              >
                {day}
              </button>
            ))}
          </nav>
        </div>
      </div>

      <div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {recipesByDay[activeDay]?.map((recipe) => (
            <RecipeCard
              key={`${recipe.day}-${recipe.name}`}
              recipe={recipe}
              onSelect={() => onSelectRecipe(recipe)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};