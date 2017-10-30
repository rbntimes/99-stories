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
      <section>
        <h2>Uw persoonlijke account!</h2>
      </section>,
      <main twocol="true">
        <section>
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
            </fieldset>
            <span>
              <Link to="/register">Maak een account aan</Link>
              <Link to="/">terug</Link>
            </span>
          </form>
        </section>
      </main>,
      <aside>
        <section>
          <h2>Wat kan ik met een account?</h2>
          <p>
            Door te registreren kunt u reageren op mijn stijloefeningen of op
            andere gebruikers op de site! Ook houdt ik bij wat je al gelezen
            hebt, zo lees je nooit iets dubbel
          </p>
          <p>
            Reageren kan op alles. Zie jij een spelfout, ben jij het niet met
            mij eens of slaat de reactie van een van de andere reageerders
            nergens op? Laat het me weten, ik lees graag wat jullie hebben te
            schrijven.
          </p>
        </section>
      </aside>,
    ];
  }
}

export default Register;
