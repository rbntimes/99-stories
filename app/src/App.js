import React, { Component } from 'react';

import { Switch, Route } from 'react-router-dom';
import Setup from './pages/setup';

import Main from './pages/main';
import Register from './pages/register';
import Login from './pages/login';
import Article from './pages/article';
import Header from './components/Header';

import fire from './fire';
import { Link } from 'react-router-dom';
import { setLoggedIn } from './actions';

import P from './components/P';
import H3 from './components/H3';
import Field from './components/Field';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userIsLoggedIn: false,
    };
  }

  componentDidMount() {
    let user = fire.database().ref('users');
    let comments = fire.database().ref('comments');
    fire.auth().onAuthStateChanged(
      function(user) {
        this.setState({
          userIsLoggedIn: user ? true : false,
          user: user,
        });
        fire.database().ref(`users/${user.uid}`).on('value', snapshot => {
          console.log(snapshot);
          this.setState({
            niveau: snapshot.val().niveau,
            dataRetreived: true,
          });
        });
      }.bind(this)
    );
  }

  render() {
    console.log(this.props, this.state);
    return [
      <Header loggedIn={this.state.userIsLoggedIn} />,
      this.state.userIsLoggedIn && this.state.dataRetreived
        ? <Switch>
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
        : <span>Je data wordt geladen, even geduld...</span>,
      <Route path="/register" component={Register} />,
      <Route path="/login" component={Login} />,
    ];
  }
}

export default App;
