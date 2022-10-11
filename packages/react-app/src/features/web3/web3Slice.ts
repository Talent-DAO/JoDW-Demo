import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Chain } from "wagmi";

export interface Web3State {
  chain: Chain | undefined;
  account: string | undefined;
}

export const initialState: Web3State = {
  chain: undefined,
  account: undefined,
};

export const web3Slice = createSlice({
  name: "web3",
  initialState,
  reducers: {
    chainIdUpdated: (state, action: PayloadAction<Chain>) => {
      state.chain = action.payload;
    },
    accountUpdated: (state, action: PayloadAction<string>) => {
      state.account = action.payload;
    },
  },
});

export const { accountUpdated, chainIdUpdated } = web3Slice.actions;
export default web3Slice.reducer;
