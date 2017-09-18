import React from 'react';
import { connect } from 'react-redux';
import slugify from 'slugify';

import Article from './../components/Article';

import { articles } from './../constants';

const Art = ({ title }) =>
  <main>
    {articles
      .filter(article => {
        return slugify(article.title, { lower: true }) === title;
      })
      .map(article =>
        <Article key={title} title={article.title} content={article.body} />
      )}
  </main>;

const mapStateToProps = (state, ownProps) => {
  console.log(state);
  return {
    title: state.stories.article,
  };
};

const ArticleContainer = connect(mapStateToProps)(Art);

export default ArticleContainer;
