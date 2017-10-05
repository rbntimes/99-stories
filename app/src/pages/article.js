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
      this.props.onClick(selected);
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
    const article = find(articles, { slug: this.state.article });
    return [
      this.state.showComments && (
        <span onClick={this.showComments}>
          <a>x</a>
        </span>
      ),
      <main showcomments={this.state.showComments ? 'true' : 'false'}>
        <Article
          key={article.slug}
          title={article.title}
          selected={this.state.selected}
          content={this.state.commentsLoaded && this.highlight(article.body)}
        />
      </main>,
      this.state.commentsLoaded &&
        this.state.showComments && (
          <aside>
            <Comment
              user={userIsLoggedIn && user}
              article={article.slug}
              onSubmit={onSubmit}
              comment={this.state.selectedAnnotation}
              selected={this.state.comments[this.state.selectedAnnotation]}
            />
            <Annotate
              user={userIsLoggedIn && user}
              article={article.slug}
              onSubmit={onSubmit}
              annotateSentence={this.state.selectedAnnotation}
            />
          </aside>
        ),
      this.props.user.isAnonymous &&
        this.state.showComments && (
          <aside>
            <section>
              <h2>Hiervoor heb je een account nodig</h2>
              <Link to="/register">Maak deze eerst aan</Link>
              <Link to="/login">of log in als je deze al hebt</Link>
            </section>
          </aside>
        ),
    ];
  }
}

const mapStateToProps = state => {
  return {
    selected: state.stories.selected,
    selectedAnnotation: state.stories.selectedAnnotation,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onSelect: text => {
      dispatch(setSelection(text));
    },
    onClick: comment => {
      dispatch(selectComment(comment));
    },
    onSubmit: (selected, comment) => {
      dispatch(setComment(selected, comment));
    },
  };
};

const ArticleContainer = connect(mapStateToProps, mapDispatchToProps)(Art);

export default ArticleContainer;
