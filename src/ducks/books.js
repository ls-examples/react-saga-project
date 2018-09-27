import {all, takeEvery, put, call, select, takeLatest} from 'redux-saga/effects'
import {Record, OrderedMap} from 'immutable'
import {createSelector} from 'reselect'
import {responseItemsToEntities} from '../utils'
import api from "../redux/api";

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

export const SORT_REQUEST = `${prefix}/SORT_REQUEST`
export const SORT_CHANGE = `${prefix}/SORT_CHANGE`

export const CLEAR_STORE = `${prefix}/CLEAR_STORE`

const delay = (ms) => new Promise(res => setTimeout(res, ms))

/**
 * Reducer
 * */
export const initialState = Record({
  loading: false,
  loaded: false,
  entities: new OrderedMap(),
  page: 1,
  search: '',
  orderDirection: '',
  orderBy: '',
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
    case SEARCH_INPUT:
      const {search} = payload
      return state
        .set('search', search)
        .set('entities', new OrderedMap())
        .set('loading', false)
        .set('loaded', false)
        .set('page', 1)

    case SORT_CHANGE:
      const {orderBy, orderDirection} = payload
      return state
        .set('entities', new OrderedMap())
        .set('loading', false)
        .set('loaded', false)
        .set('orderBy', orderBy)
        .set('orderDirection', orderDirection)
        .set('page', 1)

    case FETCH_ALL_START:
      return state.set('loading', true)

    case FETCH_ALL_SUCCESS:
      console.log("payload.data", payload)
      return state
        .set('loading', false)
        .set('loaded', payload.loaded)
        .set('page', (state.page + 1))
        .mergeIn(['entities'], responseItemsToEntities(payload.items, BookRecord))

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
export const entitiesSelector = createSelector(
  stateSelector,
  (state) => state.entities
)
export const loadingSelector = createSelector(
  stateSelector,
  (state) => state.loading
)
export const orderDirectionSelector = createSelector(
  stateSelector,
  (state) => state.orderDirection
)
export const orderBySelector = createSelector(
  stateSelector,
  (state) => state.orderBy
)
export const loadedSelector = createSelector(
  stateSelector,
  (state) => state.loaded
)
export const bookListSelector = createSelector(entitiesSelector, (entities) =>
  entities.valueSeq().toArray()
)

export const searchSelector = createSelector(
  stateSelector,
  (state) => state.search
)


/**
 * Action Creators
 * */
export function loadBooks() {
  return {
    type: FETCH_ALL_REQUEST
  }
}

export function searchBooks(search) {
  return {
    type: SEARCH_REQUEST,
    payload: {search}
  }
}


export function changeSort(orderBy, orderDirection) {
  console.log('changeSort', orderBy, orderDirection)
  return {
    type: SORT_REQUEST,
    payload: {orderBy, orderDirection}
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

export function* fetchAllSaga() {
  const {loading, loaded, page, search, orderBy, orderDirection} = yield select(stateSelector)
  if (loading || loaded) return

  yield put({
    type: FETCH_ALL_START
  })

  try {
    const resp = yield call(api.getBooks, {page, search, orderBy, orderDirection})
    yield put({
      type: FETCH_ALL_SUCCESS,
      payload: {
        items: resp.data,
        loaded: null === resp.links.next
      }
    })

  } catch (e) {
    console.error(e)
    yield put({
      type: FETCH_ALL_ERROR
    })
  }
}

function* searchSaga({payload: {search}}) {
  // debounce by 500ms
  yield put({
    type: SEARCH_INPUT,
    payload: {search}
  })
  yield delay(500)
  yield call(fetchAllSaga)
}

function* sortSaga({payload: {orderBy, orderDirection}}) {
  // debounce by 500ms
  yield put({
    type: SORT_CHANGE,
    payload: {orderBy, orderDirection}
  })

  yield call(fetchAllSaga)
}

export function* saga() {
  yield all([
    takeEvery(FETCH_ALL_REQUEST, fetchAllSaga),
    takeLatest(SEARCH_REQUEST, searchSaga),
    takeEvery(SORT_REQUEST, sortSaga)
  ])
}
