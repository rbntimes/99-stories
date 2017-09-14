import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import styled from 'styled-components';

import H3 from './../components/H3';
import Field from './../components/Field';

const Form = styled.form`
  border: 1px solid red;
`;

const Input = styled.input`

`;

class App extends Component {
  render() {
    return (
      <Form>
        <H3>Registreren</H3>
        <Field label="Gebruikersnaam:">
          <Input />
        </Field>
        <Field label="Wachtwoord:">
          <Input type="password" />
        </Field>
       <Link to="/">terug</Link>
     </Form>
    );
  }
}

export default App;
