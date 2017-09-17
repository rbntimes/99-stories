import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import styled from 'styled-components';

import P from './../components/P';
import H3 from './../components/H3';
import Field from './../components/Field';

const Form = styled.form`border: 1px solid red;`;

const Input = styled.input``;

class App extends Component {
  render() {
    return (
      <Form>
        <H3>Registreren</H3>
        <P>Hieronder kunt u zich registreren</P>
        <Field label="Gebruikersnaam:">
          <Input />
        </Field>
        <Field label="Email:">
          <Input type="email" />
        </Field>
        <Field label="Wachtwoord:">
          <Input type="password" />
        </Field>
        <Field label="Herhaal wachtwoord:">
          <Input type="password" />
        </Field>
        <Link to="/">terug</Link>
      </Form>
    );
  }
}

export default App;
