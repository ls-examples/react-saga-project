import {all, takeEvery, put, call, select, takeLatest} from 'redux-saga/effects'
import {Record, OrderedMap} from 'immutable'
import {createSelector} from 'reselect'
import {getBook} from "../redux/api";

/**
 * Constants
 * */
export const moduleName = 'book_view'
const prefix = moduleName

export const LOAD_BOOK = `${prefix}/LOAD_BOOK`
export const LOAD_BOOK_START = `${prefix}/LOAD_BOOK_START`
export const LOAD_BOOK_SUCCESS = `${prefix}/LOAD_BOOK_SUCCESS`
export const LOAD_BOOK_ERROR = `${prefix}/LOAD_BOOK_ERROR`

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
  img: null,
  description: null,
})

export default function reducer(state = new initialState(), action) {
  const {type, payload} = action

  switch (type) {
    case LOAD_BOOK_START: {
        return state.set('loading', true)
    }

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
  ])
}
