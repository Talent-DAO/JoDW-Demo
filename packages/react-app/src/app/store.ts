/* eslint-disable no-undef */
import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import loggerMiddleware from "redux-logger";
import publicationReducer from "../features/publication/publicationSlice";
import userReducer from "../features/user/userSlice";
import web3Reducer from "../features/web3/web3Slice";
import transactionReducer from "../features/transactions/transactionSlice";

export const store = configureStore({
  reducer: {
    web3: web3Reducer,
    user: userReducer,
    transactions: transactionReducer,
    publication: publicationReducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(loggerMiddleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
