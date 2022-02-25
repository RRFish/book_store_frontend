import { createStore, combineReducers } from 'redux';
import userReducer from '../reducer/user.js';
import routerReducer from '../reducer/router.js';

const rootReducer = combineReducers({
  userReducer,
  routerReducer
})

const store = createStore(rootReducer);

export default store;