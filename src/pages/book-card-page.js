import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import BookCard from '../components/books/book-card'
import {loadBook, deleteBook, clearStore, loadedSelector, loadingSelector, bookSelector, isDeletedSelector} from "../ducks/book-view";
import Loader from "../components/common/loader";
import NotFound from "../components/common/not-found";

class BookCardPage extends Component {
  static propTypes = {
    id: PropTypes.number,
    loading: PropTypes.bool,
    loaded: PropTypes.bool,
    loadBook: PropTypes.func,
    clearStore: PropTypes.func,
    isDeleted: PropTypes.bool,
  }

  constructor(props) {
    super(props)
    const {loadBook, id, clearStore} = this.props
    clearStore()
    loadBook(id)
  }

  render() {
    const {book, loading, isDeleted} = this.props
    if (isDeleted) {
      return <div>Книга удалена</div>
    }
    if (!book) {
      const message = 'The book not found';
      return <NotFound message={message}/>
    }

    if (loading) {
      return <Loader/>
    }

    return (
      <div>
        <BookCard handleDeleteBook={this.handleDeleteBook} book={book}/>
      </div>
    );
  }

  handleDeleteBook = () => {
    const {id, deleteBook} = this.props
    deleteBook(id)
  }
}


export default connect(
  (state) => ({
    book: bookSelector(state),
    loading: loadingSelector(state),
    loaded: loadedSelector(state),
    isDeleted: isDeletedSelector(state),
  }),
  {
    loadBook, deleteBook, clearStore
  }
)(BookCardPage)
