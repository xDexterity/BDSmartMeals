import { GoogleGenAI, Type, GenerateContentResponse } from "@google/genai";
import { MealPlan, UserPreferences } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

const recipeSchema = {
    type: Type.OBJECT,
    properties: {
        day: { type: Type.STRING, description: "Day of the week, e.g., 'Monday'" },
        mealType: { type: Type.STRING, description: "The type of meal, e.g., 'Breakfast', 'Lunch', 'Dinner', 'Snack'." },
        name: { type: Type.STRING },
        description: { type: Type.STRING, description: "A short, appealing description of the meal." },
        ingredients: {
            type: Type.ARRAY,
            items: {
                type: Type.OBJECT,
                properties: {
                    name: { type: Type.STRING },
                    amount: { type: Type.STRING, description: "The amount needed for the recipe, e.g., '2 cups' or '100g'" },
                },
                required: ["name", "amount"]
            }
        },
        instructions: {
            type: Type.ARRAY,
            items: { type: Type.STRING }
        },
        nutrition: {
            type: Type.OBJECT,
            properties: {
                calories: { type: Type.NUMBER },
                protein: { type: Type.NUMBER, description: "in grams" },
                carbohydrates: { type: Type.NUMBER, description: "in grams" },
                fat: { type: Type.NUMBER, description: "in grams" },
                sugar: { type: Type.NUMBER, description: "in grams" },
                fiber: { type: Type.NUMBER, description: "in grams" },
                sodium: { type: Type.NUMBER, description: "in milligrams" },
            },
            required: ["calories", "protein", "carbohydrates", "fat"]
        }
    },
    required: ["day", "mealType", "name", "description", "ingredients", "instructions", "nutrition"]
};

const shoppingListItemSchema = {
    type: Type.OBJECT,
    properties: {
        id: { type: Type.STRING, description: "A unique identifier for this shopping list item, e.g., 'item-1'." },
        name: { type: Type.STRING, description: "The name of the ingredient to buy." },
        purchaseUnit: { type: Type.STRING, description: "The standard unit you would buy at a store. e.g., '1 jar (16 oz)', '1 bunch', '1 loaf'." },
        price: { type: Type.NUMBER, description: "The estimated price for the entire purchasable unit (e.g., the whole jar, not just 2 tbsp)." },
    },
    required: ["id", "name", "purchaseUnit", "price"]
};

const dealSchema = {
    type: Type.OBJECT,
    properties: {
        ingredientName: { type: Type.STRING },
        store: { type: Type.STRING, description: "The real, verifiable name of a grocery store (can be a major supermarket chain or a local business). The store MUST actually exist in the user's specified city. Do not invent store names." },
        price: { type: Type.STRING, description: "e.g., '$2.99/lb' or '2 for $5'" },
        location: { type: Type.STRING, description: "ABSOLUTE & NON-NEGOTIABLE REQUIREMENT: The 100% complete, real, and verifiable street address for the specified store. This address must point to a currently operating store on Google Maps. A single inaccurate address is a total failure. If you are not 100% certain of the building number and street, you MUST NOT include the deal." }
    },
    required: ["ingredientName", "store", "price", "location"]
};


const mealPlanSchema = {
    type: Type.OBJECT,
    properties: {
        recipes: {
            type: Type.ARRAY,
            description: "An array of recipe objects for the specified meal types for each day of the week.",
            items: recipeSchema
        },
        shoppingList: {
            type: Type.ARRAY,
            description: "A consolidated list of unique ingredients to purchase for all recipes for the entire week.",
            items: shoppingListItemSchema
        },
        deals: {
            type: Type.ARRAY,
            description: "A list of 3-5 deals for ingredients from the shopping list. Use real stores and locations based on the user's provided city and within their travel radius.",
            items: dealSchema
        },
        totalEstimatedCost: {
            type: Type.NUMBER,
            description: "The total estimated cost for the entire week. This must be the sum of all prices in the 'shoppingList'."
        }
    },
    required: ["recipes", "shoppingList", "deals", "totalEstimatedCost"]
};


export const generateMealPlan = async (preferences: UserPreferences): Promise<MealPlan> => {
    const { dietaryRestrictions, goals, weeklyBudget, location, mealTypes, travelRadius } = preferences;

    const prompt = `
        Act as a professional nutritionist and chef. Create a 7-day meal plan for one person based on these preferences:
        - **Location for Deals:** ${location} (within a ${travelRadius} km radius)
        - **Weekly Budget:** $${weeklyBudget}
        - **Goals:** ${goals}
        - **Restrictions:** ${dietaryRestrictions || 'None'}
        - **Meals:** ${mealTypes.join(', ')}

        **Response requirements (must be a single JSON object):**
        1.  **Recipes:** A diverse 7-day plan with one recipe for each requested meal type per day. Include description, ingredients (name, amount), step-by-step instructions, and nutrition info (calories, protein, carbs, fat).
        2.  **Shopping List:** A consolidated list of all ingredients needed. For each item, provide:
            - A unique 'id'.
            - The ingredient 'name'.
            - The 'purchaseUnit' (e.g., '1 jar', '1 bunch', not recipe amounts like '2 tbsp').
            - A realistic 'price' for that entire unit (must be a number).
        3.  **Deals:** A list of 3-5 deals on shopping list items.
            - **CRITICAL:** Deals must come from real, verifiable grocery stores within the user's location and travel radius.
            - **ADDRESS ACCURACY is PARAMOUNT.** Provide the full, correct street address. If an address cannot be 100% verified on a map, do not include the deal. It is better to have fewer, accurate deals than many inaccurate ones.
        4.  **Total Cost:** The 'totalEstimatedCost' must be the sum of all item prices in the shopping list.

        Ensure temperatures use the degree symbol (e.g., 400°F). The entire response must strictly follow the provided JSON schema.
    `;

    try {
        const stream = await ai.models.generateContentStream({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                temperature: 0.2,
                responseMimeType: "application/json",
                responseSchema: mealPlanSchema
            }
        });

        let fullText = '';
        for await (const chunk of stream) {
            fullText += chunk.text;
        }
        
        const mealPlanData = JSON.parse(fullText);
        
        // Ensure recipes are sorted by a logical day order
        const dayOrder = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
        mealPlanData.recipes.sort((a, b) => dayOrder.indexOf(a.day) - dayOrder.indexOf(b.day));

        return mealPlanData as MealPlan;

    } catch (error) {
        console.error("Error generating meal plan with Gemini:", error);
        throw new Error("Failed to parse meal plan from AI response.");
    }
};