import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AjaxError } from 'rxjs/ajax';

export type OnePokemon = {
  name: string;
  url: string;
};
export type All = {
  count?: number;
  next?: string;
  previous?: null;
  results?: Array<OnePokemon>;
};

export type AllPokemonState = {
  all?: All;
  isLoading: boolean;
};
const initialState: AllPokemonState = {
  all: { count: 0, next: '', previous: null, results: [] },
  isLoading: false,
};

export const fetchAllSlice = createSlice({
  name: 'fetchAll',
  initialState,
  reducers: {
    fetchAllSuccess: (state: AllPokemonState, action: PayloadAction<All>) => {
      return {
        ...state,
        isLoading: false,
        all: {
          count: (state.all?.count ?? 0) + 12,
          next: action.payload.next,
          previous: action.payload.previous,
          results: [
            ...(state.all?.results ?? []),
            ...(action.payload.results ?? []),
          ],
        },
      };
    },
    fetchAllPokemonData: (
      state: AllPokemonState,
      action: PayloadAction<string>
    ) => {
      state.isLoading = true;
    },
    fetchAllErr: (state: AllPokemonState, action: PayloadAction<AjaxError>) => {
      state.isLoading = true;
    },
    deleteAllData: (state: AllPokemonState) => {
      return initialState;
    },
  },
});

export const {
  fetchAllSuccess,
  fetchAllPokemonData,
  fetchAllErr,
  deleteAllData,
} = fetchAllSlice.actions;

export type FetchAllSuccessAction = ReturnType<typeof fetchAllSuccess>;
export type FetchAllPokemonDataAction = ReturnType<typeof fetchAllPokemonData>;
export type FetchAllErrsAction = ReturnType<typeof fetchAllErr>;
export type DeleteAllDataAction = ReturnType<typeof deleteAllData>;

export default fetchAllSlice.reducer;
