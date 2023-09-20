import { combineEpics } from 'redux-observable';
import { dataFetchEpic, allDataFetchEpicEpic } from './epics/dataFetchEpic';
import { locationChangeEpic } from './epics/locationChangeEpic';
import { getCardOneEpic } from './epics/getCardsEpic';
import { getComputerCardOneEpic } from './epics/getComputercardsEpic';

export const rootEpic = combineEpics(
  dataFetchEpic,
  allDataFetchEpicEpic,
  locationChangeEpic,
  getCardOneEpic,

  getComputerCardOneEpic
);
