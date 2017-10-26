import React from 'react';

import { Link } from 'react-router-dom';

export default function({
  key,
  article,
  type,
  annotationsCount,
  timesRead,
  read,
}) {
  return (
    <li key={key}>
      <article>
        <Link to={`articles/${article.slug}`}>
          <h3>{article.title}</h3>
        </Link>
        <footer>
          <span>{timesRead}x gelezen</span>
          <span>{annotationsCount}x geannoteerd</span>
        </footer>
        <p>{article.body.substr(0, 500)}</p>
        <Link to={`articles/${article.slug}`}>Lees meer</Link>
      </article>
    </li>
  );
}
