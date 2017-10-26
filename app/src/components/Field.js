import React from 'react';

export default ({ label, children, errorMsg, valid }) => [
  <label>
    {label}
    {children}
  </label>,
  <span>{valid === false ? errorMsg : ''}</span>,
];
