import { configureStore } from '@reduxjs/toolkit';
import fetchDataSlice, { RootState } from '../features/fetchDataSlice';
import { createEpicMiddleware } from 'redux-observable';
import {
  FetchPokemonDataAction,
  FetchSuccessAction,
  FetchErrsAction,
} from '../features/fetchDataSlice';
import {
  FetchAllErrsAction,
  FetchAllSuccessAction,
  FetchAllPokemonDataAction,
  DeleteAllDataAction,
} from '../features/fetchAllSlice';
import { rootEpic } from './rootEpics';
import fetchAllSlice from '../features/fetchAllSlice';
import routerLocationSlice, {
  ChangeLocationAction,
} from '../features/routerLocationSlice';
import searchValueSlice, {
  ChangeSearchValueAction,
  DeleteSearchValueAction,
} from '../features/searchValueSlice';
import playerOneSlice, {
  GetCardsAction,
  PushCardAction,
  GetCardsFinishedAction,
  GetCardsErrdAction,
} from '../features/playerOneSlice';

import computerSlice, {
  GetComputerCardsAction,
  PushComputerCardAction,
  GetComputerCardsFinishedAction,
  GetComputerCardsErrdAction,
} from '../features/computerSlice';

import gameSlice, {
  PushHpAction,
  DeleteGameAction,
} from '../features/gameSlice';

export type RootAction =
  | FetchSuccessAction
  | FetchPokemonDataAction
  | FetchErrsAction
  | FetchAllSuccessAction
  | FetchAllPokemonDataAction
  | FetchAllErrsAction
  | DeleteAllDataAction
  | ChangeLocationAction
  | ChangeSearchValueAction
  | DeleteSearchValueAction
  | GetCardsAction
  | PushCardAction
  | GetCardsFinishedAction
  | GetCardsErrdAction
  | GetComputerCardsAction
  | PushComputerCardAction
  | GetComputerCardsFinishedAction
  | GetComputerCardsErrdAction
  | PushHpAction
  | DeleteGameAction;

export const epicMiddleware = createEpicMiddleware<
  RootAction,
  RootAction,
  RootState,
  void
>();

export const store = configureStore({
  reducer: {
    fetchData: fetchDataSlice,
    fetchAll: fetchAllSlice,
    routerLocation: routerLocationSlice,
    searchValue: searchValueSlice,
    playerOne: playerOneSlice,
    computer: computerSlice,
    game: gameSlice,
  },
  middleware: [epicMiddleware],
});
epicMiddleware.run(rootEpic);
