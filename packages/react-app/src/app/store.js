import { configureStore } from "@reduxjs/toolkit";
import loggerMiddleware from "redux-logger";
import web3Reducer from "../features/web3/web3Slice";
import publicationReducer from "../features/publication/publicationSlice";

const store = configureStore({
  reducer: {
    web3: web3Reducer,
    publication: publicationReducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(loggerMiddleware),
});

export default store;
