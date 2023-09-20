import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Location } from 'react-router-dom';

const initialState: Location = {
  pathname: '',
  search: '',
  hash: '',
  state: {},
  key: '',
};
export const routerLocationSlice = createSlice({
  name: 'routerLocation',
  initialState,
  reducers: {
    changeLocation: (state: Location, action: PayloadAction<Location>) => {
      return (state = action.payload);
    },
  },
});
export const { changeLocation } = routerLocationSlice.actions;
export type ChangeLocationAction = ReturnType<typeof changeLocation>;

export default routerLocationSlice.reducer;
