import React from 'react';
import styled from 'styled-components';

const Heading = styled.h1`
  font-size: 2.375rem;
  line-height: 2.375rem;
  color: #003082;
  font-weight: 100;
`;

function H1({
  children,
}) {
  return (
    <Heading>{children}</Heading>
  )
}

export default H1;
