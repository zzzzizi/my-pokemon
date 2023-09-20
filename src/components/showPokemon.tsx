import { useRef, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, fetchPokemonData } from '../features/fetchDataSlice';
import './showPokemon.css';
import { fetchAllPokemonData } from '../features/fetchAllSlice';
import { useNavigate } from 'react-router-dom';

export const ShowPokemon = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const showPokemonRef = useRef<HTMLDivElement>(null);
  const pokemonContainerRef = useRef<HTMLDivElement>(null);
  const pokemon = useSelector(
    (state: RootState) => state.fetchAll.all?.results
  );
  const nextURL = useSelector((state: RootState) => state.fetchAll.all?.next);
  const isLoading = useSelector((state: RootState) => state.fetchAll.isLoading);
  const [isClickButton, setIsClickButton] = useState(false);

  const isBottom = () => {
    if (!showPokemonRef.current || !pokemonContainerRef.current) {
      return false;
    }
    return (
      showPokemonRef.current.getBoundingClientRect().bottom <=
      pokemonContainerRef.current?.clientHeight - 75
    );
  };

  const clickfn = () => {
    if (isBottom() && !isLoading && isClickButton) {
      dispatch(fetchAllPokemonData(`${nextURL}`));
    }
  };

  useEffect(() => {
    document.addEventListener('scroll', clickfn, true);
    return () => document.removeEventListener('scroll', clickfn, true);
  }, [nextURL, isLoading, isClickButton]);

  return (
    <div className="showAllpokemon" ref={pokemonContainerRef}>
      <div className="showPokemon__container" ref={showPokemonRef}>
        {pokemon?.map((one, index) => {
          const idNumber = one.url.match(/\d+/g);
          const fetchData = () => {
            idNumber !== null && dispatch(fetchPokemonData(idNumber[1]));
          };
          return (
            <div
              key={index}
              className="showPokemon__single"
              onClick={() => {
                fetchData();
                navigate('/searchResult');
              }}
            >
              {idNumber !== null && (
                <img
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${idNumber[1]}.png`}
                  alt="showpokemon"
                  className="showPokemon__img"
                />
              )}

              <div>{one.name}</div>
            </div>
          );
        })}
      </div>
      <div className="showPokemon__bottom">
        {!isClickButton && (
          <button
            onClick={(e) => {
              dispatch(fetchAllPokemonData(`${nextURL}`));
              setIsClickButton(true);
            }}
            className="showPokemon__bottom__btn"
          >
            Load more Pokemon
          </button>
        )}
      </div>
    </div>
  );
};
