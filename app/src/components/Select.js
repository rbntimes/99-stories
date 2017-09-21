import React, { Component, PropTypes } from 'react';

class Select extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const target = document.querySelector('[data-selectable]');
    target.addEventListener('mouseup', this._handleMouseUp);
  }

  componentWillUnmount() {
    const target = document.querySelector('[data-selectable]');
    target.removeEventListener('mouseup', this._handleMouseUp);
  }

  render() {
    const { children } = this.props;
    return children;
  }

  _handleMouseUp = () => {
    this.props.onSelect(window.getSelection().toString());
  };
}

Select.propTypes = {};

Select.defaultProps = {};

export default Select;
