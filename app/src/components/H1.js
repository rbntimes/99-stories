import React from 'react';
import styled from 'styled-components';

const H1 = styled.h1`
  font-size: 2.375rem;
  line-height: 2.375rem;
  color: #003082;
  font-weight: 100;
`;

export default ({ children }) =>
  <H1>
    {children}
  </H1>;
