import React from 'react';
import styled from 'styled-components';

const Button = styled.button`
  font-size: 1rem;
  color: ${(props) => props.color};
`;

export default function ({
  children,
  color = 'white',
  onClick,
}) {
  return (
    <Button onClick={onClick} color={color}>{children}</Button>
  )
}
