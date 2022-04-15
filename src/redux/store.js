import { createStore, applyMiddleware, compose } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import AsyncStorage from "@react-native-community/async-storage";

import { createLogger } from 'redux-logger';


const isDebuggingInChrome = __DEV__ && !!window.navigator.userAgent;

const logger = createLogger({
  predicate: () => isDebuggingInChrome,
  collapsed: true,
  duration: true,
  diff: true,
});

import thunk from "redux-thunk";
import rootReducer from "./reducers";

const persistedConfig = {
  key: "root",
  storage: AsyncStorage,
  timeout: 0,
};

const persistedReducer = persistReducer(persistedConfig, rootReducer);

const initialState = {};
const middleware = [thunk, logger];
const store = createStore(
  persistedReducer,
  initialState,
  compose(applyMiddleware(...middleware))
);

const persistor = persistStore(store);

export { persistor, store };
