import React from 'react';
import styled from 'styled-components';

const Paragraph = styled.p`
  font-size: 1rem;
`;

function P({
  children,
}) {
  return (
    <Paragraph>{children}</Paragraph>
  )
}

export default P;
