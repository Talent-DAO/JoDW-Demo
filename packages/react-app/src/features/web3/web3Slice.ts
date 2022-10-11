import { createSlice } from "@reduxjs/toolkit";

export const web3State = {
  chain: {},
  account: null,
};

const initialState = web3State;

export const web3Slice = createSlice({
  name: "web3",
  initialState,
  reducers: {
    chainIdUpdated: (state, action) => {
      state.chain = action.payload;
    },
    accountUpdated: (state, action) => {
      state.account = action.payload;
    },
  },
});

export const { accountUpdated, chainIdUpdated } = web3Slice.actions;
export default web3Slice.reducer;
