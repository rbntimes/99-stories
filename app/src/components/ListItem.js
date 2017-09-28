import React from 'react';
import nl2br from 'nl2br';

import H3 from './../components/H3';
import { Link } from 'react-router-dom';

// const Article = styled.article`
//   height: 13rem;
//   overflow: hidden;
// `;

export default function({ article, niveau, onClick }) {
  return (
    <li>
      <article>
        <Link to={`${niveau}/${article.slug}`}>
          <H3>
            {article.title}
          </H3>
        </Link>
        <p>
          {article.body.substr(0, 100)}
        </p>
        <Link to="/">terug</Link>
      </article>
    </li>
  );
}
