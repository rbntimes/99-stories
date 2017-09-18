import React from 'react';

import './style.css';

export default ({ children, onChange, value }) =>
  <input
    min={10}
    max={50}
    value={value * 10}
    onChange={val => onChange(val)}
    type="range"
  />;
