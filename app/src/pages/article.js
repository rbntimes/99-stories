import React from 'react';
import slugify from 'slugify';

import Article from './../components/Article';

import { articles } from './../constants';

export default function() {
  const slug = window.location.href.split('/').pop();
  return (
    <main>
      {articles.filter((article) => {
        return (slugify(article.title, {lower: true}) === slug);
      }).map(article =>
        <Article
          key={slugify(article.title, {lower: true})}
          title={article.title}
          content={article.body} />
      )}
    </main>
  );
}
