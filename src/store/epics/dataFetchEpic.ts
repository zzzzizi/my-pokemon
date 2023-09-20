import { Pokemon, RootState } from '../../features/fetchDataSlice';
import { Epic } from 'redux-observable';
import { RootAction } from '../store';
import { filter, mergeMap, map, catchError, of } from 'rxjs';
import { AjaxError, ajax } from 'rxjs/ajax';
import {
  fetchPokemonData,
  fetchSuccess,
  fetchErr,
} from '../../features/fetchDataSlice';
import {
  fetchAllPokemonData,
  fetchAllErr,
  fetchAllSuccess,
  All,
} from '../../features/fetchAllSlice';

export const dataFetchEpic: Epic<RootAction, RootAction, RootState> = (
  action$,
  state$
) =>
  action$.pipe(
    filter(fetchPokemonData.match),
    mergeMap((action) =>
      ajax
        .getJSON<Pokemon>(`https://pokeapi.co/api/v2/pokemon/${action.payload}`)
        .pipe(
          map((res) => fetchSuccess(res)),
          catchError((err: AjaxError) => of(fetchErr(err)))
        )
    )
  );

export const allDataFetchEpicEpic: Epic<RootAction, RootAction, RootState> = (
  action$,
  state$
) =>
  action$.pipe(
    filter(fetchAllPokemonData.match),
    mergeMap((action) =>
      ajax.getJSON<All>(action.payload).pipe(
        map((res) => fetchAllSuccess(res)),
        catchError((err: AjaxError) => of(fetchAllErr(err)))
      )
    )
  );
