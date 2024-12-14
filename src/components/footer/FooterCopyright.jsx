import React from 'react';

export function FooterCopyright() {
  return (
    <div className="mt-12 border-t border-gray-200 pt-8">
      <p className="text-base text-gray-400 xl:text-center">
        © {new Date().getFullYear()} eTender Platform. All rights reserved.
      </p>
    </div>
  );
}