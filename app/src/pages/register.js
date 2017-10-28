import React, { Component } from 'react';

import fire from './../fire';
import { Link } from 'react-router-dom';

import Field from './../components/Field';

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      pass1: '',
      pass2: '',
      displayName: '',
      formValid: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.validateInput = this.validateInput.bind(this);
  }

  validateInput(path, value) {
    var emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{8,}$/;
    switch (path) {
      case 'email':
        this.setState({
          emailValid: emailRegex.test(value),
        });
        break;
      case 'pass1':
        this.setState({
          passwordValid: passwordRegex.test(value),
        });
      case 'pass2':
        this.setState({
          passwordsIdentical:
            this.state.passwordValid && this.state.pass1 === this.state.pass2,
        });
      default:
        console.log('hij is er');
        if (this.state.passwordsIdentical && this.state.emailValid) {
          this.setState({ formValid: true });
        } else {
          this.setState({ formValid: false });
        }
    }
  }

  handleChange(path, value) {
    this.setState({ [path]: value });
  }

  handleSubmit(event) {
    event.preventDefault();
    const { history } = this.props;
    const { displayName } = this.state;
    fire
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.pass1)
      .catch(function(error) {
        // Check email hier
        // var errorCode = error.code;
        // var errorMessage = error.message;
      })
      .then(function(user) {
        user.updateProfile({
          displayName: displayName,
        });
        history.push('/');
      });
    event.preventDefault();
  }

  render() {
    console.log(this.state);
    return [
      <section>
        <h2>Uw persoonlijke account</h2>
      </section>,
      <main twocol="true">
        <section>
          <form onSubmit={this.handleSubmit}>
            <fieldset>
              <legend>Registreren</legend>
              <Field
                label="Email:"
                errorMsg="Vul een geldig email in..."
                valid={this.state.emailValid}
              >
                <input
                  value={this.state.email}
                  onBlur={() => this.validateInput('email', this.state.email)}
                  onChange={e => this.handleChange('email', e.target.value)}
                  type="email"
                />
              </Field>
              <Field
                label="Wachtwoord:"
                errorMsg="Je wachtwoord moet 8 karakters hebben, inclusief een hoofdletter, kleine letter, getal en speciaal teken"
                valid={this.state.passwordValid}
              >
                <input
                  value={this.state.pass1}
                  onBlur={() => this.validateInput('pass1', this.state.pass1)}
                  onChange={e => this.handleChange('pass1', e.target.value)}
                  type="password"
                />
              </Field>
              <Field
                label="Herhaal achtwoord:"
                errorMsg="Je wachtwoorden komen niet overeen"
                valid={this.state.passwordsIdentical}
              >
                <input
                  value={this.state.pass2}
                  onBlur={() => this.validateInput('pass2', this.state.pass2)}
                  onChange={e => this.handleChange('pass2', e.target.value)}
                  type="password"
                />
              </Field>
              <Field label="Weergavenaam:">
                <input
                  value={this.state.displayName}
                  onChange={e =>
                    this.handleChange('displayName', e.target.value)}
                  type="text"
                />
              </Field>
              <input
                disabled={
                  !(this.state.passwordsIdentical && this.state.emailValid)
                }
                type="submit"
                value="Submit"
              />
            </fieldset>
            <span>
              <Link to="/login">Al een account? Log dan hier in</Link>
              <Link to="/">terug</Link>
            </span>
          </form>
        </section>
      </main>,
      <aside>
        <section>
          <h3>Waarom zou ik registreren?</h3>
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
