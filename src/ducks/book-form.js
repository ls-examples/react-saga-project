import {all, takeEvery, put, call} from 'redux-saga/effects'
import {Record, OrderedMap} from 'immutable'
import {createSelector} from 'reselect'
import api from "../redux/api";
import {setSubmitSucceeded, stopSubmit, startSubmit} from 'redux-form'
import {getBase64} from "./utils";

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
    payload: id
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
    const resp = yield call(api.updateBook, id, data)
    const {errors} = resp
    if (errors) {
      //yield put(stopSubmit('book', errors))
      throw new Error(JSON.stringify(errors)) //решила не показывать ошибки от бекенда
    }

    yield put(stopSubmit('book'))
    yield put(setSubmitSucceeded('book'))

  } catch (e) {
    yield put(stopSubmit('book', {
      _error: 'К сожалению, не удалось выполнить сохранение книги. Попробуйте позже. '
    }))
  }
}

export function* addBookSaga({payload: {data}}) {
  yield put(startSubmit('book'))

  try {
    const resp = yield call(api.addBook, data)
    const {errors} = resp
    if (errors) {
      //yield put(stopSubmit('book', errors))
      throw new Error(JSON.stringify(errors)) //решила не показывать ошибки от бекенда
    }

    yield put(stopSubmit('book'))
    yield put(setSubmitSucceeded('book'))
  } catch (e) {
    console.log(e.message)
    yield put(stopSubmit('book', {
      _error: 'К сожалению, не удалось выполнить сохранение книги. Попробуйте позже. '
    }))
  }
}

export function* loadBookSaga({payload: id}) {
  yield put({
    type: LOAD_BOOK_START,
    payload: id,
  })

  try {
    const resp = yield call(api.getBook, {id})
    const data = resp.data
    if (resp.data.image) {
      const imageBlob = yield call(api.getImage, resp.data.image.url)
      data.image = yield call(getBase64, imageBlob)
    }
    yield put({
      type: LOAD_BOOK_SUCCESS,
      payload: data
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
