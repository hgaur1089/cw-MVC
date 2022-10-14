import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import rootReducer from '../reducers';

const logger = ({dispatch, getState}) => (next) => (action) => {
  // console.log('ACTION_TYPE = ', action.type);
  if(typeof action !== 'function') {
    // console.log('ACTION = ', action);
  }
  next(action);
};

export default function configureStore() {
  return createStore(rootReducer, applyMiddleware(logger, thunk));
}
