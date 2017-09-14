import React, { Component } from 'react';

import { Switch, Route } from 'react-router-dom';

import Setup from './setup';
import Main from './main';
import Register from './register';
import Login from './login';

class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path='/' component={Setup} />
        <Route path='/main' component={Main} />
        <Route path='/register' component={Register} />
        <Route path='/login' component={Login} />
      </Switch>
    );
  }
}

export default App;
