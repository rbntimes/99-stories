import React, { Component } from 'react';

import getOr from 'lodash/fp/getOr';
import { Link } from 'react-router-dom';

import P from './../components/P';
import H1 from './../components/H1';
import fire from './../fire';

import constants from './../constants';

function setReadingNiveau(user, niveau) {
  fire
    .database()
    .ref(`users/${user.uid}`)
    .set({
      niveau: niveau,
    });
}

class Setup extends Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      niveau: props.niveau,
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({ niveau: event.target.value });
  }

  render() {
    const { user } = this.props;
    return [
      <main>
        <H1>Hoe lees jij graag?</H1>
        <P>
          {getOr(
            'Geen tekst gevonden',
            [Math.ceil(this.state.niveau), 'text'],
            constants
          )}
        </P>
      </main>,
      <footer>
        <input
          min={0.01}
          max={5}
          step={0.01}
          type="range"
          onChange={this.handleChange}
          value={this.state.niveau}
        />
        <button
          onClick={() => setReadingNiveau(user, Math.ceil(this.state.niveau))}
        >
          <Link to={`/articles/${Math.ceil(this.state.niveau)}`}>
            Ik lees graag{' '}
            {getOr(
              'Geen tekst gevonden',
              [Math.ceil(this.state.niveau), 'name'],
              constants
            )}
          </Link>
        </button>
      </footer>,
    ];
  }
}

export default Setup;
