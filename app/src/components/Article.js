import React from 'react';
import nl2br from 'nl2br';
import slugify from 'slugify';
import H3 from './../components/H3';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { setCurrent } from './../actions';

export default ({ title, content }) =>
  <article>
    <H3>
      {title}
    </H3>
    <p dangerouslySetInnerHTML={{ __html: nl2br(content) }} />
  </article>;
