import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface TransactionState {
  txnQueue: any[];
}

const initialState: TransactionState = {
  txnQueue: []
};

export const transactionSlice = createSlice({
  name: "transaction",
  initialState,
  reducers: {
    queueTransactions: (state, action: PayloadAction<any[]>) => {
      state.txnQueue = action.payload;
    },
  }
});

const { actions, reducer } = transactionSlice;
export const {
  queueTransactions
} = actions;

export default reducer;