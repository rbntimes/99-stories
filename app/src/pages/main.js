import React, { Component } from 'react';
import ListItem from './../components/ListItem';
import getOr from 'lodash/fp/getOr';
import { Link } from 'react-router-dom';

import { articles } from './../constants';
import fire from './../fire';
import shuffle from './../shuffle';
class Main extends Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      shuffled: shuffle(articles.slice(0)),
      commentsLoaded: false,
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

    fire
      .database()
      .ref(`users/${this.props.user.uid}`)
      .once('value')
      .then(snapshot => {
        this.setState({
          userRead: snapshot.val().articlesRead || [],
          sort: snapshot.val().sortBy || 'read',
          hideRead: snapshot.val().hideRead || false,
        });
      });
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
      display,
    } = this.state;

    const randomStory = articles[Math.floor(Math.random() * articles.length)];

    return [
      <section>
        <div>
          <h3>
            <Link to={`/articles/${randomStory.slug}`}>
              {randomStory.title}
            </Link>
          </h3>
          <p>{randomStory.body.substr(0, 200)}</p>
        </div>
      </section>,
      <main>
        <section>
          <ul>
            <li>
              <h3>Meest gelezen</h3>
              <ul>
                {articlesLoaded &&
                  articles
                    .sort((a, b) => {
                      return (
                        getOr(0, [b.slug], articleData).read -
                        getOr(0, [a.slug], articleData).read
                      );
                    })
                    .map((article, index) => {
                      if (index > 4) {
                        return;
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
                        return;
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
          <h2>Artikelen </h2>
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
              Filter op
              <select onChange={this.onSelect}>
                <option disabled>Sorteer op</option>
                <option selected={sort === 'read'} value="read">
                  Aantal x gelezen
                </option>
                <option selected={sort === 'annotations'} value="annotations">
                  Aantal annotaties
                </option>
                <option selected={sort === 'ascending'} value="ascending">
                  1 - 99
                </option>
                <option selected={sort === 'descending'} value="descending">
                  99 - 1
                </option>
              </select>
            </label>
          </div>
          <ul>
            {shuffled &&
              shuffled
                .filter(article => {
                  if (hideRead) {
                    return !getOr(false, [article.slug], userRead);
                  }
                  return article;
                })
                .sort((a, b) => {
                  if (sort === 'read') {
                    return (
                      getOr(0, [b.slug], articleData).read -
                      getOr(0, [a.slug], articleData).read
                    );
                  } else if (sort === 'annotations') {
                    return (
                      Object.keys(
                        getOr({ comments: [] }, [b.slug], articleData).comments
                      ).length -
                      Object.keys(
                        getOr({ comments: [] }, [a.slug], articleData).comments
                      ).length
                    );
                  } else if (sort === 'ascending') {
                    return (
                      Math.round(a.slug.split('-')[1]) -
                      Math.round(b.slug.split('-')[1])
                    );
                  } else {
                    return (
                      Math.round(b.slug.split('-')[1]) -
                      Math.round(a.slug.split('-')[1])
                    );
                  }
                })
                .map(article => (
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
                    display={display}
                    type="large"
                    key={`main-${article.slug}`}
                    article={article}
                  />
                ))}
          </ul>
        </section>
      </main>,
      // <aside>
      //   <section>
      // <select onChange={this.onSelect}>
      //   <option disabled>Sorteer op</option>
      //   <option selected={sort === 'read'} value="read">
      //     Aantal x gelezen
      //   </option>
      //   <option selected={sort === 'annotations'} value="annotations">
      //     Aantal annotaties
      //   </option>
      //   <option selected={sort === 'ascending'} value="ascending">
      //     1 - 99
      //   </option>
      //   <option selected={sort === 'descending'} value="descending">
      //     99 - 1
      //   </option>
      // </select>
      //   </section>
      //   <section>
      //     <ul>
      //       {articlesLoaded &&
      //         articles
      // .sort((a, b) => {
      //   if (sort === 'read') {
      //     return (
      //       getOr(0, [b.slug], articleData).read -
      //       getOr(0, [a.slug], articleData).read
      //     );
      //   } else if (sort === 'annotations') {
      //     return (
      //       Object.keys(
      //         getOr({ comments: [] }, [b.slug], articleData).comments
      //       ).length -
      //       Object.keys(
      //         getOr({ comments: [] }, [a.slug], articleData).comments
      //       ).length
      //     );
      //   } else if (sort === 'ascending') {
      //     return (
      //       Math.round(a.slug.split('-')[1]) -
      //       Math.round(b.slug.split('-')[1])
      //     );
      //   } else {
      //     return (
      //       Math.round(b.slug.split('-')[1]) -
      //       Math.round(a.slug.split('-')[1])
      //     );
      //   }
      // })
      //           .map(article => (
      //             <ListItem
      // annotationsCount={
      //   Object.keys(
      //     getOr({ comments: [] }, [article.slug], articleData)
      //       .comments
      //   ).length
      // }
      // timesRead={
      //   getOr({ read: 0 }, [article.slug], articleData).read
      // }
      //               read={getOr(false, [article.slug], userRead)}
      //               type="small"
      //               key={`aside-${article.slug}`}
      //               article={article}
      //             />
      //           ))}
      //     </ul>
      //   </section>
      // </aside>,
    ];
  }
}

export default Main;
