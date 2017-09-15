import React from 'react';
import styled from 'styled-components';

import NsLogo from './../components/NsLogo';
import H3 from './../components/H3';
import { Link } from 'react-router-dom';

const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 1rem;
  background-color: rgba(0,48,130,.8);
  box-shadow: 0 0.125rem 0 0 rgba(7,7,33,.15);
`;

export default function() {
  return (
    <Header>
      <Link to="/"><NsLogo color="#fff" /></Link>
      <H3 color="white">
        x nurks
      </H3>
    </Header>
  )
}