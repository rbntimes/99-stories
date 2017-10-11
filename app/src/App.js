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
        console.log(user);
        this.setState({
          userIsLoggedIn: user && !user.isAnonymous ? true : false,
          user: user,
        });
        if (user) {
          fire
            .database()
            .ref(`users/${user.uid}`)
            .on('value', snapshot => {
              this.setState({
                dataRetreived: true,
              });
            });
        } else {
          fire
            .auth()
            .signInAnonymously()
            .catch(function(error) {
              // console.log(error);
              // Handle Errors here.
              var errorCode = error.code;
              var errorMessage = error.message;
              // ...
            });
        }
      }.bind(this)
    );
  }

  render() {
    return [
      <Header key="header" loggedIn={this.state.userIsLoggedIn} />,
      this.state.dataRetreived ? (
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
        <span key="loading">Je data wordt geladen, even geduld...</span>
      ),
      <Route key="register" path="/register" exact component={Register} />,
      <Route key="login" path="/login" exact component={Login} />,
    ];
  }
}

export default App;
