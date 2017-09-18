import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import H3 from './../components/H3';
import Field from './../components/Field';

export default () =>
  <form>
    <H3>Registreren</H3>
    <Field label="Gebruikersnaam:">
      <input />
    </Field>
    <Field label="Wachtwoord:">
      <input type="password" />
    </Field>
    <Link to="/">terug</Link>
  </form>;
