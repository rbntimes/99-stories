import React, { Component } from 'react';

import fire from './../fire';
import { Link } from 'react-router-dom';

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
    console.log(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(path, value) {
    this.setState({ [path]: value });
  }

  handleSubmit(event) {
    event.preventDefault();
    fire
      .auth()
      .signInWithEmailAndPassword(this.state.email, this.state.pass1)
      .catch(function(error) {});
    this.props.history.push('/');
  }

  render() {
    return [
      <main>
        <form onSubmit={this.handleSubmit}>
          <fieldset>
            <legend>Inloggen</legend>
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
            <input type="submit" value="Submit" />
            <Link to="/register">Nog geen account? Maak deze hier aan</Link>
            <Link to="/">terug</Link>
          </fieldset>
        </form>
      </main>,
      <aside>
        <section>
          <h2>Waarom zou ik registreren?</h2>
          <p>
            Donec id elit non mi porta gravida at eget metus. Nullam quis risus
            eget urna mollis ornare vel eu leo. Nullam id dolor id nibh
            ultricies vehicula ut id elit. Etiam porta sem malesuada magna
            mollis euismod. Donec ullamcorper nulla non metus auctor fringilla.
          </p>
        </section>
      </aside>,
    ];
  }
}

export default Register;
