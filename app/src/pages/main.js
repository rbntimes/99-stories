import React from 'react';
import slugify from 'slugify';
import ListItem from './../components/ListItem';

import { articles } from './../constants';

export default function() {
  const niveau = Math.round(window.location.href.split('/').pop())
  return (
    <main>
      {articles.filter((article) => {
        if (niveau) {
          return article.niveau === niveau
        }
        return article;
      }).map(article =>
        <ListItem
          key={slugify(article.title)}
          niveau={niveau}
          article={article} />
      )}
    </main>
  );
}
