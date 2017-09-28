import React from 'react';
import nl2br from 'nl2br';
import H3 from './../components/H3';
import './style.css';
export default ({ title, content }) =>
  <article data-selectable>
    <H3>
      {title}
    </H3>
    <p dangerouslySetInnerHTML={{ __html: content }} />
  </article>;
