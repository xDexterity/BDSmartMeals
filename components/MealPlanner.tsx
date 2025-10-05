import React, { useState } from 'react';
import { UserPreferences } from '../types';

interface MealPlannerProps {
  onGeneratePlan: (preferences: UserPreferences) => void;
  isLoading: boolean;
}

const MEAL_OPTIONS = ['Breakfast', 'Lunch', 'Dinner', 'Snack'];

export const MealPlanner: React.FC<MealPlannerProps> = ({ onGeneratePlan, isLoading }) => {
  const [dietaryRestrictions, setDietaryRestrictions] = useState('');
  const [goals, setGoals] = useState('');
  const [weeklyBudget, setWeeklyBudget] = useState<number | string>(100);
  const [location, setLocation] = useState('');
  const [mealTypes, setMealTypes] = useState<string[]>(['Lunch', 'Dinner']);
  const [travelRadius, setTravelRadius] = useState(10);

  const handleMealTypeChange = (meal: string) => {
    setMealTypes(prev =>
      prev.includes(meal)
        ? prev.filter(m => m !== meal)
        : [...prev, meal]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onGeneratePlan({
      dietaryRestrictions,
      goals,
      weeklyBudget: Number(weeklyBudget) || 0,
      location: location || 'Toronto, ON', // Default value if empty
      mealTypes,
      travelRadius,
    });
  };

  const handleBudgetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Allow empty string to clear the input, otherwise parse as integer
    if (value === '') {
      setWeeklyBudget('');
    } else {
      const numberValue = parseInt(value, 10);
      if (!isNaN(numberValue)) {
        setWeeklyBudget(numberValue);
      }
    }
  };

  return (
    <div className="bg-card p-6 md:p-8 rounded-2xl shadow-lg border border-border">
      <h2 className="text-2xl font-bold mb-6">Plan Your Week</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="budget" className="block text-sm font-semibold mb-2">Weekly Budget</label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-muted-foreground">$</span>
            <input
              type="number"
              id="budget"
              value={weeklyBudget}
              onChange={handleBudgetChange}
              className="w-full pl-7 pr-4 py-2 rounded-lg bg-secondary border border-border focus:ring-2 focus:ring-primary focus:border-primary transition"
              placeholder="100"
            />
          </div>
        </div>

        <div>
          <label htmlFor="location" className="block text-sm font-semibold mb-2">Your Location</label>
          <input
            type="text"
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full px-4 py-2 rounded-lg bg-secondary border border-border focus:ring-2 focus:ring-primary focus:border-primary transition"
            placeholder="e.g., Toronto, ON"
          />
        </div>

        <div>
            <label htmlFor="radius" className="block text-sm font-semibold mb-2">Travel Radius: <span className="font-bold text-primary">{travelRadius} km</span></label>
            <input
                type="range"
                id="radius"
                min="1"
                max="25"
                value={travelRadius}
                onChange={(e) => setTravelRadius(Number(e.target.value))}
                className="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer accent-primary"
            />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2">Meal Types</label>
          <div className="grid grid-cols-2 gap-2">
            {MEAL_OPTIONS.map(meal => (
              <button
                key={meal}
                type="button"
                onClick={() => handleMealTypeChange(meal)}
                className={`px-4 py-2 rounded-lg text-sm font-semibold border-2 transition-colors ${
                  mealTypes.includes(meal)
                    ? 'bg-primary border-primary text-primary-foreground'
                    : 'bg-secondary border-border hover:border-primary/50'
                }`}
              >
                {meal}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label htmlFor="goals" className="block text-sm font-semibold mb-2">Health & Dietary Goals</label>
          <input
            id="goals"
            value={goals}
            onChange={(e) => setGoals(e.target.value)}
            className="w-full px-4 py-2 rounded-lg bg-secondary border border-border focus:ring-2 focus:ring-primary focus:border-primary transition"
            placeholder="e.g., High protein, low carb"
          />
        </div>

        <div>
          <label htmlFor="restrictions" className="block text-sm font-semibold mb-2">Dietary Restrictions</label>
          <input
            id="restrictions"
            value={dietaryRestrictions}
            onChange={(e) => setDietaryRestrictions(e.target.value)}
            className="w-full px-4 py-2 rounded-lg bg-secondary border border-border focus:ring-2 focus:ring-primary focus:border-primary transition"
            placeholder="e.g., Gluten-free, no nuts"
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-primary text-primary-foreground font-bold py-3 px-4 rounded-lg hover:bg-primary/90 transition-colors disabled:bg-primary/50 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Generating...' : 'Generate Meal Plan'}
        </button>
      </form>
    </div>
  );
};
