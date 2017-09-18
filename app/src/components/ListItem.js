import React from 'react';
import styled from 'styled-components';
import nl2br from 'nl2br';
import slugify from 'slugify';

import H3 from './../components/H3';
import { Link } from 'react-router-dom';

const Article = styled.article`
  height: 13rem;
  overflow: hidden;
`;

export default function({ article, niveau, onClick }) {
  return (
    <Article>
      <H3 onClick={onClick(slugify(article.title, { lower: true }))}>
        <Link to={`${niveau}/${slugify(article.title, { lower: true })}`}>
          {article.title}
        </Link>
      </H3>
      <p dangerouslySetInnerHTML={{ __html: nl2br(article.body) }} />
      <Link to="/">terug</Link>
    </Article>
  );
}
