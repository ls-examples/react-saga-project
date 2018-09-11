import React, {Component, Fragment} from 'react'
import PropTypes from 'prop-types'
import BookItem from "./book-item"
import {Row, Button} from "reactstrap"
import Filters from "../filters/filters"
import {connect} from 'react-redux'
import Loader from '../common/loader'
import {bookListSelector, loadBooks, loadedSelector, loadingSelector, searchBooks} from "../../ducks/books";

class BookList extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    loading: PropTypes.bool,
    loaded: PropTypes.bool,
    loadBooks: PropTypes.func,
    searchBooks: PropTypes.func,
  }

  componentDidMount() {
    const {loading, loaded, loadBooks, books} = this.props
    if (!loading && !loaded && books.length === 0) {
      loadBooks()
    }
  }

  render() {
    const {loading} = this.props

    return (
      <div>
        <Filters onSearch={this.props.searchBooks}/>
        <div className="mb-2">
          {this.renderElements()}
        </div>
        <div style={{textAlign: 'center'}}>
          {loading && <Loader/>}
          {this.renderShowMoreButton()}
        </div>
      </div>
    );
  }

  renderElements() {
    const {books} = this.props

    return (
      <Row>
        {books.map((book) => (
          <BookItem key={book.id} book={book}/>
        ))}
      </Row>
    )
  }

  renderShowMoreButton = () => {
    const {books, loaded, loading} = this.props
    if (loaded || loading || books.length === 0) {
      return
    }

    return (
      <Button
        onClick={this.props.loadBooks}
        className="mt-3" color="secondary">Показать ещё</Button>
    )
  }
}

export default connect(
  (state) => ({
    books: bookListSelector(state),
    loading: loadingSelector(state),
    loaded: loadedSelector(state)
  }),
  {loadBooks, searchBooks}
)(BookList)
