import {all, takeEvery, put, call, select, takeLatest} from 'redux-saga/effects'
import {Record, OrderedMap} from 'immutable'
import {createSelector} from 'reselect'
import {getBook, updateBookApi, addBookApi} from "../redux/api";
import {setSubmitSucceeded, stopSubmit, startSubmit} from 'redux-form'

/**
 * Constants
 * */
export const moduleName = 'book_form'
const prefix = moduleName

export const LOAD_BOOK = `${prefix}/LOAD_BOOK`
export const LOAD_BOOK_START = `${prefix}/LOAD_BOOK_START`
export const LOAD_BOOK_SUCCESS = `${prefix}/LOAD_BOOK_SUCCESS`
export const LOAD_BOOK_ERROR = `${prefix}/LOAD_BOOK_ERROR`

export const UPDATE_BOOK = `${prefix}/UPDATE_BOOK`

export const ADD_BOOK = `${prefix}/ADD_BOOK`

/**
 * Reducer
 * */
export const initialState = Record({
  loading: false,
  loaded: false,
  entity: new OrderedMap(),
})

export const BookRecord = Record({
  id: null,
  title: null,
  author: null,
  year: null,
  image: null,
  description: null,
})

export default function reducer(state = new initialState(), action) {
  const {type, payload} = action

  switch (type) {
    case LOAD_BOOK_START:
      return state.set('loading', true)


    case LOAD_BOOK_SUCCESS:
      return state.set('loading', false)
        .set('loaded', true)
        .set('entity', new BookRecord(payload))

    default:
      return state
  }
}

/**
 * Selectors
 * */

export const stateSelector = (state) => state[moduleName]
export const bookSelector = createSelector(
  stateSelector,
  (state) => state.entity
)
export const loadingSelector = createSelector(
  stateSelector,
  (state) => state.loading
)
export const loadedSelector = createSelector(
  stateSelector,
  (state) => state.loaded
)


/**
 * Action Creators
 * */
export function loadBook(id) {
  return {
    type: LOAD_BOOK,
    payload: {id}
  }
}

export function updateBook(id, data) {
  return {
    type: UPDATE_BOOK,
    payload: {id, data}
  }
}

export function addBook(data) {
  return {
    type: ADD_BOOK,
    payload: {data}
  }
}

export function* updateBookSaga({payload: {id, data}}) {
  yield put(startSubmit('book'))
  try {
    const resp = yield call(updateBookApi, id, data)
    const {errors} = resp
    if (errors) {
      yield put(stopSubmit('book', errors))
    } else {
      yield put(stopSubmit('book'))
      yield put(setSubmitSucceeded('book'))
    }
  } catch (e) {
    yield put(stopSubmit('book', {
      _error:'К сожалению, не удалось выполнить сохранение книги. Попробуйте позже. '
    }))
  }
}

export function* addBookSaga({payload: {data}}) {
  yield put(startSubmit('book'))

  try {
    const resp = yield call(addBookApi, data)
    const {errors} = resp
    if (errors) {
      yield put(stopSubmit('book', errors))
    } else {
      yield put(stopSubmit('book'))
      yield put(setSubmitSucceeded('book'))
    }

  } catch (e) {
    yield put(stopSubmit('book', {
      _error:'К сожалению, не удалось выполнить сохранение книги. Попробуйте позже. '
    }))
  }
}

export function* loadBookSaga({payload: id}) {
  yield put({
    type: LOAD_BOOK_START,
    payload: id,
  })

  try {
    const resp = yield call(getBook, {id})
    yield put({
      type: LOAD_BOOK_SUCCESS,
      payload: resp
    })

  } catch (e) {
    yield put({
      type: LOAD_BOOK_ERROR
    })
  }
}

export function* saga() {
  yield all([
    takeEvery(LOAD_BOOK, loadBookSaga),
    takeEvery(UPDATE_BOOK, updateBookSaga),
    takeEvery(ADD_BOOK, addBookSaga),
  ])
}
