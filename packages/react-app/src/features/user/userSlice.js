import { createSlice } from "@reduxjs/toolkit";

export const UserRootState = {
  id: null,
  handle: "",
  image: null,
  walletId: "",
  status: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState: UserRootState,
  reducers: {
    fetchUserStart: state => {
      state.status = "loading";
    },
    userWalletUpdated: (state, action) => {
      state.walletId = action.payload.walletId;
      state.status = "success";
    },
  },
});

const { actions, reducer } = userSlice;
export const { fetchUserStart, userWalletUpdated } = actions;
export default reducer;
