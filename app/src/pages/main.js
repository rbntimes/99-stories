import React, { Component } from 'react';
import ListItem from './../components/ListItem';
import getOr from 'lodash/fp/getOr';

import { articles } from './../constants';
import fire from './../fire';

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      commentsLoaded: false,
    };
  }

  componentDidMount() {
    fire
      .database()
      .ref(`comments`)
      .on('value', snapshot => {
        console.log(snapshot);
        this.setState({
          comments: snapshot.val() || {},
          commentsLoaded: true,
        });
      });
  }

  render() {
    return [
      <main>
        <ul>
          {this.state.commentsLoaded &&
            articles.map(article => (
              <ListItem
                count={
                  Object.keys(getOr([], [article.slug], this.state.comments))
                    .length
                }
                type="large"
                key={article.slug}
                article={article}
              />
            ))}
        </ul>
      </main>,
      <aside>
        <section>
          sorteer op:
          <select>
            <option value="test">Test</option>
          </select>
        </section>
        <section>
          <ul>
            {articles.map(article => (
              <ListItem
                count={
                  Object.keys(getOr([], [article.slug], this.state.comments))
                    .length
                }
                type="small"
                key={article.slug}
                article={article}
              />
            ))}
          </ul>
        </section>
      </aside>,
    ];
  }
}

export default Main;
