import React, { Component } from 'react';

import { Switch, Route } from 'react-router-dom';
import Setup from './pages/setup';

import Main from './pages/main';
import Register from './pages/register';
import Login from './pages/login';
import Article from './pages/article';
import Header from './components/Header';

import fire from './fire';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userIsLoggedIn: false,
    };
  }

  componentDidMount() {
    fire.auth().onAuthStateChanged(
      function(user) {
        this.setState({
          userIsLoggedIn: user ? true : false,
          user: user,
        });
        fire.database().ref(`users/${user.uid}`).on('value', snapshot => {
          this.setState({
            niveau: snapshot.val().niveau,
            dataRetreived: true,
          });
        });
      }.bind(this)
    );
  }

  render() {
    return [
      <Header key="header" loggedIn={this.state.userIsLoggedIn} />,
      this.state.userIsLoggedIn && this.state.dataRetreived
        ? <Switch key="switch">
            <Route exact path="/" render={() => <Setup {...this.state} />} />
            <Route
              exact
              path="/articles"
              render={() => <Main {...this.state} />}
            />
            <Route
              exact
              path="/articles/:niveau"
              render={() => <Main {...this.state} />}
            />
            <Route
              path="/articles/:niveau/:article"
              render={({ location }) =>
                <Article location={location} {...this.state} />}
            />
          </Switch>
        : <span key="loading">Je data wordt geladen, even geduld...</span>,
      <Route key="register" path="/register" component={Register} />,
      <Route key="login" path="/login" component={Login} />,
    ];
  }
}

export default App;
