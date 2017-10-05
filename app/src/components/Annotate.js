import React, { Component } from 'react';
import getOr from 'lodash/fp/getOr';
import fire from './../fire';
import './style.css';

class Comments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comment: '',
    };
    this.handleInput = this.handleInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInput(event) {
    this.setState({
      comment: event.target.value,
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const itemsRef = fire
      .database()
      .ref(`comments/${this.props.article}/${this.props.annotateSentence}`);
    const item = {
      user: this.props.user.email,
      comment: this.state.comment,
    };
    itemsRef.push(item);
    this.setState({
      comment: '',
    });
  }

  render() {
    const { annotateSentence } = this.props;
    const { comment } = this.state;

    if (annotateSentence) {
      return (
        <form onSubmit={this.handleSubmit}>
          <input value={comment} onChange={this.handleInput} />
          <button>post</button>
        </form>
      );
    }
  }
}

Comments.propTypes = {};

Comments.defaultProps = {};

export default Comments;
