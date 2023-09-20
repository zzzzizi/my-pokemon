import { ShowPokemon } from '../components/showPokemon';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../features/fetchDataSlice';

export const ShowAllPokemon = () => {
  return <ShowPokemon />;
};
