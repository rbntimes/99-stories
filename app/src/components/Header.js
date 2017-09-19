import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import NsLogo from './../components/NsLogo';
import H3 from './../components/H3';

import './style.css';

export default () =>
  <header>
    <Link to="/">
      <NsLogo color="#fff" />
    </Link>
    <Link to="/register">Registreren</Link>/
    <Link to="/login">Inloggen</Link>
    <H3 color="white">x nurks</H3>
  </header>;
