import React from 'react';

export function SectionHeading({ label, title, className = '' }) {
  return (
    <div className={className}>
      <h2 className="text-sm font-semibold tracking-wide uppercase text-purple-400 mb-3">
        {label}
      </h2>
      <p className="text-3xl sm:text-4xl font-bold">
        {title}
      </p>
    </div>
  );
}