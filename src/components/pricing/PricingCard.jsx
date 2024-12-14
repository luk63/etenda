import React from 'react';
import { Button } from '../ui/Button';
import { PricingFeatures } from './PricingFeatures';

export function PricingCard({ plan }) {
  return (
    <div className="relative p-8 bg-white border border-gray-200 rounded-2xl shadow-sm flex flex-col">
      <div className="flex-1">
        <h3 className="text-xl font-semibold text-gray-900">{plan.name}</h3>
        {plan.popular && (
          <p className="absolute top-0 -translate-y-1/2 bg-primary-500 text-white px-3 py-1 text-sm font-semibold rounded-full">
            Most popular
          </p>
        )}
        <p className="mt-4 flex items-baseline text-gray-900">
          <span className="text-5xl font-extrabold tracking-tight">${plan.price}</span>
          <span className="ml-1 text-xl font-semibold">/month</span>
        </p>
        <p className="mt-6 text-gray-500">{plan.description}</p>
        <PricingFeatures features={plan.features} />
      </div>
      <Button
        variant={plan.popular ? 'primary' : 'secondary'}
        className="mt-8 w-full"
      >
        {plan.cta}
      </Button>
    </div>
  );
}