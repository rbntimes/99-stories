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
      selectComment: '',
    };
    this.handleInput = this.handleInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInput(event, comment) {
    this.setState({
      selectedComment: comment,
      [comment]: event.target.value,
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const itemsRef = fire
      .database()
      .ref(
        `comments/${this.props.article}/${this.props.comment}/${this.state
          .selectedComment}/comments`
      );
    const item = {
      user: this.props.user.email,
      comment: this.state[this.state.selectedComment],
    };
    itemsRef.push(item);
    this.setState({
      [this.state.selectedComment]: '',
    });
  }

  render() {
    const { comment, selected } = this.props;
    return [
      <blockquote>"{comment}"</blockquote>,
      <h2>Reacties</h2>,
      selected &&
        Object.keys(selected).map(comment => {
          return (
            <span key={comment}>
              {`${this.props.selected[comment].comment} - door ${this.props
                .selected[comment].user}`}
              <ul>
                {this.props.selected[comment].comments &&
                  Object.keys(
                    this.props.selected[comment].comments
                  ).map(inlineComment => (
                    <li key={inlineComment}>
                      {`${this.props.selected[comment].comments[inlineComment]
                        .comment} - door ${this.props.selected[comment]
                        .comments[inlineComment].user}`}
                    </li>
                  ))}
                {this.props.user && (
                  <form onSubmit={this.handleSubmit}>
                    <textarea
                      value={this.state[comment]}
                      onChange={e => this.handleInput(e, comment)}
                    />
                    <button>post</button>
                  </form>
                )}
              </ul>
            </span>
          );
        }),
    ];
  }
}

export default Comments;
