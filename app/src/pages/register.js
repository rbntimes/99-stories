import React, { Component } from 'react';

import fire from './../fire';
import { Link } from 'react-router-dom';

import P from './../components/P';
import H3 from './../components/H3';
import Field from './../components/Field';

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      pass1: '',
      pass2: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(path, value) {
    this.setState({ [path]: value });
  }

  handleSubmit(event) {
    fire
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.pass1)
      .catch(function(error) {
        // var errorCode = error.code;
        // var errorMessage = error.message;
      });
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <H3>Registreren</H3>
        <P>Hieronder kunt u zich registreren</P>
        <Field label="Email:">
          <input
            value={this.state.email}
            onChange={e => this.handleChange('email', e.target.value)}
            type="email"
          />
        </Field>
        <Field label="Wachtwoord:">
          <input
            value={this.state.pass1}
            onChange={e => this.handleChange('pass1', e.target.value)}
            type="password"
          />
        </Field>
        <Field label="Herhaal wachtwoord:">
          <input
            value={this.state.pass2}
            onChange={e => this.handleChange('pass2', e.target.value)}
            type="password"
          />
        </Field>
        <input type="submit" value="Submit" />
        <Link to="/">terug</Link>
      </form>
    );
  }
}

export default Register;
