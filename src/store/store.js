import { createStore, applyMiddleware, combineReducers, compose } from "redux";
import thunk from "redux-thunk";
import { chatReducer } from "./chat/chat.reducer";

import { userReducer } from "./user/user.reducer";

const rootReducer = combineReducers({
  userModule: userReducer,
  chatModule: chatReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);
