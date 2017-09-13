import React from 'react';
import styled from 'styled-components';

const Slider = styled.input`
  font-size: 1.25rem;
  width: 100%;
  color: white;
`;

export default function ({
  children,
  onChange,
  value,
}) {
  return (
    <Slider
      width="500px"
      min={1}
      max={50}
      step={1}
      value={value}
      onChange={val => onChange(val)}
      type="range" />
  )
}
