import React from 'react';

export function FooterContact() {
  return (
    <div>
      <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
        Contact
      </h3>
      <ul className="mt-4 space-y-4">
        <li>
          <a href="mailto:support@etenderplatform.com" className="text-base text-gray-500 hover:text-gray-900">
            support@etenderplatform.com
          </a>
        </li>
        <li className="text-base text-gray-500">
          +123 456 7890
        </li>
      </ul>
    </div>
  );
}