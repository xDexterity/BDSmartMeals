import React, { useState, useMemo, useEffect } from 'react';
import { Header } from './components/Header';
import { MealPlanner } from './components/MealPlanner';
import { RecipeTabs } from './components/RecipeTabs';
import { RecipeModal } from './components/RecipeModal';
import { ShoppingList } from './components/ShoppingList';
import { InteractiveShoppingList } from './components/InteractiveShoppingList';
import { Spinner } from './components/Spinner';
import { generateMealPlan } from './services/geminiService';
import { MealPlan, Recipe, UserPreferences } from './types';
import { ArrowDownIcon } from './components/icons/ArrowDownIcon';
import { HeroIllustration } from './components/icons/HeroIllustration';
import { PlanSummary } from './components/PlanSummary';
import { MobileNav } from './components/MobileNav';

const loadingMessages = [
  "Crafting your personalized recipes...",
  "Analyzing nutritional information...",
  "Scouring local stores for the best deals...",
  "Building your shopping list...",
  "This can take a moment, good things are worth the wait!",
];

export default function App() {
  const [mealPlan, setMealPlan] = useState<MealPlan | null>(null);
  const [planPreferences, setPlanPreferences] = useState<UserPreferences | null>(null);
  const [recipeInModal, setRecipeInModal] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [ownedIngredients, setOwnedIngredients] = useState<Set<string>>(new Set());
  const [activeDay, setActiveDay] = useState<string>('Monday');
  const [mobileView, setMobileView] = useState<'recipes' | 'shopping' | 'plan'>('recipes');

  useEffect(() => {
    if (mealPlan && mealPlan.recipes.length > 0) {
      const firstDayWithRecipes = mealPlan.recipes[0].day;
      setActiveDay(firstDayWithRecipes);
      setMobileView('recipes');
    }
  }, [mealPlan]);


  const handleGeneratePlan = async (preferences: UserPreferences) => {
    setLoading(true);
    setError(null);
    setMealPlan(null);
    setRecipeInModal(null);
    setOwnedIngredients(new Set());
    setPlanPreferences(null);
    try {
      const plan = await generateMealPlan(preferences);
      setMealPlan(plan);
      setPlanPreferences(preferences);
    } catch (err) {
      setError('Failed to generate meal plan. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleOwnedIngredient = (itemId: string) => {
    setOwnedIngredients(prev => {
      const newSet = new Set(prev);
      if (newSet.has(itemId)) {
        newSet.delete(itemId);
      } else {
        newSet.add(itemId);
      }
      return newSet;
    });
  };

  const adjustedCost = useMemo(() => {
    if (!mealPlan) return 0;
    const ownedItemsCost = mealPlan.shoppingList.reduce((acc, item) => {
      if (ownedIngredients.has(item.id)) {
        return acc + item.price;
      }
      return acc;
    }, 0);
    return mealPlan.totalEstimatedCost - ownedItemsCost;
  }, [mealPlan, ownedIngredients]);

  const groupRecipesByDay = (recipes: Recipe[]): Record<string, Recipe[]> => {
    return recipes.reduce((acc, recipe) => {
      const day = recipe.day;
      if (!acc[day]) {
        acc[day] = [];
      }
      acc[day].push(recipe);
      return acc;
    }, {} as Record<string, Recipe[]>);
  };

  const renderDashboardContent = () => (
    <>
      {/* Desktop Layout */}
      <div className="hidden lg:grid grid-cols-1 lg:grid-cols-12 gap-8">
        <aside className="lg:col-span-4 xl:col-span-3">
          <div className="sticky top-24 space-y-8">
            {planPreferences && <PlanSummary preferences={planPreferences} />}
            <MealPlanner onGeneratePlan={handleGeneratePlan} isLoading={loading} />
          </div>
        </aside>

        <div className="lg:col-span-8 xl:col-span-6">
          <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
            <h2 className="text-3xl font-bold">Your Weekly Plan</h2>
            {mealPlan && mealPlan.totalEstimatedCost > 0 && (
              <div className="bg-card border border-border rounded-lg px-4 py-2 text-center shadow-sm">
                <p className="text-sm font-semibold text-primary">Est. Weekly Cost</p>
                <p className="text-3xl font-bold">${adjustedCost.toFixed(2)}</p>
                {ownedIngredients.size > 0 && (
                  <p className="text-xs line-through text-muted-foreground">
                    ${mealPlan.totalEstimatedCost.toFixed(2)}
                  </p>
                )}
              </div>
            )}
          </div>
          {mealPlan && <RecipeTabs
            recipesByDay={groupRecipesByDay(mealPlan.recipes)}
            activeDay={activeDay}
            setActiveDay={setActiveDay}
            onSelectRecipe={setRecipeInModal}
          />}
        </div>

        <aside className="hidden xl:block xl:col-span-3">
          {mealPlan && (
            <div className="sticky top-24 space-y-8">
              <InteractiveShoppingList
                items={mealPlan.shoppingList}
                ownedItemIds={ownedIngredients}
                onToggleItem={handleToggleOwnedIngredient}
              />
              <ShoppingList deals={mealPlan.deals} />
            </div>
          )}
        </aside>
      </div>

      {/* Mobile Layout */}
      <div className="lg:hidden pb-20">
        {mobileView === 'recipes' && mealPlan && (
          <div>
            <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
              <h2 className="text-3xl font-bold">Your Weekly Plan</h2>
              {mealPlan.totalEstimatedCost > 0 && (
                <div className="bg-card border border-border rounded-lg px-4 py-2 text-center shadow-sm">
                  <p className="text-sm font-semibold text-primary">Est. Cost</p>
                  <p className="text-2xl font-bold">${adjustedCost.toFixed(2)}</p>
                  {ownedIngredients.size > 0 && (
                    <p className="text-xs line-through text-muted-foreground">
                      ${mealPlan.totalEstimatedCost.toFixed(2)}
                    </p>
                  )}
                </div>
              )}
            </div>
            <RecipeTabs
              recipesByDay={groupRecipesByDay(mealPlan.recipes)}
              activeDay={activeDay}
              setActiveDay={setActiveDay}
              onSelectRecipe={setRecipeInModal}
            />
          </div>
        )}

        {mobileView === 'shopping' && mealPlan && (
          <div className="space-y-8">
            <InteractiveShoppingList
              items={mealPlan.shoppingList}
              ownedItemIds={ownedIngredients}
              onToggleItem={handleToggleOwnedIngredient}
            />
            <ShoppingList deals={mealPlan.deals} />
          </div>
        )}
        
        {mobileView === 'plan' && (
          <div className="space-y-8">
             {planPreferences && <PlanSummary preferences={planPreferences} />}
             <MealPlanner onGeneratePlan={handleGeneratePlan} isLoading={loading} />
          </div>
        )}
      </div>
    </>
  );

  return (
    <div className="min-h-screen bg-secondary/50">
      <Header />
      <main>
        {(!mealPlan && !loading && !error) ? (
          <>
            <div className="relative isolate min-h-screen flex items-center">
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                  <div className="text-center lg:text-left fade-in-up" style={{ animationDelay: '200ms' }}>
                    <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
                      Eat Smarter, <span className="text-primary">Spend Less</span>
                    </h1>
                    <p className="mt-6 text-lg text-muted-foreground">
                      Stop wondering what's for dinner. Get personalized weekly meal plans that fit your budget, diet, and taste. We find the deals so you don't have to.
                    </p>
                    <div className="mt-10 flex items-center justify-center lg:justify-start">
                      <p className="flex items-center text-sm font-semibold leading-6">
                        Scroll down to plan <ArrowDownIcon className="w-4 h-4 ml-2 animate-bounce" />
                      </p>
                    </div>
                  </div>
                  <div className="zoom-in-effect flex justify-center items-center" style={{ animationDelay: '400ms' }}>
                    <HeroIllustration className="w-full max-w-lg h-auto text-foreground" />
                  </div>
                </div>
              </div>
            </div>

            <div id="planner" className="py-12 sm:py-16">
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-2xl">
                  <MealPlanner onGeneratePlan={handleGeneratePlan} isLoading={loading} />
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
            {loading && (
              <div className="flex items-center justify-center min-h-[60vh]">
                <Spinner messages={loadingMessages} />
              </div>
            )}
            {error && <p className="text-center text-red-500">{error}</p>}
            {mealPlan && renderDashboardContent()}
          </div>
        )}
      </main>
      {recipeInModal && <RecipeModal recipe={recipeInModal} onClose={() => setRecipeInModal(null)} />}
      {mealPlan && !loading && <MobileNav activeView={mobileView} setActiveView={setMobileView} />}
    </div>
  );
}
