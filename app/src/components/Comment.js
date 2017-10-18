import React, { Component } from 'react';
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
    this.toggleReply = this.toggleReply.bind(this);
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
        `articles/${this.props.article}/comments/${this.props.comment}/${this
          .state.selectedComment}/comments`
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

  toggleReply() {
    console.log('a');
  }

  render() {
    const { comment, selected, user } = this.props;
    return [
      <h3>Molovich schreef: </h3>,
      <blockquote>"{comment}"</blockquote>,
      <h3>Reacties</h3>,
      selected &&
        Object.keys(selected).map(comment => {
          return [
            <span key={comment}>
              {`${selected[comment].comment} - door ${selected[comment].user}`}
            </span>,
            <a onClick={this.toggleReply}>reageer</a>,
            <ul>
              {selected[comment].comments &&
                Object.keys(selected[comment].comments).map(inlineComment => (
                  <li key={inlineComment}>
                    {`${selected[comment].comments[inlineComment]
                      .comment} - door ${selected[comment].comments[
                      inlineComment
                    ].user}`}
                  </li>
                ))}
              {user && (
                <form onSubmit={this.handleSubmit}>
                  <textarea
                    value={this.state[comment]}
                    onChange={e => this.handleInput(e, comment)}
                  />
                  <button>post</button>
                </form>
              )}
            </ul>,
          ];
        }),
    ];
  }
}

export default Comments;
