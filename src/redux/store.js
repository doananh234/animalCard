import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import thunk from 'redux-thunk';
import createHistory from 'history/createBrowserHistory';
import createSagaMiddleware from 'redux-saga';
import { RestClient } from 'aor-parseserver-client';
import { crudSaga } from 'admin-on-rest';
import reducers from './reducers';

export const history = createHistory();
const sagaMiddleware = createSagaMiddleware();

const initialState = {};
const enhancers = [];
const middleware = [thunk, sagaMiddleware, routerMiddleware(history)];

if (process.env.NODE_ENV === 'development') {
  const devToolsExtension = window.devToolsExtension;

  if (typeof devToolsExtension === 'function') {
    enhancers.push(devToolsExtension());
  }
}

const composedEnhancers = compose(applyMiddleware(...middleware), ...enhancers);

const store = createStore(reducers, initialState, composedEnhancers);
const parseConfig = {
  URL: 'http://childcare-api.server.enouvo.com/1',
  'APP-ID': 'f7txA8e6QS0PHRAEHJxrldYrZdPDczBo0g89wwlQ',
  'REST-API-KEY': 'v8txaWLMehRuDU4XEEfUDHtc24weL5RDVof5d0HU',
};
const restClient = RestClient(parseConfig);
sagaMiddleware.run(crudSaga(restClient));

export default store;
