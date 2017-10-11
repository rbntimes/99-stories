import React from 'react';

import { Link } from 'react-router-dom';

export default function({ article, type, count }) {
  return (
    <li>
      <article>
        <Link to={`articles/${article.slug}`}>
          {type === 'large' ? (
            <h1>
              {article.title} {count}
            </h1>
          ) : (
            <h3>
              {article.title} {count}
            </h3>
          )}
        </Link>
        <p>{article.body.substr(0, type === 'large' ? 500 : 100)}</p>
      </article>
    </li>
  );
}
