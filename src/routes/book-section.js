import React, { Component } from 'react'
import {Route, Switch} from 'react-router-dom'
import BookList from '../components/books/book-list'
import BookCard from '../components/books/book-card'


class BookSection extends Component {

  render() {
    return (
      <Switch>
        <Route exact path='/book' component={BookList}/>
        <Route path='/book/:id' component={BookCard}/>
      </Switch>
    )
  }

}

export default BookSection
