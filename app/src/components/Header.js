import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import NsLogo from './../components/NsLogo';
import Message from './../components/Message';
import fire from './../fire';
import './style.css';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = { beingRead: false, beingAnnotated: false, hidden: false };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.notifications !== this.props.notifications) {
      this.setState({ notification: true });
      setTimeout(() => {
        this.setState({
          notification: false,
        });
      }, 5000);
    }
  }

  render() {
    const { loggedIn, notifications } = this.props;

    return (
      <header>
        <nav>
          <Link to="/">
            <NsLogo />
          </Link>
          {!loggedIn ? (
            <Link to="/login">Mijn account</Link>
          ) : (
            <Link to="#">
              <Message
                notifications={notifications}
                alert={this.state.notification}
              />
            </Link>
          )}
        </nav>
      </header>
    );
  }
}

export default Header;
{
  /* <a onClick={() => fire.auth().signOut()}> Uitloggen</a> */
}
