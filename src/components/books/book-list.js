import React, {Component} from 'react'
import PropTypes from 'prop-types'
import BookItem from "./book-item"
import {Row, Button} from "reactstrap"
import Filters from "../filters/filters"
import {books} from "../../fixtures"

class BookList extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
  }

  render() {
    const {books} = this.props
    const elements = books.map((book) => (
      <BookItem key={book.id} book={book}/>
    ))
    return (
      <div>
        <Filters/>
        <Row>
          {elements}
        </Row>
        <div  style={{textAlign : 'center'}}><Button className="mt-3"  color="secondary">Показать ещё</Button></div>
      </div>
    );
  }
}

export default () => <BookList
  books={books}
/>;
