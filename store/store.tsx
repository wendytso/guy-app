// store.ts

import { configureStore } from '@reduxjs/toolkit';
import choreReducer from '../slice/ChoresSlice'; // Import your slice(s)
import TransactionReducer from '../slice/TransactionsSlice';

const store = configureStore({
  reducer: {
    chores: choreReducer, // Add more slices if necessary
    transactions: TransactionReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
