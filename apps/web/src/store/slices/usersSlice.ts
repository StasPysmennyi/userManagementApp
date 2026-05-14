import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

type UsersState = {
  searchQuery: string;
};

const initialState: UsersState = {
  searchQuery: '',
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
  },
});

export const { setSearchQuery } = usersSlice.actions;
export default usersSlice.reducer;
