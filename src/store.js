import thunkMiddleware from 'redux-thunk';
import {createStore, applyMiddleware, compose, combineReducers} from 'redux';

/* Relative import */
import {modules} from './modules';
import {combineModuleReducers} from './core/utility/module';

let store;

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const createAppStore = (reducer, ...middleware) => {
  middleware.push(thunkMiddleware);
  const store = createStore(
      reducer,
      composeEnhancers(applyMiddleware(...middleware)),
  );
  return store;
};

export const configureStore = () => {
  if (store) {
    return store;
  }
  store = createAppStore(combineReducers(combineModuleReducers(modules)));

  return store;
};
