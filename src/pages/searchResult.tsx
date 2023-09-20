import { ShowCard } from '../components/showCard';
import { RootState } from '../features/fetchDataSlice';
import { useSelector } from 'react-redux';

export const SearchResult = () => {
  const pokemonData = useSelector(
    (state: RootState) => state.fetchData.pokemon
  );
  return <ShowCard pokemonData={pokemonData} showCardStyle="" />;
};
