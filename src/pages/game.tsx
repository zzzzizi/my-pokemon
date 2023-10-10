import { useNavigate } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import { getCards } from '../features/playerOneSlice';

import { getComputerCards } from '../features/computerSlice';
import './game.css';

import { isSinglePlayer } from '../features/gameSlice';
export const SingleGame = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <div className="singleGame">
      <div className="singleGame__top">
        <div className="play__title">
          <p>Choose Your Game Mode</p>
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
