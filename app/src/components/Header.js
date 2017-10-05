import React from 'react';
import { Link } from 'react-router-dom';

import NsLogo from './../components/NsLogo';
import H3 from './../components/H3';
import fire from './../fire';
import './style.css';

export default ({ loggedIn }) =>
  <header>
    <Link to="/">
      <NsLogo color="#fff" />
    </Link>
    {!loggedIn
      ? <div>
          <Link to="/register">Registreren</Link>
          <Link to="/login">Inloggen</Link>
        </div>
      : <button onClick={() => fire.auth().signOut()}> Logout </button>}
    <H3 color="white">nurks</H3>
  </header>;
