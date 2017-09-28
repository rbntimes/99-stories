import React from 'react';
import ListItem from './../components/ListItem';

import { articles } from './../constants';

const Main = ({ niveau }) => {
  return (
    <section>
      <ul>
        {articles
          .filter(article => {
            return article.niveau === Math.ceil(niveau);
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
