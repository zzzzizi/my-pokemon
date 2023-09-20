import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AjaxError, ajax } from 'rxjs/ajax';
import { Pokemon } from './fetchDataSlice';
import { CardNumber } from './computerSlice';

export type PlayerState = {
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
const initialState: PlayerState = {
  cardOne: { pokemon: {}, HP: 0, isGetting: false },
  cardTwo: { pokemon: {}, HP: 0, isGetting: false },
  cardThree: { pokemon: {}, HP: 0, isGetting: false },
  orders: [],
};

export const playerOneSlice = createSlice({
  name: 'playerOneSlice',
  initialState,

  reducers: {
    getCards: (state: PlayerState, action: PayloadAction<CardNumber>) => {
      state[action.payload].isGetting = true;
    },
    pushCard: (
      state: PlayerState,
      action: PayloadAction<{ pokemon: Pokemon; card: CardNumber }>
    ) => {
      state[action.payload.card].pokemon = action.payload.pokemon;
      if (action.payload.pokemon.stats) {
        state[action.payload.card].HP =
          action.payload.pokemon.stats[0].base_stat;
      }
    },

    getCardsFinished: (
      state: PlayerState,
      action: PayloadAction<CardNumber>
    ) => {
      state[action.payload].isGetting = false;
    },
    getCardsErr: (
      state: PlayerState,
      action: PayloadAction<{ err: AjaxError; card: CardNumber }>
    ) => {
      state[action.payload.card].isGetting = true;
    },
  },
});

export const { getCards, pushCard, getCardsFinished, getCardsErr } =
  playerOneSlice.actions;

export type GetCardsAction = ReturnType<typeof getCards>;
export type PushCardAction = ReturnType<typeof pushCard>;

export type GetCardsFinishedAction = ReturnType<typeof getCardsFinished>;
export type GetCardsErrdAction = ReturnType<typeof getCardsErr>;

export default playerOneSlice.reducer;
