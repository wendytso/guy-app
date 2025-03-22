// reducer.js

import { ADD_CHORE, ADD_TRANSACTION } from '../actions/actions';

const initialState = {
  chores: [],
  transactions: []
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_CHORE:
      return {
        ...state,
        chores: [...state.chores, action.payload],
      };
    case ADD_TRANSACTION:
      return {
        ...state,
        transactions: [...state.transactions, action.payload],
      };
    default:
      return state;
  }
};

export default rootReducer;
