import React from 'react';

export const LeafIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.7"
    strokeLinecap="round"
    strokeLinejoin="round"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    {/* Plate */}
    <circle cx="12" cy="12" r="10" />
    <path d="M17.65 6.35A6 6 0 0 0 6.35 6.35" />
    <path d="M6.35 17.65A6 6 0 0 0 17.65 17.65" />
    
    {/* Spoon (top-left to bottom-right) */}
    <path d="M5.5 18.5 L18.5 5.5" />
    <path d="M5.64 8.78a4 4 0 0 1 0-5.66l5.66 5.66a4 4 0 0 1-5.66 0Z" />
    <path d="M6.7 7.7a1.5 1.5 0 0 1 0-2.12l2.12 2.12a1.5 1.5 0 0 1-2.12 0Z" />
    <circle cx="18" cy="18" r="0.5" fill="currentColor" stroke="none" />
    
    {/* Fork (top-right to bottom-left) */}
    <path d="M18.5 18.5 L5.5 5.5" />
    <path d="M18.5 5.5 L16 8" />
    <path d="M19.5 6.5 L17 9" />
    <path d="M17.5 4.5 L15 7" />
    <path d="M16.5 3.5 L14 6" />
    <circle cx="6" cy="18" r="0.5" fill="currentColor" stroke="none" />
  </svg>
);
