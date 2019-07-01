import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunk from "redux-thunk";
import itemsReducer from "../reducers/itemsReducer";
const middleware = [thunk];
const composeEnhancer =
  (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      trace: true,
      traceLimit: 25
    })) ||
  compose;

const rootReducer = combineReducers({
  items: itemsReducer
});

const store = createStore(
  rootReducer,
  composeEnhancer(applyMiddleware(...middleware))
);
export default store;
