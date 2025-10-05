import React from 'react';
import { UserPreferences } from '../types';
import { DollarSignIcon } from './icons/DollarSignIcon';
import { MapPinIcon } from './icons/MapPinIcon';
import { RadiusIcon } from './icons/RadiusIcon';
import { TargetIcon } from './icons/TargetIcon';
import { ShieldIcon } from './icons/ShieldIcon';
import { CutleryIcon } from './icons/CutleryIcon';

interface PlanSummaryProps {
  preferences: UserPreferences;
}

export const PlanSummary: React.FC<PlanSummaryProps> = ({ preferences }) => {
  return (
    <div className="bg-card p-6 rounded-2xl shadow-lg border border-border">
      <h3 className="text-xl font-bold mb-4">Your Plan Details</h3>
      <ul className="space-y-3 text-sm">
        <li className="flex items-start">
          <DollarSignIcon className="w-5 h-5 mr-3 mt-0.5 text-primary flex-shrink-0" />
          <div>
            <span className="font-semibold text-foreground">Budget: </span>
            <span className="text-muted-foreground">${preferences.weeklyBudget}</span>
          </div>
        </li>
        <li className="flex items-start">
          <MapPinIcon className="w-5 h-5 mr-3 mt-0.5 text-primary flex-shrink-0" />
          <div>
            <span className="font-semibold text-foreground">Location: </span>
            <span className="text-muted-foreground">{preferences.location}</span>
          </div>
        </li>
         <li className="flex items-start">
          <RadiusIcon className="w-5 h-5 mr-3 mt-0.5 text-primary flex-shrink-0" />
          <div>
            <span className="font-semibold text-foreground">Radius: </span>
            <span className="text-muted-foreground">{preferences.travelRadius} km</span>
          </div>
        </li>
        <li className="flex items-start">
          <TargetIcon className="w-5 h-5 mr-3 mt-0.5 text-primary flex-shrink-0" />
          <div>
            <span className="font-semibold text-foreground">Goals: </span>
            <span className="text-muted-foreground">{preferences.goals || 'None specified'}</span>
          </div>
        </li>
        <li className="flex items-start">
          <ShieldIcon className="w-5 h-5 mr-3 mt-0.5 text-primary flex-shrink-0" />
          <div>
            <span className="font-semibold text-foreground">Restrictions: </span>
            <span className="text-muted-foreground">{preferences.dietaryRestrictions || 'None specified'}</span>
          </div>
        </li>
        <li className="flex items-start">
          <CutleryIcon className="w-5 h-5 mr-3 mt-0.5 text-primary flex-shrink-0" />
          <div>
            <span className="font-semibold text-foreground">Meal Types: </span>
            <span className="text-muted-foreground">{preferences.mealTypes.join(', ')}</span>
          </div>
        </li>
      </ul>
    </div>
  );
};