import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {CardTitle, Col, CardText, Card, Button, Row, CardFooter, CardBody, CardHeader} from "reactstrap";
import {books} from "../../fixtures";
import {NavLink} from "react-router-dom";

class BookCard extends Component {

  static propTypes = {
    book: PropTypes.shape({
      id: PropTypes.number,
      title: PropTypes.string,
      author: PropTypes.string,
      year: PropTypes.year,
      img: PropTypes.string,
      description: PropTypes.string,
    })
  }

  render() {
    if (!this.props.book) {
      return (<div>Not Found</div>)
    }
    const {id, title, author, year, description} = this.props.book
    return (
      <Card body>
        <CardHeader><CardTitle>{title}</CardTitle></CardHeader>
        <CardBody>
          <CardText tag="div">
            <div>Автор: {author}</div>
            <div>Год издания : {year}</div>
            <div>{description}</div>
          </CardText>
        </CardBody>
        <CardFooter>
          <NavLink to={`/book/edit/${id}`}>
            <Button color="primary">Редактировать</Button>
          </NavLink>
          <Button className="ml-2" color="danger">Удалить</Button>
        </CardFooter>
      </Card>
    );
  }
}

export default () =>
  <BookCard
    book={books[0]}
  />
