import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AjaxError } from 'rxjs/ajax';
import { Pokemon } from './fetchDataSlice';

export type CardNumber = 'cardOne' | 'cardTwo' | 'cardThree';

export type ComputerState = {
  cardOne: {
    pokemon: Pokemon;
    HP: number;
    isGetting?: boolean;
  };
  cardTwo: {
    pokemon: Pokemon;
    HP: number;
    isGetting?: boolean;
  };
  cardThree: {
    pokemon: Pokemon;
    HP: number;
    isGetting?: boolean;
  };
  orders?: Array<string>;
};

const initialState: ComputerState = {
  cardOne: { pokemon: {}, HP: 0, isGetting: false },
  cardTwo: { pokemon: {}, HP: 0, isGetting: false },
  cardThree: { pokemon: {}, HP: 0, isGetting: false },
  orders: [],
};

export const computerSlice = createSlice({
  name: 'computer',
  initialState,

  reducers: {
    getComputerCards: (
      state: ComputerState,
      action: PayloadAction<CardNumber>
    ) => {
      state[action.payload].isGetting = true;
    },
    pushComputerCard: (
      state: ComputerState,
      action: PayloadAction<{ pokemon: Pokemon; card: CardNumber }>
    ) => {
      state[action.payload.card].pokemon = action.payload.pokemon;
      if (action.payload.pokemon.stats) {
        state[action.payload.card].HP =
          action.payload.pokemon.stats[0].base_stat;
      }
    },

    getComputerCardsFinished: (
      state: ComputerState,
      action: PayloadAction<CardNumber>
    ) => {
      state[action.payload].isGetting = false;
    },
    getComputerCardsErr: (
      state: ComputerState,
      action: PayloadAction<{ err: AjaxError; card: CardNumber }>
    ) => {
      state[action.payload.card].isGetting = true;
    },
  },
});

export const {
  getComputerCards,
  pushComputerCard,

  getComputerCardsFinished,
  getComputerCardsErr,
} = computerSlice.actions;

export type GetComputerCardsAction = ReturnType<typeof getComputerCards>;
export type PushComputerCardAction = ReturnType<typeof pushComputerCard>;

export type GetComputerCardsFinishedAction = ReturnType<
  typeof getComputerCardsFinished
>;
export type GetComputerCardsErrdAction = ReturnType<typeof getComputerCardsErr>;

export default computerSlice.reducer;
