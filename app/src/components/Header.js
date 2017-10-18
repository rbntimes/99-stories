import React from 'react';
import { Link } from 'react-router-dom';

import NsLogo from './../components/NsLogo';
import fire from './../fire';
import './style.css';

export default ({ loggedIn }) => (
  <header>
    <nav>
      <Link to="/">
        <NsLogo color="#fff" />
      </Link>
      {!loggedIn ? (
        <Link to="/login">Mijn account</Link>
      ) : (
        <a onClick={() => fire.auth().signOut()}> Logout </a>
      )}
    </nav>
  </header>
);
