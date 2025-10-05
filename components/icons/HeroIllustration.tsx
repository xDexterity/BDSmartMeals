import React from 'react';

export const HeroIllustration = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    {/* Plate */}
    <circle cx="12" cy="12" r="7" />
    
    {/* Fork on the left */}
    <path d="M4 20V10" />
    <path d="M4 10 V 4" />
    <path d="M4 10 C 2 8, 2 4, 2 4" />
    <path d="M4 10 C 6 8, 6 4, 6 4" />

    {/* Knife on the right */}
    <path d="M20 20V9" />
    <path d="M20 9L20 4C18.5 5.5, 18.5 7, 20 9Z" />
  </svg>
);
