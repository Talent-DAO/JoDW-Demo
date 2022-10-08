import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const publicationState = {
  id: undefined,
  author: {
    handle: undefined,
    image: undefined,
    walletId: undefined,
  },
  timestamp: undefined,
};

const initialState = {
  handle: "",
  publications: [publicationState],
  status: "idle",
  error: null,
};

const getPublicationsForUser = createAsyncThunk("publication/getPublicationsForUser", async handle => {
  // todo: get publications for user from lens graphql api
  // todo: https://redux-toolkit.js.org/rtk-query/usage/examples#react-with-graphql
});

export const publicationSlice = createSlice({
  name: "publication",
  initialState,
  reducers: {
    getPublicationsStart: state => {
      state.status = "loading";
    },
    getPublicationsSuccess: (state, action) => {
      state.publications = action.payload;
      state.status = "succeeded";
    },
    getPublicationsFailure: (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getPublicationsForUser.pending, state => {
        state.status = "loading";
      })
      .addCase(getPublicationsForUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.publications.push(action.payload);
      })
      .addCase(getPublicationsForUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

const { actions, reducer } = publicationSlice;
export const { getPublicationsStart, getPublicationsSuccess, getPublicationsFailure } = actions;
export default reducer;
