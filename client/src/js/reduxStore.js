const { createStore } = require("redux");


function reducer(state, action) {
  switch (action.type) {
  case "LOGIN":
    return Object.assign({}, state, { isLoggedIn: true });
  case "LOGOUT":
    return Object.assign({}, state, { isLoggedIn: false });
  case "@@redux/INIT":
    return {};
  default:
    return state;
  }
}

const reduxStore = createStore(reducer);

module.exports = {
  reduxStore,
};
