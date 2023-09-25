import { Epic } from 'redux-observable';
import { filter, mergeMap, map, of, EMPTY } from 'rxjs';
import { changeLocation } from '../../features/routerLocationSlice';
import {
  deleteAllData,
  fetchAllPokemonData,
} from '../../features/fetchAllSlice';
import { RootAction } from '../store';
import { RootState } from '../../features/fetchDataSlice';
import { deleteSearchValue } from '../../features/searchValueSlice';
import { deleteGame } from '../../features/gameSlice';

export const locationChangeEpic: Epic<RootAction, RootAction, RootState> = (
  action$,
  state$
) =>
  action$.pipe(
    filter(changeLocation.match),
    mergeMap((action) => {
      if (action.payload.pathname === '/showAll') {
        return of(
          deleteAllData(),
          deleteSearchValue(),
          deleteGame(),
          fetchAllPokemonData(
            'https://pokeapi.co/api/v2/pokemon?limit=12&offset=0'
          )
        );
      } else if (action.payload.pathname === '/singleGame/pokemonGame') {
        return of(deleteSearchValue(), deleteAllData());
      } else if (action.payload.pathname !== '/searchResult') {
        return of(deleteSearchValue(), deleteAllData(), deleteGame());
      } else {
        return of(deleteAllData(), deleteGame());
      }
    })
  );
