import React, {Component} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faCode} from '@fortawesome/free-solid-svg-icons'

class SourceLinks extends Component {
  render() {
    return (
      <div>
        <a href="https://github.com/ls-examples/react-saga-project"
           className="badge badge-primary" target="_blank"><FontAwesomeIcon icon={faCode}/>Source code</a>
        <a href="http://booksapi.examples.lilit-web.ru/api/documentation"
           className="badge badge-info" target="_blank">API documentation</a>
        <a href="https://github.com/ls-examples/laravel-api"
           className="badge badge-secondary" target="_blank"><FontAwesomeIcon icon={faCode}/>API source code</a>
      </div>
    );
  }
}

export default SourceLinks;
