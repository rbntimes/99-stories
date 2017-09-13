import React from 'react';
import styled from 'styled-components';

const Paragraph = styled.p`
  font-size: 1rem;
`;

export default function({
  children,
}) {
  return (
    <Paragraph>{children}</Paragraph>
  )
}
