import { Epic } from 'redux-observable';
import { RootAction } from '../store';
import { Pokemon, RootState } from '../../features/fetchDataSlice';
import {
  filter,
  mergeMap,
  map,
  catchError,
  of,
  concat,
  EMPTY,
  ignoreElements,
} from 'rxjs';
import { AjaxError, ajax } from 'rxjs/ajax';
import {
  getComputerCards,
  pushComputerCard,
  getComputerCardsFinished,
  getComputerCardsErr,
} from '../../features/computerSlice';
import { pushHp } from '../../features/gameSlice';

const getRandomInt = (max: number) => {
  return Math.floor(Math.random() * max);
};

export const getComputerCardOneEpic: Epic<RootAction, RootAction, RootState> = (
  action$,
  state$
) =>
  action$.pipe(
    filter(getComputerCards.match),
    mergeMap((action) => {
      const one = getRandomInt(1000) + 1;
      return ajax
        .getJSON<Pokemon>(`https://pokeapi.co/api/v2/pokemon/${one}`)
        .pipe(
          mergeMap((res) =>
            of(
              pushComputerCard({ pokemon: res, card: action.payload }),
              pushHp({
                side: 'right',
                card: action.payload,
                pokemon: res,
              })
            )
          ),
          catchError((err: AjaxError) =>
            of(getComputerCardsErr({ err: err, card: action.payload }))
          )
        );
    })
  );
