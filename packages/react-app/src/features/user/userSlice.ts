import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UserState {
  id: number;
  handle: string | undefined;
  image: string | undefined;
  walletId: string | undefined;
  status: "idle" | "loading" | "success" | "failed";
}

export const UserRootState: UserState = {
  id: 0,
  handle: "",
  image: "",
  walletId: "",
  status: "idle",
};

export const userSlice = createSlice({
  name: "user",
  initialState: UserRootState,
  reducers: {
    fetchUserStart: state => {
      state.status = "loading";
    },
    userWalletUpdated: (state, action: PayloadAction<UserState>) => {
      state.walletId = action.payload.walletId;
      state.status = "success";
    },
  },
});

const { actions, reducer } = userSlice;
export const { fetchUserStart, userWalletUpdated } = actions;
export default reducer;
