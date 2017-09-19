import React from 'react';
import { connect } from 'react-redux';
import find from 'lodash/find';

import Article from './../components/Article';

import { articles } from './../constants';

const Art = ({ article }) =>
  <main>
    <Article key={article.slug} title={article.title} content={article.body} />
  </main>;

const mapStateToProps = state => {
  return {
    article: find(articles, { slug: state.stories.article }),
  };
};

const ArticleContainer = connect(mapStateToProps)(Art);

export default ArticleContainer;
