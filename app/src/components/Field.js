import React from 'react';
import styled from 'styled-components';

const Label = styled.label`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export default function ({
  label,
  children,
}) {
  return (
    <Label>
      {label}
      {children}
    </Label>
  )
}
