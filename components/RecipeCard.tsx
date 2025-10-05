import React from 'react';
import { Recipe } from '../types';
import { InfoIcon } from './icons/InfoIcon';

interface RecipeCardProps {
  recipe: Recipe;
  onSelect: () => void;
}

export const RecipeCard: React.FC<RecipeCardProps> = ({ recipe, onSelect }) => {
  return (
    <div className="bg-card border border-border rounded-2xl shadow-sm overflow-hidden transition-all duration-300 hover:shadow-lg hover:border-primary/30 group">
      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
            <div>
                <p className="text-sm font-semibold text-primary capitalize">{recipe.mealType}</p>
                <h3 className="font-bold text-lg text-foreground leading-tight">{recipe.name}</h3>
            </div>
            <div className="text-right flex-shrink-0 ml-4">
                <p className="font-bold text-2xl text-foreground">{recipe.nutrition.calories}</p>
                <p className="text-xs text-muted-foreground -mt-1">Calories</p>
            </div>
        </div>
        <p className="text-sm text-muted-foreground mt-2 mb-4 h-10">{recipe.description}</p>
        <button
          onClick={onSelect}
          className="w-full flex items-center justify-center space-x-2 bg-secondary text-secondary-foreground font-semibold py-2 px-4 rounded-lg hover:bg-primary hover:text-primary-foreground transition-colors duration-200"
        >
          <InfoIcon className="w-4 h-4" />
          <span>View Details</span>
        </button>
      </div>
    </div>
  );
};