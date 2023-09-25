import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../features/fetchDataSlice';
import { useDispatch, useSelector } from 'react-redux';
import { getCards } from '../features/playerOneSlice';
import { nextRound } from '../features/gameSlice';
import { getComputerCards } from '../features/computerSlice';
import './singleGame.css';

import { isSinglePlayer } from '../features/gameSlice';
export const SingleGame = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <div className="singleGame">
      <div className="singleGame__top">
        <div>Game</div>
        <div>
          <button
            className="singleGame__top__btn"
            onClick={() => {
              dispatch(getCards('cardOne'));
              dispatch(getCards('cardTwo'));
              dispatch(getCards('cardThree'));
              dispatch(getComputerCards('cardOne'));
              dispatch(getComputerCards('cardTwo'));
              dispatch(getComputerCards('cardThree'));
              dispatch(isSinglePlayer(true));

              navigate('/singleGame/pokemonGame');
            }}
          >
            Single Player
          </button>
        </div>
        <div>
          <button
            className="singleGame__top__btn"
            onClick={() => {
              dispatch(getCards('cardOne'));
              dispatch(getCards('cardTwo'));
              dispatch(getCards('cardThree'));
              dispatch(getComputerCards('cardOne'));
              dispatch(getComputerCards('cardTwo'));
              dispatch(getComputerCards('cardThree'));
              dispatch(isSinglePlayer(false));

              navigate('/singleGame/pokemonGame');
            }}
          >
            Double Players
          </button>
        </div>
      </div>
    </div>
  );
};
