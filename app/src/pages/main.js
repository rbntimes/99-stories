import React, { Component } from 'react';
import ListItem from './../components/ListItem';
import EmptySlate from './../components/EmptySlate';
import getOr from 'lodash/fp/getOr';
import { Link } from 'react-router-dom';

import { articles } from './../constants';
import fire from './../fire';
import shuffle from './../shuffle';

class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      shuffled: shuffle(articles.slice(0)),
      commentsLoaded: false,
      userDataLoaded: false,
      sort: 'read',
      hideRead: false,
      display: 'row',
    };

    this.onSelect = this.onSelect.bind(this);
    this.toggleRead = this.toggleRead.bind(this);
  }

  componentDidMount() {
    fire
      .database()
      .ref(`articles`)
      .on('value', snapshot => {
        this.setState({
          articleData: snapshot.val() || {},
          articlesLoaded: true,
        });
      });

    if (this.props.user) {
      fire
        .database()
        .ref(`users/${this.props.user.uid}`)
        .once('value')
        .then(snapshot => {
          this.setState({
            userDataLoaded: true,
            userRead: snapshot.val().articlesRead || [],
            sort: snapshot.val().sortBy || 'read',
            hideRead: snapshot.val().hideRead || false,
          });
        });
    }
  }

  onSelect(e) {
    this.setState({
      sort: e.target.value,
    });
    fire
      .database()
      .ref(`users/${this.props.user.uid}/sortBy`)
      .set(e.target.value);
  }

  toggleRead() {
    this.setState({
      hideRead: !this.state.hideRead,
    });
    fire
      .database()
      .ref(`users/${this.props.user.uid}/hideRead`)
      .set(!this.state.hideRead);
  }

  render() {
    const {
      articlesLoaded,
      articleData,
      shuffled,
      hideRead,
      sort,
      userRead,
    } = this.state;

    const randomStory = articles[Math.floor(Math.random() * articles.length)];

    return [
      <section>
        <div>
          <h3>{randomStory.title}</h3>
          <p>{randomStory.body.substr(0, 100)}</p>
          <Link to={`/articles/${randomStory.slug}`}>Lees meer</Link>
        </div>
      </section>,
      articlesLoaded && (
        <main>
          <section>
            <ul>
              <li>
                <h3>Meest gelezen</h3>
                <ul>
                  {articles
                    .sort((a, b) => {
                      return (
                        getOr(0, [b.slug], articleData).read -
                        getOr(0, [a.slug], articleData).read
                      );
                    })
                    .map((article, index) => {
                      if (index > 4) {
                        return false;
                      }
                      return (
                        <li>
                          <Link to={`articles/${article.slug}`}>
                            {article.title}
                          </Link>
                        </li>
                      );
                    })}
                </ul>
              </li>
              <li>
                <h3>Meeste comments</h3>
                <ul>
                  {articlesLoaded &&
                    articles
                      .sort((a, b) => {
                        return (
                          Object.keys(
                            getOr({ comments: [] }, [b.slug], articleData)
                              .comments
                          ).length -
                          Object.keys(
                            getOr({ comments: [] }, [a.slug], articleData)
                              .comments
                          ).length
                        );
                      })
                      .map((article, index) => {
                        if (index > 4) {
                          return false;
                        }
                        return (
                          <li>
                            <Link to={`articles/${article.slug}`}>
                              {article.title}
                            </Link>
                          </li>
                        );
                      })}
                </ul>
              </li>
            </ul>
          </section>
          <section>
            <div>
              <h2>Artikelen </h2>
              <span>
                {this.state.hideRead &&
                  `${articles.filter(article => {
                    return getOr(false, [article.slug], userRead);
                  }).length} verhalen verborgen`}
              </span>
            </div>
            {this.props.user && (
              <div>
                <label>
                  <input
                    checked={hideRead}
                    onChange={this.toggleRead}
                    type="checkbox"
                  />
                  Verberg gelezen
                </label>
                <label>
                  Sorteer op
                  <select value={sort} onChange={this.onSelect}>
                    <option disabled>Sorteer op</option>
                    <option value="random">Random</option>
                    <option value="read">Meest gelezen</option>
                    <option value="annotations">Aantal annotaties</option>
                    <option value="ascending">1 - 99</option>
                    <option value="descending">99 - 1</option>
                  </select>
                </label>
              </div>
            )}
            {this.props.user ? (
              <ul>
                {this.props.userIsLoggedIn &&
                articlesLoaded &&
                (Object.keys(getOr([], 'userRead', this.state)).length !==
                  articles.length ||
                  !this.state.hideRead) &&
                shuffled ? (
                  shuffled
                    .sort((a, b) => {
                      if (sort === 'read') {
                        return (
                          getOr(0, [b.slug], articleData).read -
                          getOr(0, [a.slug], articleData).read
                        );
                      } else if (sort === 'annotations') {
                        return (
                          Object.keys(
                            getOr({ comments: [] }, [b.slug], articleData)
                              .comments
                          ).length -
                          Object.keys(
                            getOr({ comments: [] }, [a.slug], articleData)
                              .comments
                          ).length
                        );
                      } else if (sort === 'ascending') {
                        return (
                          Math.round(a.slug.split('-')[1]) -
                          Math.round(b.slug.split('-')[1])
                        );
                      } else if (sort === 'descending') {
                        return (
                          Math.round(b.slug.split('-')[1]) -
                          Math.round(a.slug.split('-')[1])
                        );
                      }
                      return true;
                    })
                    .map(article => {
                      return (
                        <ListItem
                          hideRead={hideRead}
                          read={getOr(false, [article.slug], userRead)}
                          annotationsCount={
                            Object.keys(
                              getOr(
                                { comments: [] },
                                [article.slug],
                                articleData
                              ).comments
                            ).length
                          }
                          timesRead={
                            getOr({ read: 0 }, [article.slug], articleData).read
                          }
                          type="large"
                          key={`main-${article.slug}`}
                          article={article}
                        />
                      );
                    })
                ) : (
                  <EmptySlate />
                )}
              </ul>
            ) : (
              <ul>
                {shuffled.map(article => {
                  return (
                    <ListItem
                      annotationsCount={
                        Object.keys(
                          getOr({ comments: [] }, [article.slug], articleData)
                            .comments
                        ).length
                      }
                      timesRead={
                        getOr({ read: 0 }, [article.slug], articleData).read
                      }
                      type="large"
                      key={`main-${article.slug}`}
                      article={article}
                    />
                  );
                })}
              </ul>
            )}
          </section>
        </main>
      ),
    ];
  }
}

export default Main;
