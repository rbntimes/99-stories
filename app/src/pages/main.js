import React from 'react';
import { connect } from 'react-redux';
import slugify from 'slugify';
import ListItem from './../components/ListItem';

import { setCurrent } from './../actions';

import { articles } from './../constants';

const Main = ({ niveau, onClick }) => {
  return (
    <main>
      {articles
        .filter(article => {
          if (niveau) {
            return article.niveau === niveau;
          }
          return article;
        })
        .map(article =>
          <ListItem
            onClick={onClick}
            key={slugify(article.title)}
            niveau={niveau}
            article={article}
          />
        )}
    </main>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    niveau: state.stories.niveau,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onClick: title => {
      dispatch(setCurrent(slugify(title)));
    },
  };
};

const mainContainer = connect(mapStateToProps, mapDispatchToProps)(Main);

export default mainContainer;
