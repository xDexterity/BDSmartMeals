import React from 'react';
import { Recipe } from '../types';
import { NutritionChart } from './NutritionChart';
import { XIcon } from './icons/XIcon';

interface RecipeModalProps {
  recipe: Recipe;
  onClose: () => void;
}

export const RecipeModal: React.FC<RecipeModalProps> = ({ recipe, onClose }) => {
  return (
    <div 
      className="fixed inset-0 z-30 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div 
        className="bg-card rounded-2xl shadow-2xl border border-border w-full max-w-4xl max-h-[90vh] flex flex-col animate-in fade-in-0 zoom-in-95"
        onClick={e => e.stopPropagation()}
      >
        <div className="p-6 border-b border-border flex justify-between items-center">
          <div>
            <p className="text-sm font-semibold text-primary capitalize">{recipe.day} - {recipe.mealType}</p>
            <h2 className="text-2xl font-bold text-foreground">{recipe.name}</h2>
          </div>
          <button 
            onClick={onClose}
            className="p-2 rounded-full text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
            aria-label="Close recipe details"
          >
            <XIcon className="w-6 h-6" />
          </button>
        </div>
        
        <div className="flex-grow overflow-y-auto">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8 p-6">
            <div className="md:col-span-3">
              <p className="text-muted-foreground mb-6">{recipe.description}</p>
              
              <h3 className="font-bold text-lg text-foreground mb-3">Instructions</h3>
              <ol className="list-decimal list-inside space-y-3 text-foreground/90">
                {recipe.instructions.map((step, i) => <li key={i}>{step}</li>)}
              </ol>
            </div>
            <div className="md:col-span-2">
              <div className="bg-secondary/50 p-4 rounded-lg border border-border">
                <h3 className="font-bold text-lg text-foreground mb-3">Ingredients</h3>
                <ul className="space-y-2 text-muted-foreground">
                  {recipe.ingredients.map((ing, i) => (
                    <li key={i} className="flex">
                      <span className="font-semibold text-foreground/80 w-24 flex-shrink-0">{ing.amount}</span>
                      <span>{ing.name}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="mt-6">
                <h3 className="font-bold text-lg text-foreground mb-2">Nutritional Info</h3>
                <p className="text-sm text-muted-foreground mb-4">Estimated per serving</p>
                <NutritionChart nutrition={recipe.nutrition} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
