import React from 'react';
import styled from 'styled-components';
import nl2br from 'nl2br';

import H3 from './../components/H3';
import { Link } from 'react-router-dom';

const Article = styled.article`
  height: 13rem;
  overflow: hidden;
`;

export default function({ article, niveau, onClick }) {
  return (
    <Article onClick={() => onClick(article.slug)}>
      <Link to={`${niveau}/${article.slug}`}>
        <H3>
          {article.title}
        </H3>
      </Link>
      <p dangerouslySetInnerHTML={{ __html: nl2br(article.body) }} />
      <Link to="/">terug</Link>
    </Article>
  );
}
