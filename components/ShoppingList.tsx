import React from 'react';
import { Deal } from '../types';
import { TagIcon } from './icons/TagIcon';
import { MapPinIcon } from './icons/MapPinIcon';

interface ShoppingListProps {
  deals: Deal[];
}

export const ShoppingList: React.FC<ShoppingListProps> = ({ deals }) => {
  const createMapLink = (deal: Deal) => {
    const query = encodeURIComponent(`${deal.store}, ${deal.location}`);
    return `https://www.google.com/maps/search/?api=1&query=${query}`;
  };

  return (
    <div className="bg-card p-6 rounded-2xl shadow-sm border border-border">
      <h3 className="text-xl font-bold mb-4">Top Shopping Deals</h3>
      <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
        {deals.map((deal, index) => (
          <a
            key={index}
            href={createMapLink(deal)}
            target="_blank"
            rel="noopener noreferrer"
            className="block border-b border-border pb-3 last:border-b-0 last:pb-0 hover:bg-muted/50 -mx-3 px-3 rounded-lg transition-colors"
          >
            <p className="font-semibold text-foreground break-words">{deal.ingredientName}</p>
            <div className="flex items-center space-x-2 text-sm text-primary font-semibold mt-1">
                <TagIcon className="w-4 h-4" />
                <span>{deal.price} at <strong>{deal.store}</strong></span>
            </div>
            <div className="flex items-center space-x-2 text-xs text-muted-foreground mt-1.5">
                <MapPinIcon className="w-3 h-3 flex-shrink-0" />
                <span className="break-words">{deal.location}</span>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};