import './bar.css';
import searchIcon from '../assets/768px-Search_Icon.png';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState, fetchPokemonData } from '../features/fetchDataSlice';
import { changeSearchValue } from '../features/searchValueSlice';

export const Bar = () => {
  const pokemonName = useSelector(
    (state: RootState) => state.searchValue.searchValue
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <div className="bar">
      <div className="bar__input__container">
        <input
          type="text"
          className="bar__input"
          onChange={(e) => {
            dispatch(changeSearchValue(e.target.value));
          }}
          onKeyDown={(e) => {
            if (e.keyCode === 13) {
              dispatch(fetchPokemonData(pokemonName));

              navigate('/searchResult');
            }
          }}
          value={pokemonName}
        />
        <div
          className="bar__input__right"
          onClick={() => {
            dispatch(fetchPokemonData(pokemonName));
            navigate('/searchResult');
          }}
        >
          <img src={searchIcon} alt="searchIcon" className="bar__searchImg" />
        </div>
      </div>
    </div>
  );
};
