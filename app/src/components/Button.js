import React from 'react';
import styled from 'styled-components';

const Button = styled.button`
  font-size: 1rem;
  color: ${props => props.color};
`;

export default ({ children, color = 'white', onClick }) =>
  <Button onClick={onClick} color={color}>
    {children}
  </Button>;
