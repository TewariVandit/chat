import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice.js";
import messageReducer from "./messageSlice.js";
import socketReducer from "./socketSlice.js";
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

// Exclude the socket state from being persisted
const persistConfig = {
  key: "root",
  version: 1,
  storage,
  blacklist: ["socket"], // or use 'whitelist' to specify only what you want to persist
};

const rootReducer = combineReducers({
  user: userReducer,
  message: messageReducer,
  socket: socketReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export default store;
