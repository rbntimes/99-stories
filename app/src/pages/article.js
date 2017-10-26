import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import find from 'lodash/find';

import Article from './../components/Article';

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
      .ref(`articles/${this.state.article}/comments`)
      .on('value', snapshot => {
        if (!snapshot.val()) {
          fire
            .database()
            .ref(`articles/${this.state.article}/comments`)
            .set(false);
        }
        this.setState({
          comments: snapshot.val() || {},
          commentsLoaded: true,
        });
      });

    fire
      .database()
      .ref(`articles/${this.state.article}/read`)
      .once('value')
      .then(snapshot => {
        fire
          .database()
          .ref(`articles/${this.state.article}/read`)
          .set(snapshot.val() + 1);
      });

    if (this.props.user) {
      fire
        .database()
        .ref(`users/${this.props.user.uid}/articlesRead/${this.state.article}`)
        .set(true);
    }
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
      <section>
        <h2>{article.title.slice(18, article.title.length).trim()}</h2>
      </section>,
      <main
        showComments={showComments ? 'true' : 'false'}
        twocol={showComments ? 'true' : 'false'}
      >
        <Article
          key={article.slug}
          title={article.title}
          selected={selected}
          content={commentsLoaded && this.highlight(article.body)}
        />
      </main>,
      commentsLoaded && showComments ? (
        <aside data-comments>
          <section data-goback>
            <Link to="/">Terug</Link>
          </section>
          <section data-close>
            <a onClick={this.showComments}>X</a>
          </section>
          <section>
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
            <Link to="/">terug naar overzicht</Link>
          </section>
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
