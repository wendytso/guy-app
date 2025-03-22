import { createSlice, PayloadAction } from '@reduxjs/toolkit';


interface TransactionState {
    transactions: string[];
}

// Initial state
const initialState: TransactionState = {
  transactions: [],
};

// Create a Redux slice
const TransactionSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {
    addTransaction: (state, action: PayloadAction<string>) => {
      state.transactions.push(action.payload);
    },
  },
});

// Export the actions and reducer
export const { addTransaction } = TransactionSlice.actions;
export default TransactionSlice.reducer;
