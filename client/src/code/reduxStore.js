import { createStore } from "redux";


/**
 * CAUSION:
 *
 * Object.assign({}, state, ...) can't be replaced by Object.assign(state, ...),
 */
function reducer(state, action) {
  switch (action.type) {
  case "LOGIN":
    return Object.assign({}, state, { isLoggedIn: true });

  case "LOGOUT":
    return Object.assign({}, state, { isLoggedIn: false });

  case "SETUSERINFO":
    return Object.assign({}, state, { userInfo: action.data });

  case "@@redux/INIT":
    return {};

  default:
    return state;
  }
}

const reduxStore = createStore(
  reducer,
  //window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default reduxStore;
