import { Component } from 'react';

class Select extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const target = document.querySelector('[data-selectable]:not([mark])');
    target.addEventListener('mouseup', this._handleMouseUp);
  }

  componentWillUnmount() {
    const target = document.querySelector('[data-selectable]:not([mark])');
    target.removeEventListener('mouseup', this._handleMouseUp);
  }

  render() {
    const { children } = this.props;
    return children;
  }

  _handleMouseUp = () => {
    if (window.getSelection().toString()) {
      this.props.onSelect(window.getSelection().toString());
    } else {
      this.props.onSelect(undefined);
    }
    return;
  };
}

export default Select;
