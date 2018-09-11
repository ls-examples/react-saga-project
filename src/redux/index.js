import { createStore, applyMiddleware, compose } from 'redux'
//import { connectRouter, routerMiddleware } from 'connected-react-router'
import logger from 'redux-logger'
import createSagaMiddleware from 'redux-saga'
import reducer from './reducer'
import saga from './saga'

const sagaMiddleware = createSagaMiddleware()

const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
    })
    : compose

const enhancer = composeEnhancers(applyMiddleware(
  sagaMiddleware,
  //routerMiddleware(history),
  logger
))

const store = createStore(reducer, enhancer)

sagaMiddleware.run(saga)

//dev only, no need in production
window.store = store

export default store
