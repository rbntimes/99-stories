import React, { Component } from 'react';
import { Link } from 'react-router-dom';
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
      .ref(
        `articles/${this.props.article}/comments/${this.props.annotateSentence}`
      );
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
    const { annotateSentence, user } = this.props;
    const { comment } = this.state;

    if (annotateSentence && user) {
      return (
        <form onSubmit={this.handleSubmit}>
          <input value={comment} onChange={this.handleInput} />
          <button>annotate</button>
        </form>
      );
    } else {
      {
        return [
          <section>
            <span>Om hier op te reageren heb je een account nodig!</span>,
            <Link to="/register">Maak deze eerst aan</Link>,
            <Link to="/login">of log in als je deze al hebt</Link>,
          </section>,
        ];
      }
    }
  }
}

Comments.propTypes = {};

Comments.defaultProps = {};

export default Comments;
