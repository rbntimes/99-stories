import React from 'react';

import './style.css';

export default ({ onChange, value }) =>
  <input
    min={0.1}
    max={5}
    step={0.01}
    value={value}
    onChange={e => onChange(e.target.value)}
    type="range"
  />;
