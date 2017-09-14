import React, { Component } from 'react';

import { Switch, Route } from 'react-router-dom';

import Setup from './setup';
import Main from './main';
import Article from './article';

class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path='/' component={Setup} />
        <Route exact path='/articles' component={Main} />
        <Route exact path='/articles/:niveau' component={Main} />
        <Route path='/articles/:niveau/:article' component={Article} />
      </Switch>
    );
  }
}

export default App;
