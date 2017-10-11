import React from 'react';
import H3 from './../components/H3';
import './style.css';
export default ({ title, content }) => (
  <section>
    <article>
      <h1>{title}</h1>
      <p dangerouslySetInnerHTML={{ __html: content }} />
    </article>
  </section>
);
