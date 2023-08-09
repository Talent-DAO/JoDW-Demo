/* eslint-disable no-undef */
import { Action, combineReducers, configureStore, ThunkAction } from "@reduxjs/toolkit";
import loggerMiddleware from "redux-logger";
import publicationReducer from "../features/publication/publicationSlice";
import userReducer from "../features/user/userSlice";
import web3Reducer from "../features/web3/web3Slice";
import transactionReducer from "../features/transactions/transactionSlice";
import {
  persistStore,
  persistReducer,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";
import { Reducer } from "react";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
  stateReconciler: autoMergeLevel2,
};

const reducer: Reducer<any, Action> = combineReducers({
  web3: web3Reducer,
  user: userReducer,
  transactions: transactionReducer,
  publication: publicationReducer,
});

const persistedReducer = persistReducer(persistConfig, reducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(loggerMiddleware),
});

const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
