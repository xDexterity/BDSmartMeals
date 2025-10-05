import React from 'react';
import { ShoppingListItem } from '../types';

interface InteractiveShoppingListProps {
  items: ShoppingListItem[];
  ownedItemIds: Set<string>;
  onToggleItem: (itemId: string) => void;
}

export const InteractiveShoppingList: React.FC<InteractiveShoppingListProps> = ({ items, ownedItemIds, onToggleItem }) => {
  return (
    <div className="bg-card p-6 rounded-2xl shadow-sm border border-border">
      <h3 className="text-xl font-bold mb-4">Your Shopping List</h3>
      <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
        {items.map((item) => (
          <div key={item.id} className="flex items-center">
            <input
              type="checkbox"
              id={`item-${item.id}`}
              checked={ownedItemIds.has(item.id)}
              onChange={() => onToggleItem(item.id)}
              className="h-5 w-5 rounded border-border bg-secondary text-primary focus:ring-primary focus:ring-offset-card"
            />
            <label
              htmlFor={`item-${item.id}`}
              className={`ml-3 flex-grow cursor-pointer ${ownedItemIds.has(item.id) ? 'text-muted-foreground line-through' : 'text-foreground'}`}
            >
              <div className="flex justify-between items-start gap-2">
                <span className="break-words">{item.name}</span>
                <span className="font-medium whitespace-nowrap">${item.price.toFixed(2)}</span>
              </div>
              <div className={`text-xs ${ownedItemIds.has(item.id) ? 'text-muted-foreground/70' : 'text-muted-foreground'}`}>
                {item.purchaseUnit}
              </div>
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};