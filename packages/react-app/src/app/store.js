import { configureStore } from "@reduxjs/toolkit";
import loggerMiddleware from "redux-logger";
import publicationReducer from "../features/publication/publicationSlice";

const store = configureStore({
  reducer: {
    publication: publicationReducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(loggerMiddleware),
});

export default store;
