import React from 'react';
import H3 from './../components/H3';
import './style.css';
export default ({ title, content }) => (
  <article data-selectable>
    <h2>{title}</h2>
    <p dangerouslySetInnerHTML={{ __html: content }} />
  </article>
);
