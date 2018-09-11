import React, {Component} from 'react';
import PropTypes from 'prop-types';

class NotFound extends Component {
  static propTypes = {
    message: PropTypes.string
  }

  constructor(props) {
    super(props)
    this.state = {
      message: this.props.message ? this.props.message : 'К сожалению страница не найдена'
    }
  }

  render() {
    const {message} = this.state
    return (
      <div>
        {message}
      </div>
    );
  }
}


export default NotFound;
