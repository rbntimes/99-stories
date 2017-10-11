import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import find from 'lodash/find';

import { setSelection, setComment, selectComment } from './../actions';

import Article from './../components/Article';
import Select from './../components/Select';

import { articles } from './../constants';
import Comment from './../components/Comment';
import Annotate from './../components/Annotate';
import fire from './../fire';

class Art extends Component {
  constructor(props) {
    super(props);
    this.state = {
      commentsLoaded: false,
      showComments: false,
      selectedAnnotation: props.selectedAnnotation,
      selected: props.selected,
      article: props.location.pathname.substr(
        props.location.pathname.lastIndexOf('/') + 1
      ),
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.showComments = this.showComments.bind(this);
    window.handleClick = this.handleClick;
  }

  componentDidMount() {
    fire
      .database()
      .ref(`comments/${this.state.article}`)
      .on('value', snapshot => {
        this.setState({
          comments: snapshot.val() || {},
          commentsLoaded: true,
        });
      });
  }

  handleClick(selected) {
    if (selected.length) {
      this.setState({
        showComments: true,
        selectedAnnotation: selected,
      });
    }
  }

  highlight(body, comments) {
    let article = body
      .replace(/(\r\n|\n|\r)/gm, '')
      .split('. ')
      .map(
        sentence =>
          `<mark
            ${this.state.selectedAnnotation === sentence ? 'selected' : ''}
            ${this.state.comments[sentence] ? 'comment' : ''}
            onClick="window.handleClick('${sentence}')">${sentence}.</mark> <br />`
      )
      .join('');
    return article;
  }

  handleSelect(event) {
    if (event) {
      this.setState({
        selectedAnnotation: undefined,
        selected: event,
      });
      this.props.onSelect(event);
    } else {
      this.setState({
        selectedAnnotation: undefined,
        selected: undefined,
      });
    }
  }

  showComments() {
    this.setState({
      showComments: !this.state.showComments,
    });
  }

  render() {
    const { onSubmit, userIsLoggedIn, user } = this.props;
    const {
      showComments,
      commentsLoaded,
      selected,
      selectedAnnotation,
      comments,
    } = this.state;
    const article = find(articles, { slug: this.state.article });

    return [
      <main showcomments={showComments ? 'true' : 'false'}>
        <Article
          key={article.slug}
          title={article.title}
          selected={selected}
          content={commentsLoaded && this.highlight(article.body)}
        />
      </main>,
      commentsLoaded && showComments ? (
        <aside data-comments>
          <section>
            <a onClick={this.showComments}>x</a>
            <Comment
              user={userIsLoggedIn ? user : false}
              article={article.slug}
              onSubmit={onSubmit}
              comment={selectedAnnotation}
              selected={comments[selectedAnnotation]}
            />
            <Annotate
              user={userIsLoggedIn ? user : false}
              article={article.slug}
              onSubmit={onSubmit}
              annotateSentence={selectedAnnotation}
            />
          </section>
        </aside>
      ) : (
        <aside>
          <section>
            <h2>Reacties / annotaties</h2>
            <p>Klik in het artikel om reacties of annotaties te laden!</p>
          </section>
        </aside>
      ),
    ];
  }
}

export default Art;
