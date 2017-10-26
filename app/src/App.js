import React, { Component } from 'react';

import { Switch, Route } from 'react-router-dom';

import Main from './pages/main';
import Register from './pages/register';
import Login from './pages/login';
import Article from './pages/article';
import Header from './components/Header';

import fire from './fire';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    fire.auth().onAuthStateChanged(
      function(user) {
        this.setState({
          userIsLoggedIn: user ? true : false,
          user: user,
        });
        if (user) {
          const userNode = fire.database().ref(`users/${user.uid}`);
          userNode.on('value', snapshot => {
            this.setState({
              dataRetreived: true,
            });
          });
        }
      }.bind(this)
    );
  }

  render() {
    console.log(this.state, this.props);
    return [
      <Header key="header" loggedIn={this.state.userIsLoggedIn} />,
      this.state.userIsLoggedIn !== undefined ? (
        <Switch key="switch">
          <Route
            key="home"
            exact
            path="/"
            render={() => <Main {...this.state} />}
          />
          <Route
            path="/articles/:article"
            render={({ location }) => (
              <Article location={location} {...this.state} />
            )}
          />
        </Switch>
      ) : (
        <span>LADEN</span>
      ),

      <Route key="register" path="/register" exact component={Register} />,
      <Route key="login" path="/login" exact component={Login} />,
    ];
  }
}

export default App;
