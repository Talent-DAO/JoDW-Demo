import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getLatestArticles } from "../../helpers/articles";
import { LensUser } from "../user/userSlice";

export enum Status {
  Idle = "idle",
  Loading = "loading",
  Success = "success",
  Failed = "failed",
}

export interface Comment {
  pubId: string;
  timestamp: number;
}

export interface Publication {
  id: number;
  pubId: number | undefined;
  author: LensUser | undefined;
  comments: Comment[] | undefined;
  contentUri: string | undefined;
  timestamp: number | undefined;
}

export interface PublicationState {
  publications: Publication[];
  status: Status;
  error: string | undefined;
}

const initialState: PublicationState = {
  publications: [],
  status: Status.Idle,
  error: undefined,
};

const getPublicationsForUser = createAsyncThunk(
  "publication/getPublicationsForUser",
  async (handle: string) => {
    // todo: get publications for user from lens graphql api
  });

const getLatestPublications = createAsyncThunk(
  "publication/getLatestPublications",
  async () => {
    getLatestArticles();
  });

export const publicationSlice = createSlice({
  name: "publication",
  initialState,
  reducers: {
    getPublicationsStart: state => {
      state.status = Status.Loading;
    },
    getPublicationsSuccess: (state: PublicationState, action: PayloadAction<Publication[]>) => {
      state.publications = action.payload;
      state.status = Status.Success;
    },
    getPublicationsFailure: (state, action) => {
      state.status = Status.Failed;
      state.error = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getPublicationsForUser.pending, state => {
        state.status = Status.Loading;
      })
      .addCase(getPublicationsForUser.fulfilled, (state, action: PayloadAction<PublicationState | any>) => {
        state.status = Status.Success;
        state.publications.push(action.payload);
      })
      .addCase(getPublicationsForUser.rejected, (state, action: PayloadAction<string | any>) => {
        state.status = Status.Failed;
        state.error = action.payload;
      })
      .addCase(getLatestPublications.pending, state => {
        state.status = Status.Loading;
      })
      .addCase(getLatestPublications.fulfilled, (state, action: PayloadAction<any>) => {
        state.status = Status.Success;
        state.publications.push(action.payload);
      })
      .addCase(getLatestPublications.rejected, (state, action: PayloadAction<string | any>) => {
        state.status = Status.Failed;
        state.error = action.payload;
      });
  },
});

const { actions, reducer } = publicationSlice;
export const {
  getPublicationsStart,
  getPublicationsSuccess,
  getPublicationsFailure,
} = actions;
export default reducer;
