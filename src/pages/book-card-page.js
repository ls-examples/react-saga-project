import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import BookCard from '../components/books/book-card'
import {loadBook, loadedSelector, loadingSelector, bookSelector} from "../ducks/book-view";
import Loader from "../components/common/loader";
import NotFound from "../components/common/not-found";

class BookCardPage extends Component {
  static propTypes = {
    id: PropTypes.number,
    loading: PropTypes.bool,
    loaded: PropTypes.bool,
    loadBook: PropTypes.func,
  }

  constructor(props) {
    super(props)
    const {loadBook, id} = this.props
    loadBook(id)
  }

  render() {
    const {book, id, loading} = this.props

    if (!book) {
      const message = 'Книга с id ' + id + ' не найдена';
      return <NotFound message={message}/>
    }

    if (loading) {
      return <Loader/>
    }

    return (
      <div>
        <BookCard book={book}/>
      </div>
    );
  }
}


export default connect(
  (state) => ({
    book: bookSelector(state),
    loading: loadingSelector(state),
    loaded: loadedSelector(state)
  }),
  {
    loadBook
  }
)(BookCardPage)
