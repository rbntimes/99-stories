import React from 'react';
import styled from 'styled-components';

const H3 = styled.h3`
  font-size: 1.25rem;
  color: ${(props) => props.color};
`;

export default function({
  children,
  color = 'rgba(0,48,130,.8)',
}) {
  return (
    <H3 color={color}>{children}</H3>
  )
}
