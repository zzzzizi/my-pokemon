import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AjaxError } from 'rxjs/ajax';
import { AllPokemonState } from './fetchAllSlice';
import { Location } from 'react-router-dom';
import { SearchValueState } from './searchValueSlice';
import { PlayerState } from './playerOneSlice';
import { ComputerState } from './computerSlice';
import { GameState } from './gameSlice';

type Abilities = Array<Ability>;
type Ability = {
  ability: { name: string; url: string };
  is_hidden: boolean;
  slot: number;
};
type Species = {
  name: string;
  url: string;
};
type Sprites = {
  back_default: string;
  front_default: string;
};
type Stats = Array<Stat>;
type Stat = {
  base_stat: number;
  effort: number;
  stat: {
    name: string;
    url: string;
  };
};
type Types = Array<Type>;
type Type = {
  slot: number;
  type: {
    name: string;
    url: string;
  };
};

export type Pokemon = {
  abilities?: Abilities;
  base_experience?: number;
  height?: number;
  id?: number;
  name?: string;
  order?: number;
  species?: Species;
  sprites?: Sprites;
  stats?: Stats;
  types?: Types;
  weight?: number;
};

export type PokemonState = { pokemon: Pokemon; isLoading: boolean };
const initialState: PokemonState = { pokemon: {}, isLoading: false };

export const fetchDataSlice = createSlice({
  name: 'fetchData',
  initialState,

  reducers: {
    fetchSuccess: (state: PokemonState, action: PayloadAction<Pokemon>) => {
      state.pokemon = action.payload;
      console.log(action.payload);
    },
    fetchPokemonData: (state: PokemonState, action: PayloadAction<string>) => {
      state.isLoading = false;
    },
    fetchErr: (state: PokemonState, action: PayloadAction<AjaxError>) => {
      state.isLoading = true;
    },
  },
});

export const { fetchSuccess, fetchPokemonData, fetchErr } =
  fetchDataSlice.actions;

export type RootState = {
  fetchData: PokemonState;
  fetchAll: AllPokemonState;
  routerLocation: Location;
  searchValue: SearchValueState;
  playerOne: PlayerState;
  computer: ComputerState;
  game: GameState;
};

export type FetchSuccessAction = ReturnType<typeof fetchSuccess>;
export type FetchPokemonDataAction = ReturnType<typeof fetchPokemonData>;
export type FetchErrsAction = ReturnType<typeof fetchErr>;

export default fetchDataSlice.reducer;
