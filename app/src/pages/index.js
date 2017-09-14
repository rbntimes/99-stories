import React, { Component } from 'react';

import { Switch, Route } from 'react-router-dom';

import Setup from './setup';
import Main from './main';

class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path='/' component={Setup} />
        <Route path='/main' component={Main} />
      </Switch>
    );
  }
}

export default App;
