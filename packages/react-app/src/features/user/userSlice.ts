import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export enum Status {
  Idle = "idle",
  Loading = "loading",
  Success = "success",
  Failed = "failed",
}

export type LensAuth = {
  accessToken: string | undefined;
  refreshToken: string | undefined;
  status: Status;
}

export type LensUser = {
  id: number;
  handle: string | undefined;
  image: string | undefined;
  walletId: string | undefined;
  status: Status;
}

export type User = {
  walletId: string;
  lensProfile: LensUser;
  status: Status;
}

export interface UserRootState {
  user: User;
  status: Status;
  error: string;
  lensAuth: LensAuth;
}

const initialState: UserRootState = {
  user: {
    walletId: "",
    lensProfile: {
      id: 0,
      handle: "",
      image: "",
      walletId: "",
      status: Status.Idle,
    },
    status: Status.Idle,
  },
  lensAuth: {
    accessToken: "",
    refreshToken: "",
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
    // Grab lens auth token
    fetchLensAuthTokenStart: (state: UserRootState) => {
      state.lensAuth.status = Status.Loading;
    },
    fetchLensAuthTokenSuccess: (state: UserRootState, action: PayloadAction<LensAuth>) => {
      state.lensAuth.status = Status.Success;
      state.lensAuth.accessToken = action.payload.accessToken;
      state.lensAuth.refreshToken = action.payload.refreshToken;
    },
    fetchLensAuthTokenFailure: (state: UserRootState) => {
      state.lensAuth.status = Status.Failed;
    },
    // Update user profile reducers
    userWalletUpdated: (state: UserRootState, action: PayloadAction<string>) => {
      // this is only updating the user wallet id, not the lens profile which is fetched separately
      state.user.walletId = action.payload;
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
  fetchLensAuthTokenStart,
  fetchLensAuthTokenSuccess,
  fetchLensAuthTokenFailure,
  userWalletUpdated,
} = actions;
export default reducer;
