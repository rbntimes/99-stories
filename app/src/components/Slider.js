import React from 'react';

import './style.css';

export default function({ children, onChange, value }) {
  return (
    <input
      min={10}
      max={50}
      value={value * 10}
      onChange={val => onChange(val)}
      type="range"
    />
  );
}
