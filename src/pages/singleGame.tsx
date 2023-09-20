import { useState } from 'react';
import { RootState } from '../features/fetchDataSlice';
import { useDispatch, useSelector } from 'react-redux';
import { getCards } from '../features/playerOneSlice';
import { PlayerOneCards } from '../components/playerCards';
import { getComputerCards } from '../features/computerSlice';
import './singleGame.css';
import { pk } from '../features/gameSlice';

export const SingleGame = () => {
  const dispatch = useDispatch();
  const palyerOne = useSelector((state: RootState) => state.playerOne);
  const computer = useSelector((state: RootState) => state.computer);
  const playerOneHp = useSelector((state: RootState) => state.game.left);
  const computerHp = useSelector((state: RootState) => state.game.right);
  const [isGetCard, setIsGetCard] = useState(false);
  const leftChooseCard = useSelector(
    (state: RootState) => state.game.left.chosenId
  );
  const rightChooseCard = useSelector(
    (state: RootState) => state.game.right.chosenId
  );
  const leftImg = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${leftChooseCard}.png`;
  const rightImg = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${rightChooseCard}.png`;

  return (
    <div className="singleGame">
      {!isGetCard && (
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
                setIsGetCard(true);
              }}
            >
              Get your cards
            </button>
          </div>
        </div>
      )}

      {isGetCard && (
        <div className="singleGame__middle">
          <div>
            <PlayerOneCards cards={palyerOne} hp={playerOneHp} side={'left'} />
          </div>
          <div className="singleGame__middle__pk">
            <div className="singleGame__middle__pk__left">
              <img src={leftImg} alt="leftChosenCard" />
            </div>
            <div
              className="singleGame__middle__pk__VS"
              onClick={() => dispatch(pk())}
            >
              VS
            </div>
            <div>
              <img src={rightImg} alt="rightChosenCard" />
            </div>
          </div>

          <div>
            <PlayerOneCards cards={computer} hp={computerHp} side={'right'} />
          </div>
        </div>
      )}
    </div>
  );
};
