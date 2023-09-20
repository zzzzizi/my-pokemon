import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type SearchValueState = {
  searchValue: string;
};

const initialState: SearchValueState = {
  searchValue: '',
};

export const searchValueSlice = createSlice({
  name: 'searchValue',
  initialState,
  reducers: {
    changeSearchValue: (
      state: SearchValueState,
      action: PayloadAction<string>
    ) => {
      state.searchValue = action.payload;
    },
    deleteSearchValue: (state: SearchValueState) => {
      return initialState;
    },
  },
});

export const { changeSearchValue, deleteSearchValue } =
  searchValueSlice.actions;

export type ChangeSearchValueAction = ReturnType<typeof changeSearchValue>;
export type DeleteSearchValueAction = ReturnType<typeof deleteSearchValue>;

export default searchValueSlice.reducer;
