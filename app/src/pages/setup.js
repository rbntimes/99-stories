import React, { Component } from 'react';

import getOr from 'lodash/fp/getOr';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import P from './../components/P';
import H1 from './../components/H1';
import Button from './../components/Button';
import Slider from './../components/Slider';

import constants from './../constants';

const Body = styled.main`
  display: flex;
  height: 100%;
  flex-direction: column;
`;

class App extends Component {

  constructor() {
    super();

    this.state = {
      grade: 10,
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange(event) {
    this.setState({
      grade: event.target.value,
    });
  }

  handleClick(event) {
    console.log('target', this.state.grade)
  }

  render() {
    console.log(constants)
    return (
      <Body>
        <H1>Hoe lees jij graag?</H1>
        <P>
          {getOr('Geen tekst gevonden', [[Math.ceil(this.state.grade / 10)], 'text'], constants)}
        </P>
        <Slider
          onChange={this.handleChange}
          value={this.state.grade}
         />
         <Button>
           <Link to='/main'>Ik lees graag {getOr('Geen tekst gevonden', [[Math.ceil(this.state.grade / 10)], 'name'], constants)}</Link>
         </Button>
       </Body>
    );
  }
}

export default App;
