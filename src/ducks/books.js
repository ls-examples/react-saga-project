import {all, takeEvery, put, call, select, takeLatest} from 'redux-saga/effects'
import {Record, OrderedMap} from 'immutable'
import {createSelector} from 'reselect'
import {responseItemsToEntities} from './utils'
import {getBooks, getBook} from "../redux/api";

/**
 * Constants
 * */
export const moduleName = 'books'
const prefix = moduleName

export const FETCH_ALL_REQUEST = `${prefix}/FETCH_ALL_REQUEST`
export const FETCH_ALL_START = `${prefix}/FETCH_ALL_START`
export const FETCH_ALL_SUCCESS = `${prefix}/FETCH_ALL_SUCCESS`
export const FETCH_ALL_ERROR = `${prefix}/FETCH_ALL_ERROR`

export const SEARCH_REQUEST = `${prefix}/SEARCH_REQUEST`
export const SEARCH_INPUT = `${prefix}/SEARCH_INPUT`

const delay = (ms) => new Promise(res => setTimeout(res, ms))

/**
 * Reducer
 * */
export const initialState = Record({
  loading: false,
  loaded: false,
  entities: new OrderedMap(),
  limit: 10,
  page: 0,
  search: ''
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
    case SEARCH_INPUT:
      return initialState().set('search', payload)

    case FETCH_ALL_START:
      return state.set('loading', true)

    case FETCH_ALL_SUCCESS:
      return state
        .set('loading', false)
        .set('loaded', payload.loaded)
        .set('page', (state.page + 1))
        .mergeIn(['entities'], responseItemsToEntities(payload.items, BookRecord))

    default:
      return state
  }
}

/**
 * Selectors
 * */

export const stateSelector = (state) => state[moduleName]
export const entitiesSelector = createSelector(
  stateSelector,
  (state) => state.entities
)
export const loadingSelector = createSelector(
  stateSelector,
  (state) => state.loading
)
export const loadedSelector = createSelector(
  stateSelector,
  (state) => state.loaded
)
export const bookListSelector = createSelector(entitiesSelector, (entities) =>
  entities.valueSeq().toArray()
)


/**
 * Action Creators
 * */
export function loadBooks() {
  return {
    type: FETCH_ALL_REQUEST
  }
}

export function searchBooks(query) {
  return {
    type: SEARCH_REQUEST,
    payload: query
  }
}

/**
 * Sagas
 * */

export function* fetchAllSaga() {
  const {loading, loaded, limit, page, search} = yield select(stateSelector)
  if (loading || loaded) return

  yield put({
    type: FETCH_ALL_START
  })

  try {
    const resp = yield call(getBooks, {limit, page, search})
    yield put({
      type: FETCH_ALL_SUCCESS,
      payload: {
        items: resp.items,
        loaded: !resp.has_more
      }
    })

  } catch (e) {
    yield put({
      type: FETCH_ALL_ERROR
    })
  }
}

function* searchSaga({payload: query}) {
  // debounce by 500ms
  yield delay(500)
  yield put({
    type: SEARCH_INPUT,
    payload: query
  })
  yield call(fetchAllSaga)
}

export function* saga() {
  yield all([
    takeEvery(FETCH_ALL_REQUEST, fetchAllSaga),
    takeLatest(SEARCH_REQUEST, searchSaga)
  ])
}
