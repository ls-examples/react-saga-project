import { all } from 'redux-saga/effects'
import { saga as booksSaga } from '../ducks/books'
import { saga as bookViewSaga } from '../ducks/book-view'
import { saga as bookFormSaga } from '../ducks/book-form'

export default function*() {
  yield all([booksSaga(), bookViewSaga(), bookFormSaga()])
}
