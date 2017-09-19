import React from 'react';
import { connect } from 'react-redux';
import ListItem from './../components/ListItem';

import { setCurrent } from './../actions';

import { articles } from './../constants';

const Main = ({ articles, niveau, onClick }) => {
  return (
    <main>
      {articles.map(article =>
        <ListItem
          niveau={Math.ceil(niveau)}
          onClick={slug => onClick(slug)}
          key={article.slug}
          article={article}
        />
      )}
    </main>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    niveau: state.stories.niveau,
    articles: articles.filter(article => {
      if (Math.ceil(state.stories.niveau)) {
        return article.niveau === Math.ceil(state.stories.niveau);
      }
      return article;
    }),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onClick: slug => {
      dispatch(setCurrent(slug));
    },
  };
};

const mainContainer = connect(mapStateToProps, mapDispatchToProps)(Main);

export default mainContainer;
