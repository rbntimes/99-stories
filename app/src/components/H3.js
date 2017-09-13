import React from 'react';
import styled from 'styled-components';

const Heading = styled.h3`
  font-size: 1.25rem;
  color: ${(props) => props.color};
`;

function H3({
  children,
  color = 'white',
}) {
  return (
    <Heading color={color}>{children}</Heading>
  )
}

export default H3;
