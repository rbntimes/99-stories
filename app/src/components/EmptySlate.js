import React from 'react';
import styled from 'styled-components';

const H3 = styled.h3`
  font-size: 1.25rem;
  color: ${props => props.color};
`;

export default ({ children, color = 'rgba(0,48,130,.8)' }) => (
  <H3 color={color}>Het lijkt er op dat je alles gezien hebt</H3>
);
