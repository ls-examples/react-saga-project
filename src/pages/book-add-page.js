import React, {Component} from 'react';
import {connect} from 'react-redux';
import BookForm from "../components/books/book-form";
import {addBook} from "../ducks/book-form";

class BookAddPage extends Component {
  render() {
    return (
      <div>
        <BookForm onSubmit={this.props.addBook}/>
      </div>
    );
  }
}

export default connect(
  null,
  {
    addBook
  }
)(BookAddPage)
