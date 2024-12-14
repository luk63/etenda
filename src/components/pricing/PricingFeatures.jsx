import React from 'react';

export function PricingFeatures({ features }) {
  return (
    <ul className="mt-6 space-y-6">
      {features.map((feature) => (
        <li key={feature} className="flex">
          <span className="text-primary-500">✓</span>
          <span className="ml-3 text-gray-500">{feature}</span>
        </li>
      ))}
    </ul>
  );
}