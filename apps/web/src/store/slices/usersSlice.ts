import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { type User } from '@uma/shared';

type UsersState = {
  selectedUserId: string | null;
  searchQuery: string;
};

const initialState: UsersState = {
  selectedUserId: null,
  searchQuery: '',
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setSelectedUserId: (state, action: PayloadAction<string | null>) => {
      state.selectedUserId = action.payload;
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
  },
});

export const { setSelectedUserId, setSearchQuery } = usersSlice.actions;
export default usersSlice.reducer;

export type { User };
