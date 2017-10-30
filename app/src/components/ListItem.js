import React, { Component } from 'react';

import { Link } from 'react-router-dom';

class ListItem extends Component {
  constructor(props) {
    super(props);
    this.state = { beingRead: false, beingAnnotated: false, hidden: false };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.timesRead !== nextProps.timesRead) {
      this.setState({
        beingRead: true,
      });
      setTimeout(() => {
        this.setState({
          beingRead: false,
        });
      }, 5000);
    }
    if (this.props.annotationsCount !== nextProps.annotationsCount) {
      this.setState({
        beingAnnotated: true,
      });
      setTimeout(() => {
        this.setState({
          beingAnnotated: false,
        });
      }, 5000);
    }
    if (
      nextProps.hideRead !== this.props.hideRead &&
      nextProps.hideRead === true &&
      nextProps.read === true
    ) {
      this.setState({
        hiding: true,
        hidden: false,
      });
      setTimeout(() => {
        this.setState({ hiding: false, hidden: true });
      }, 1000);
    } else if (nextProps.hideRead === false && nextProps.read === true) {
      this.setState({
        hiding: false,
        hidden: false,
      });
      // setTimeout(() => {
      //   this.setState({ hiding: false, hidden: false });
      // }, 1000);
    }
  }

  render() {
    const {
      key,
      article,
      type,
      annotationsCount,
      timesRead,
      read,
      hide,
    } = this.props;

    if (!this.state.hidden) {
      return (
        <li data-visible={!this.state.hiding} key={key}>
          <article>
            <Link to={`articles/${article.slug}`}>
              <h3>{article.title}</h3>
            </Link>
            <footer>
              <span data-being-read={this.state.beingRead}>
                {timesRead}x gelezen
              </span>
              <span data-being-annotated={this.state.beingAnnotated}>
                {annotationsCount}x geannoteerd
              </span>
            </footer>
            <p>{article.body.substr(0, 300)}</p>
            <Link to={`articles/${article.slug}`}>Lees meer</Link>
          </article>
        </li>
      );
    } else {
      return (
        <li data-visible={this.state.hiding} style={{ display: 'none' }} />
      );
    }
  }
}

export default ListItem;
