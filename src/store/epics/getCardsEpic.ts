import { Epic } from 'redux-observable';
import { RootAction } from '../store';
import { Pokemon, RootState } from '../../features/fetchDataSlice';
import { filter, mergeMap, map, catchError, of } from 'rxjs';
import { AjaxError, ajax } from 'rxjs/ajax';
import {
  getCards,
  pushCard,
  getCardsFinished,
  getCardsErr,
} from '../../features/playerOneSlice';
import { pushHp } from '../../features/gameSlice';

const getRandomInt = (max: number) => {
  return Math.floor(Math.random() * max);
};

export const getCardOneEpic: Epic<RootAction, RootAction, RootState> = (
  action$,
  state$
) =>
  action$.pipe(
    filter(getCards.match),
    mergeMap((action) => {
      const one = getRandomInt(1000) + 1;
      return ajax
        .getJSON<Pokemon>(`https://pokeapi.co/api/v2/pokemon/${one}`)
        .pipe(
          mergeMap((res) =>
            of(
              pushCard({ pokemon: res, card: action.payload }),
              pushHp({
                side: 'left',
                card: action.payload,
                pokemon: res,
              })
            )
          ),
          catchError((err: AjaxError) =>
            of(getCardsErr({ err: err, card: action.payload }))
          )
        );
    })
  );
