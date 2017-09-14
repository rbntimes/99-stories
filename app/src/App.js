import React, { Component } from 'react';
import styled from 'styled-components';

import Header from './components/Header';
import Body from './pages';

const Container = styled.div`
  padding: .4375rem;
  height: 90vh;
  font-family: 'Open Sans', sans-serif;
`;

class App extends Component {
  render() {
    return (
      <Container>
        <Header />
        <Body />
      </Container>
    );
  }
}

export default App;
