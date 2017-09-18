import React, { Component } from 'react';

import { connect } from 'react-redux';
import { setLevel } from './../actions';
import getOr from 'lodash/fp/getOr';
import { Link } from 'react-router-dom';

import P from './../components/P';
import H1 from './../components/H1';
import Button from './../components/Button';
import Slider from './../components/Slider';

import constants from './../constants';

const Setup = ({ onChange, niveau = 1 }) =>
  <main>
    <H1>Hoe lees jij graag?</H1>
    <P>
      {getOr('Geen tekst gevonden', [niveau, 'text'], constants)}
    </P>
    <Slider onChange={e => onChange(e.target.value)} value={niveau} />
    <Button>
      <Link to={`/articles/${niveau}`}>
        Ik lees graag{' '}
        {getOr('Geen tekst gevonden', [niveau, 'name'], constants)}
      </Link>
    </Button>
  </main>;

const mapStateToProps = (state, ownProps) => {
  return {
    niveau: state.stories.niveau,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  console.log(ownProps, 'ehfaejhu');
  return {
    onChange: val => {
      dispatch(setLevel(val));
    },
  };
};

const SetupContainer = connect(mapStateToProps, mapDispatchToProps)(Setup);

export default SetupContainer;
