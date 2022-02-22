import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { alertsReducer } from "./reducers/alertsReducer";
import { bookingsReducer } from "./reducers/bookingsReducer";
import { carsReducer } from "./reducers/carsReducer";

const composeEnhancers = composeWithDevTools({});

const rootReducer = combineReducers({
  carsReducer,
  alertsReducer,
  bookingsReducer,
});

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

export default store;
