import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {CardTitle, Col, Row, CardText, Card, CardImg} from "reactstrap"
import {NavLink} from 'react-router-dom'

class BookItem extends Component {
  static propTypes = {
    book: PropTypes.shape({
      id: PropTypes.number,
      title: PropTypes.string,
      author: PropTypes.string,
      year: PropTypes.year,
      image: PropTypes.shape({
        url: PropTypes.string,
        thumbnail: PropTypes.string
      }),
    })
  }

  render() {
    const {id, title, author, image} = this.props.book
    const thumb = image ? image.thumbnail : "https://placeholdit.imgix.net/~text?txtsize=33&txt=IMG&w=100&h=100"

    return (
      <Col sm="6">
        <Card body className="mt-2">
          <Row>
            <Col sm={2}>
              <CardImg width="100%" src={thumb}/>
            </Col>
            <Col sm={10}>
              <CardTitle><NavLink to={`/book/${id}`} activeStyle={{color: 'red'}}>{title}</NavLink></CardTitle>
              <CardText>
                {author}
              </CardText>
            </Col>
          </Row>
        </Card>
      </Col>
    );
  }
}

export default BookItem;
