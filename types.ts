
export type Theme = 'light' | 'dark' | 'high-contrast';

export interface UserPreferences {
  dietaryRestrictions: string;
  goals: string;
  weeklyBudget: number;
  location: string;
  mealTypes: string[];
  travelRadius: number;
}

export interface Ingredient {
  name: string;
  amount: string;
}

export interface NutritionInfo {
  calories: number;
  protein: number;
  carbohydrates: number;
  fat: number;
  sugar?: number;
  fiber?: number;
  sodium?: number;
}

export interface Recipe {
  day: string;
  mealType: string;
  name: string;
  description: string;
  ingredients: Ingredient[];
  instructions: string[];
  nutrition: NutritionInfo;
}

export interface Deal {
  ingredientName: string;
  store: string;
  price: string;
  location: string;
}

export interface ShoppingListItem {
    id: string;
    name: string;
    purchaseUnit: string;
    price: number;
}

export interface MealPlan {
  recipes: Recipe[];
  shoppingList: ShoppingListItem[];
  deals: Deal[];
  totalEstimatedCost: number;
}