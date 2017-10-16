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
  if (type === 'large') {
    return (
      <li key={key}>
        <article>
          <Link to={`articles/${article.slug}`}>
            <h1>{article.title}</h1>
          </Link>
          <p>{article.body.substr(0, 500)}</p>
        </article>
      </li>
    );
  } else {
    return (
      <li key={key}>
        <article>
          <Link to={`articles/${article.slug}`}>
            <h4>{article.title}</h4>
          </Link>
          <div>
            <span>{timesRead}x gelezen</span>
            <span>{read ? 'Gelezen' : 'Ongelezen'}</span>
            <span>{annotationsCount} annotaties</span>
          </div>
          {/* <p>{article.body.substr(0, 100)}</p> */}
        </article>
      </li>
    );
  }
}
