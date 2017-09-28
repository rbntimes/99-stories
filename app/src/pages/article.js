import React, { Component } from 'react';
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
      selectedAnnotation: props.selectedAnnotation,
      selected: props.selected,
      article: props.location.pathname.substr(
        props.location.pathname.lastIndexOf('/') + 1
      ),
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    window.handleClick = this.handleClick;
  }

  componentDidMount() {
    fire
      .database()
      .ref(`comments/${this.state.article}`)
      .on('value', snapshot => {
        this.setState({
          comments: snapshot.val(),
          commentsLoaded: true,
        });
      });
  }

  handleChange(event) {
    this.setState({ niveau: event.target.value });
  }

  handleClick(selected) {
    if (selected.length) {
      this.setState({
        selectedAnnotation: selected,
      });
      this.props.onClick(selected);
    }
  }

  highlight(body, comments) {
    let article = body;
    if (comments) {
      Object.keys(comments).map(
        comment =>
          (article = article.replace(
            comments[comment].selected,
            `<mark onClick="window.handleClick('${comment}')">${comments[
              comment
            ].selected}</mark>`
          ))
      );
    }
    return article;
  }

  handleSelect(event) {
    console.log(event);
    if (event) {
      this.setState({
        selectedAnnotation: undefined,
        selected: event,
      });
      this.props.onSelect(event);
    } else {
      this.setState({
        selected: undefined,
      });
    }
  }

  render() {
    const {
      onSelect,
      onSubmit,
      selected,
      comments,
      userIsLoggedIn,
      user,
    } = this.props;
    const article = find(articles, { slug: this.state.article });
    return (
      <main>
        <Select onSelect={this.handleSelect}>
          <Article
            key={article.slug}
            title={article.title}
            selected={this.state.selected}
            content={
              this.state.commentsLoaded &&
              this.highlight(article.body, this.state.comments)
            }
          />
        </Select>
        {this.state.selectedAnnotation
          ? <Comment
              user={userIsLoggedIn && user}
              article={article.slug}
              onSubmit={onSubmit}
              comment={this.props.selectedAnnotation}
              selected={this.state.comments[this.props.selectedAnnotation]}
            />
          : <Annotate
              user={userIsLoggedIn && user}
              article={article.slug}
              onSubmit={onSubmit}
              selected={this.state.selected}
            />}
      </main>
    );
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
