import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {CardTitle, Col, CardText, Card} from "reactstrap"
import {NavLink} from 'react-router-dom'

class BookItem extends Component {
  static propTypes = {
    book: PropTypes.shape({
      id: PropTypes.number,
      title: PropTypes.string,
      author: PropTypes.string,
      year: PropTypes.year,
      img: PropTypes.string,
    })
  }

  render() {
    const {id, title, author} = this.props.book
    return (
      <Col sm="6">
        <Card body>
          <CardTitle><NavLink to={`/book/${id}`} activeStyle={{color: 'red'}}>{title}</NavLink></CardTitle>
          <CardText>
            {author}
          </CardText>
        </Card>
      </Col>
    );
  }
}

export default BookItem;
