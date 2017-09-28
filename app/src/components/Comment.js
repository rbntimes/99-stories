import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import getOr from 'lodash/fp/getOr';
import fire from './../fire';
import './style.css';

class Comments extends Component {
  constructor(props) {
    super(props);
    this.state = {};
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
      .ref(`comments/${this.props.article}/${this.props.comment}/comments`);
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
    return (
      <aside>
        <p>
          - "{getOr('aa', 'selected', this.props.selected)}"
        </p>
        <p>
          {getOr('aa', 'comment', this.props.selected)}
        </p>
        <p>
          Door:
          {getOr('aa', 'user', this.props.selected)}
        </p>
        {this.props.selected && this.props.selected.comments
          ? Object.keys(this.props.selected.comments).map(comment =>
              <form key={comment} onSubmit={this.handleSubmit}>
                <span>
                  {this.props.selected.comments[comment].comment}
                </span>
                <input value={this.state.comment} onChange={this.handleInput} />
                <button>post</button>
              </form>
            )
          : <span>aa</span>}
        {this.props.user
          ? <form onSubmit={this.handleSubmit}>
              <input value={this.state.comment} onChange={this.handleInput} />
              <button>post</button>
            </form>
          : <span>
              <Link to="/login">Log</Link> eerst in om te kunnen reageren
            </span>}
      </aside>
    );
  }
}

export default Comments;
