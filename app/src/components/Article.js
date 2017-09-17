import React from 'react';
import nl2br from 'nl2br';
import slugify from 'slugify';
import H3 from './../components/H3';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'

import { setCurrent } from './../actions';

let Article = ({dispatch, title, content, onClick}) => {
  return (
    <article>
      <H3>{title}</H3>
      <a onClick={
        () => dispatch(setCurrent(slugify(title)))
      }> aaa</a>
      <p dangerouslySetInnerHTML={{__html: nl2br(content)}}/>
    </article>
  )
}

Article = connect()(Article)

export default Article;
