import {all, takeEvery, put, call, select, takeLatest} from 'redux-saga/effects'
import {Record, OrderedMap} from 'immutable'
import {createSelector} from 'reselect'
import api, {ERRORS as apiErrors} from "../redux/api";

/**
 * Constants
 * */
export const moduleName = 'book_view'
const prefix = moduleName

export const LOAD_BOOK = `${prefix}/LOAD_BOOK`
export const LOAD_BOOK_START = `${prefix}/LOAD_BOOK_START`
export const LOAD_BOOK_SUCCESS = `${prefix}/LOAD_BOOK_SUCCESS`
export const LOAD_BOOK_NOT_FOUND = `${prefix}/LOAD_BOOK_NOT_FOUND`
export const LOAD_BOOK_ERROR = `${prefix}/LOAD_BOOK_ERROR`

export const DELETE_BOOK = `${prefix}/DELETE_BOOK`
export const DELETE_BOOK_START = `${prefix}/DELETE_BOOK_START`
export const DELETE_BOOK_SUCCESS = `${prefix}/DELETE_BOOK_SUCCESS`
export const DELETE_BOOK_ERROR = `${prefix}/DELETE_BOOK_ERROR`
export const DELETE_BOOK_NOT_FOUND = `${prefix}/DELETE_BOOK_NOT_FOUND`

export const CLEAR_STORE = `${prefix}/CLEAR_STORE`

/**
 * Reducer
 * */
export const initialState = Record({
  loading: false,
  loaded: false,
  entity: new OrderedMap(),
  isDeleted: false,
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
    case DELETE_BOOK_START:
      return state.set('loading', true)

    case DELETE_BOOK_SUCCESS:
      return state.set('loading', false)
        .set('loaded', false)
        .set('isDeleted', true)
        .set('entity', null)

    case DELETE_BOOK_NOT_FOUND:
      return state.set('loading', false)
        .set('loading', false)

    case LOAD_BOOK_START: {
      return state.set('loading', true)
    }

    case LOAD_BOOK_SUCCESS:
      return state.set('loading', false)
        .set('loaded', true)
        .set('entity', new BookRecord(payload))


    case LOAD_BOOK_NOT_FOUND:
      return state.set('loading', false)
        .set('loaded', false)
        .set('entity', null)

    case CLEAR_STORE:
      return new initialState()

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
export const isDeletedSelector = createSelector(
  stateSelector,
  (state) => state.isDeleted
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


export function deleteBook(id) {
  return {
    type: DELETE_BOOK,
    payload: id
  }
}

export function clearStore() {
  return {
    type: CLEAR_STORE,
  }
}

/**
 * Sagas
 * */
export function* loadBookSaga({payload: id}) {
  yield put({
    type: LOAD_BOOK_START,
    payload: id,
  })

  try {
    const resp = yield call(api.getBook, id)
    yield put({
      type: LOAD_BOOK_SUCCESS,
      payload: resp.data
    })
  } catch (e) {
    if (e === apiErrors.NotFoundError) {
      yield put({
        type: LOAD_BOOK_NOT_FOUND,
      })
    }
    yield put({
      type: LOAD_BOOK_ERROR,
    })
  }
}

export function* deleteBookSaga({payload: id}) {
  yield put({
    type: DELETE_BOOK_START,
    payload: id,
  })
  try {
    const resp = yield call(api.deleteBook, id)
    if (resp.errors) {
      throw new Error(JSON.stringify(resp.errors))
    }
    yield put({
      type: DELETE_BOOK_SUCCESS,
    })

  } catch (e) {
    console.error(e)
    if (e === apiErrors.NotFoundError) {
      yield put({
        type: DELETE_BOOK_NOT_FOUND,
      })
    }
    yield put({
      type: DELETE_BOOK_ERROR
    })
  }
}

export function* saga() {
  yield all([
    takeEvery(LOAD_BOOK, loadBookSaga),
    takeEvery(DELETE_BOOK, deleteBookSaga),
  ])
}
