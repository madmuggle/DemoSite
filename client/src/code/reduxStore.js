import { createStore } from "redux";


/**
 * CAUSION:
 *
 * Object.assign({}, state, ...) can't be replaced by Object.assign(state, ...),
 */
function reducer(state = {}, action) {
  switch (action.type) {
  case "LOGIN":
    return Object.assign({}, state, { isLoggedIn: true });

  case "LOGOUT":
    return Object.assign({}, state, { isLoggedIn: false, userInfo: null });

  case "UPDATE_USERINFO":
    return Object.assign({}, state, { userInfo: action.data });

  default:
    return state;
  }
}

const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);


export default store;

