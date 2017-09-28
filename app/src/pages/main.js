import React from 'react';
import { connect } from 'react-redux';
import ListItem from './../components/ListItem';

import { setCurrent } from './../actions';

import { articles } from './../constants';

const Main = ({ niveau }) => {
  return (
    <section>
      <ul>
        {articles
          .filter(article => {
            if (Math.ceil(niveau)) {
              return article.niveau === Math.ceil(niveau);
            }
          })
          .map(article => {
            return (
              <ListItem
                niveau={Math.ceil(niveau)}
                key={article.slug}
                article={article}
              />
            );
          })}
      </ul>
    </section>
  );
};

export default Main;
