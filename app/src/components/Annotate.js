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
    const itemsRef = fire.database().ref(`comments/${this.props.article}`);
    const item = {
      user: this.props.user.email,
      selected: this.props.selected,
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
        <section>
          <p>
            {getOr('', 'selected', this.props)}
          </p>
          {this.props.selected
            ? <form onSubmit={this.handleSubmit}>
                <input value={this.state.comment} onChange={this.handleInput} />
                <button>post</button>
              </form>
            : <span>Selecteer een tekst om te reageren</span>}
        </section>
      </aside>
    );
  }
}

Comments.propTypes = {};

Comments.defaultProps = {};

export default Comments;
