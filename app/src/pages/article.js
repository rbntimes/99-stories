import React from 'react';
import { connect } from 'react-redux';
import find from 'lodash/find';

import { setSelection, setComment } from './../actions';

import Article from './../components/Article';
import Select from './../components/Select';

import { articles } from './../constants';
import Comments from './../components/Comments';

function highlight(body, comments) {
  let article = body;
  if (comments && comments[0]) {
    comments.map(comment => {
      article = article.replace(comment.text, `<mark>${comment.text}</mark>`);
    });
    return article;
  }
  return body;
}

const Art = ({ article, onSelect, onSubmit, selected, comments }) =>
  <main>
    <Select onSelect={onSelect}>
      <Article
        key={article.slug}
        title={article.title}
        content={highlight(article.body, comments)}
      />
    </Select>
    <Comments onSubmit={onSubmit} selected={selected} />
  </main>;

const mapStateToProps = state => {
  return {
    article: find(articles, { slug: state.stories.article }),
    selected: state.stories.selected,
    comments: state.stories.comments,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onSelect: text => {
      dispatch(setSelection(text));
    },
    onSubmit: (selected, comment) => {
      dispatch(setComment(selected, comment));
    },
  };
};

const ArticleContainer = connect(mapStateToProps, mapDispatchToProps)(Art);

export default ArticleContainer;
