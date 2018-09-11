import { combineReducers } from 'redux'
import { reducer as form } from 'redux-form'
import booksReducer, { moduleName as booksModule } from '../ducks/books'
import bookViewReducer, { moduleName as bookViewModule } from '../ducks/book-view'
import bookFormReducer, { moduleName as bookFormModule } from '../ducks/book-form'

export default combineReducers({
  form,
  [booksModule]: booksReducer,
  [bookViewModule]: bookViewReducer,
  [bookFormModule]: bookFormReducer,
})
