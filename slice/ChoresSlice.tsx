import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Chore } from '../types/backend';

interface ChoreState {
  chores: Chore[];
}

// Initial state
const initialState: ChoreState = {
  chores: [],
};

// Create a Redux slice
const ChoreSlice = createSlice({
  name: 'chores',
  initialState,
  reducers: {
    addChore: (state, action: PayloadAction<Chore>) => {
      state.chores.push(action.payload);
    },
    // toggleTodo: (state, action: PayloadAction<number>) => {
    //   const todo = state.todos.find((t) => t.id === action.payload);
    //   if (todo) {
    //     todo.completed = !todo.completed;
    //   }
    // },
  },
});

// Export the actions and reducer
export const { addChore } = ChoreSlice.actions;
export default ChoreSlice.reducer;
