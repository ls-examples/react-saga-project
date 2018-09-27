import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {CardTitle, CardText, Card, Button, CardFooter, CardBody, CardHeader} from "reactstrap";
import {NavLink} from "react-router-dom";

class BookCard extends Component {

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
      description: PropTypes.string,
    }),
    handleDeleteBook: PropTypes.func,
  }

  render() {
    const {id, title, author, year, description, image} = this.props.book
    return (
      <Card body>
        <CardHeader><CardTitle>{title}</CardTitle></CardHeader>
        <CardBody>
          <CardText tag="div">
            <div>Author: {author}</div>
            <div>Year : {year}</div>
            <div>{description}</div>
            {image ? <div><img alt="" height={300} src={image.url}/></div> : ''}
          </CardText>
        </CardBody>
        <CardFooter>
          <NavLink to={`/book/edit/${id}`}>
            <Button color="primary">Edit</Button>
          </NavLink>
          <Button className="ml-2" color="danger" onClick={this.props.handleDeleteBook}>Delete</Button>
        </CardFooter>
      </Card>
    );
  }
}

export default BookCard
