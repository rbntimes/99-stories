import React, { Component } from 'react';

import getOr from 'lodash/fp/getOr';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import P from './../components/P';
import H1 from './../components/H1';
import H3 from './../components/H3';
import Button from './../components/Button';
import NsLogo from './../components/NsLogo';
import Slider from './../components/Slider';

import constants from './../constants';

const Container = styled.div`
  padding: .4375rem;
  height: 90vh;
  font-family: 'Open Sans', sans-serif;
`;

const Body = styled.main`
  display: flex;
  height: 100%;
  flex-direction: column;
`;

const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 1rem;
  background-color: rgba(0,48,130,.8);
  box-shadow: 0 0.125rem 0 0 rgba(7,7,33,.15);
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
      <Container>
        <Header>
          <NsLogo color="#fff" />
          <H3>
            x nurks
          </H3>
        </Header>
        <Body>
          <H1>Hoe lees jij graag?</H1>
          <P>
            {getOr('Geen tekst gevonden', [[Math.ceil(this.state.grade / 10)], 'text'], constants)}
          </P>
          <Slider
            onChange={this.handleChange}
            value={this.state.grade}
           />
           <Button
             color="rgba(0,48,130,.8)">
             <Link to='/main'>Ik lees graag {getOr('Geen tekst gevonden', [[Math.ceil(this.state.grade / 10)], 'name'], constants)}</Link>
           </Button>
         </Body>
       </Container>
    );
  }
}

export default App;
