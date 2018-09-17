import React, {Component} from 'react'
import PropTypes from 'prop-types'
import BookItem from "./book-item"
import {Row, Button} from "reactstrap"
import Filters from "../filters/filters"
import {connect} from 'react-redux'
import Loader from '../common/loader'
import {
  bookListSelector,
  clearStore,
  loadBooks,
  loadedSelector,
  loadingSelector,
} from "../../ducks/books";

class BookList extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    loading: PropTypes.bool,
    loaded: PropTypes.bool,
    loadBooks: PropTypes.func,
    clearStore: PropTypes.func,
    searchBooks: PropTypes.func,
  }

  constructor(props) {
    super(props)
    const {clearStore, loadBooks} = this.props
    clearStore()
    loadBooks()
  }

  render() {
    const {loading} = this.props
    return (
      <div>
        <Filters/>
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
  {loadBooks, clearStore}
)(BookList)
