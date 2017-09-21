import React, { Component, PropTypes } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import getOr from 'lodash/fp/getOr';
import NsLogo from './../components/NsLogo';
import H3 from './../components/H3';

import './style.css';

class Comments extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleInput = this.handleInput.bind(this);
    this.handleButton = this.handleButton.bind(this);
  }

  handleInput(event) {
    this.setState({
      comment: event.target.value,
    });
  }

  handleButton() {
    this.setState({
      comment: '',
    });
    this.props.onSubmit(this.props.selected, this.state.comment);
  }

  render() {
    return (
      <aside>
        <p>
          {getOr('Selecteer een tekst om te reageren', 'selected', this.props)}
        </p>
        <input value={this.state.comment} onChange={this.handleInput} />
        <button onClick={this.handleButton}>post</button>
      </aside>
    );
  }
}

Comments.propTypes = {};

Comments.defaultProps = {};

export default Comments;
