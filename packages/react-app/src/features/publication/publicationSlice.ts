import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserRootState } from "../user/userSlice";

export interface Publication {
  id: number;
  author: typeof UserRootState;
  timestamp: number;
}

export interface PublicationState {
  publications: Publication[] | undefined | [];
  status: "idle" | "loading" | "success" | "failed";
  error: string | undefined;
}

const initialState: PublicationState = {
  publications: [],
  status: "idle",
  error: undefined,
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
      state.status = "success";
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
      .addCase(getPublicationsForUser.fulfilled, (state, action: PayloadAction<any>) => {
        state.status = "success";
        state.publications.push(action.payload);
      })
      .addCase(getPublicationsForUser.rejected, (state, action: PayloadAction<any>) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

const { actions, reducer } = publicationSlice;
export const { getPublicationsStart, getPublicationsSuccess, getPublicationsFailure } = actions;
export default reducer;
