import React from 'react';
import nl2br from 'nl2br';

import H3 from './../components/H3';
import { Link } from 'react-router-dom';

export default function({title, content, onClick}) {
  return (
    <article>
      <H3>{title}</H3>
      <p dangerouslySetInnerHTML={{__html: nl2br(content)}}/>
    </article>
  )
}
