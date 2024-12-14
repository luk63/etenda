import React from 'react';
import { navigation } from '../../constants/navigation';

export function FooterNavigation() {
  return (
    <div>
      <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
        Navigation
      </h3>
      <ul className="mt-4 space-y-4">
        {navigation.map((item) => (
          <li key={item.name}>
            <a href={item.href} className="text-base text-gray-500 hover:text-gray-900">
              {item.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}