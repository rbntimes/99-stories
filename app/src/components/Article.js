import React from 'react';
import nl2br from 'nl2br';
import H3 from './../components/H3';

export default ({ title, content }) =>
  <article>
    <H3>
      {title}
    </H3>
    <p dangerouslySetInnerHTML={{ __html: nl2br(content) }} />
  </article>;
