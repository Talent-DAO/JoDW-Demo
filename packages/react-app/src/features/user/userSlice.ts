import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export enum Status {
  Idle = "idle",
  Loading = "loading",
  Success = "success",
  Failed = "failed",
}

export interface LensUser {
  id: number;
  handle: string | undefined;
  image: string | undefined;
  walletId: string | undefined;
  status: Status;
}

export interface User {
  walletId: string | undefined;
  lensProfile: LensUser | undefined;
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
    lensProfile: undefined,
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
    fetchUserSuccess: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.status = Status.Success;
    },
    fetchUserFailure: (state, action: PayloadAction<string>) => {
      state.status = Status.Failed;
      state.error = action.payload;
    },
    // Fetch user profile reducers
    fetchLensUserStart: state => {
      state.status = Status.Loading;
    },
    fetchLensUserSuccess: (state, action: PayloadAction<LensUser>) => {
      state.user.lensProfile = action.payload;
      state.status = Status.Success;
    },
    fetchLensUserFailure: (state, action: PayloadAction<string>) => {
      state.status = Status.Failed;
      state.error = action.payload;
    },
    // Update user profile reducers
    userWalletUpdated: (state, action: PayloadAction<User>) => {
      // this is only updating the user wallet id, not the lens profile which is fetched separately
      state.user.walletId = action.payload.walletId;
      state.status = Status.Success;
    },
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
  userWalletUpdated
} = actions;
export default reducer;
