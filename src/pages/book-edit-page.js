import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {loadBook, updateBook, loadedSelector, loadingSelector, bookSelector} from "../ducks/book-form";
import Loader from "../components/common/loader";
import NotFound from "../components/common/not-found";
import BookForm from "../components/books/book-form";

class BookEditPage extends Component {
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
        <BookForm onSubmit={this.handleSubmit} book={book}/>
      </div>
    );

  }

  handleSubmit = (data) => {
    const {id, updateBook} = this.props
    updateBook(id, data)
  }
}


export default connect(
  (state) => ({
    book: bookSelector(state),
    loading: loadingSelector(state),
    loaded: loadedSelector(state)
  }),
  {
    loadBook, updateBook
  }
)(BookEditPage)
