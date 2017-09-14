import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import styled from 'styled-components';

import P from './../components/P';
import H3 from './../components/H3';

import { copy } from './../constants';

const Article = styled.article`
`;

class App extends Component {
  render() {
    console.log(copy)
    return (
      <Article>
        <H3>{copy.title}</H3>
        <P>{copy.body}</P>
       <Link to="/">terug</Link>
       </Article>
    );
  }
}

export default App;
