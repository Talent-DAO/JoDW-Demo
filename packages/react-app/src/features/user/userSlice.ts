import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export enum Status {
  Idle = "idle",
  Loading = "loading",
  Success = "success",
  Failed = "failed",
}

export type LensUser = {
  id: number;
  handle: string | undefined;
  name: string | undefined;
  image: string | undefined;
  walletId: string | undefined;
  coverImage: string | undefined;
  bio: string | undefined;
  aboutMe: string | undefined;
  twitter: string | undefined;
  linkedin: string | undefined;
  tipAddress: string | undefined;
  categories: string[] | undefined;
  status: Status;
}

export type User = {
  walletId: string;
  lensProfile: LensUser;
  sigNonce: number,
  status: Status;
}

export interface UserRootState {
  user: User;
  status: Status;
  error: string;
}

const initialState: UserRootState = {
  user: {
    walletId: "",
    lensProfile: {
      id: 0,
      handle: "",
      image: "",
      walletId: "",
      name: "",
      categories: undefined,
      coverImage: undefined,
      bio: undefined,
      aboutMe: undefined,
      twitter: undefined,
      linkedin: undefined,
      tipAddress: undefined,
      status: Status.Idle,
    },
    sigNonce: 0,
    status: Status.Idle,
  },
  status: Status.Idle,
  error: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // Fetch user profile reducers
    fetchUserStart: state => {
      state.status = Status.Loading;
    },
    fetchUserSuccess: (state: UserRootState, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.status = Status.Success;
    },
    fetchUserFailure: (state: UserRootState, action: PayloadAction<string>) => {
      state.status = Status.Failed;
      state.error = action.payload;
    },
    // Fetch lens user profile reducers
    fetchLensUserStart: (state: UserRootState) => {
      state.user.lensProfile.status = Status.Loading;
    },
    fetchLensUserSuccess: (state: UserRootState, action: PayloadAction<LensUser>) => {
      state.user.lensProfile = action.payload;
      state.status = Status.Success;
    },
    fetchLensUserFailure: (state: UserRootState, action: PayloadAction<string>) => {
      state.status = Status.Failed;
      state.error = action.payload;
    },
    // Update user profile reducers
    userWalletUpdated: (state: UserRootState, action: PayloadAction<string>) => {
      // this is only updating the user wallet id, not the lens profile which is fetched separately
      state.user.walletId = action.payload;
      state.status = Status.Success;
    },
    incrementNonce: (state: UserRootState, action: PayloadAction<void>) => {
      state.user.sigNonce = state.user.sigNonce + 1;
    }
  },
});

const { actions, reducer } = userSlice;
export const {
  fetchUserStart,
  fetchUserSuccess,
  fetchUserFailure,
  fetchLensUserStart,
  fetchLensUserSuccess,
  fetchLensUserFailure,
  userWalletUpdated,
  incrementNonce,
} = actions;
export default reducer;
