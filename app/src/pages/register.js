import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import styled from 'styled-components';

import P from './../components/P';
import H3 from './../components/H3';
import Field from './../components/Field';

export default () =>
  <form>
    <H3>Registreren</H3>
    <P>Hieronder kunt u zich registreren</P>
    <Field label="Gebruikersnaam:">
      <input />
    </Field>
    <Field label="Email:">
      <input type="email" />
    </Field>
    <Field label="Wachtwoord:">
      <input type="password" />
    </Field>
    <Field label="Herhaal wachtwoord:">
      <input type="password" />
    </Field>
    <Link to="/">terug</Link>
  </form>;
