import { Post } from "@jodw/lens";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getLatestArticles } from "../../helpers/graphql/articles";

export enum Status {
  Idle = "idle",
  Loading = "loading",
  Success = "success",
  Failed = "failed",
}

export interface IPublicationState {
  publications: Post[];
  status: Status;
  error: string | undefined;
}

const initialState: IPublicationState = {
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

const postPublication = createAsyncThunk(
  "publication/postPublication",
  async (publication: Post) => {
    // todo:
  });


export const publicationSlice = createSlice({
  name: "publication",
  initialState,
  reducers: {
    getPublicationsStart: state => {
      state.status = Status.Loading;
    },
    getPublicationsSuccess: (state: IPublicationState, action: PayloadAction<Post[]>) => {
      state.publications = action.payload;
      state.status = Status.Success;
    },
    getPublicationsFailure: (state, action) => {
      state.status = Status.Failed;
      state.error = action.payload;
    },
    getPublicationDetailsStart: (state: IPublicationState) => {
      state.status = Status.Loading;
    },
    getPublicationDetailsSuccess: (state: IPublicationState, action: PayloadAction<Post>) => {
      console.log("getPublicationDetailsSuccess", action.payload);
      state.publications[0] = action.payload;
      state.status = Status.Success;
    },
    getPublicationDetailsFailure: (state, action) => {
      state.status = Status.Failed;
      state.error = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getPublicationsForUser.pending, state => {
        state.status = Status.Loading;
      })
      .addCase(getPublicationsForUser.fulfilled, (state, action: PayloadAction<IPublicationState | any>) => {
        state.status = Status.Success;
        state.publications?.push(action.payload);
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
        state.publications?.push(action.payload);
      })
      .addCase(getLatestPublications.rejected, (state, action: PayloadAction<string | any>) => {
        state.status = Status.Failed;
        state.error = action.payload;
      })
      .addCase(postPublication.pending, state => {
        state.status = Status.Loading;
      })
      .addCase(postPublication.fulfilled, (state) => {
        state.status = Status.Success;
        state.error = undefined;
      })
      .addCase(postPublication.rejected, (state, action: PayloadAction<string | any>) => {
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
  getPublicationDetailsStart,
  getPublicationDetailsSuccess,
  getPublicationDetailsFailure,
} = actions;
export default reducer;
