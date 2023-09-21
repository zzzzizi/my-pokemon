import { useState } from 'react';
import { RootState } from '../features/fetchDataSlice';
import { useDispatch, useSelector } from 'react-redux';
import { getCards } from '../features/playerOneSlice';
import { PlayerOneCards } from '../components/playerCards';
import { getComputerCards } from '../features/computerSlice';
import './singleGame.css';
import { Vs } from '../components/vs';
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

  let isPlayerOneFailed = false;
  if (
    playerOneHp.cardOne.hp === 0 &&
    playerOneHp.cardTwo.hp === 0 &&
    playerOneHp.cardThree.hp === 0
  ) {
    isPlayerOneFailed = true;
  }
  let isComputerFailed = false;
  if (
    computerHp.cardOne.hp === 0 &&
    computerHp.cardTwo.hp === 0 &&
    computerHp.cardThree.hp === 0
  ) {
    isComputerFailed = true;
  }

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
            <div>
              {isComputerFailed && (
                <div className="singleGame__middle__pk__win">You Win</div>
              )}
              {isPlayerOneFailed && (
                <div className="singleGame__middle__pk__failed">You Failed</div>
              )}
            </div>
            <div className="singleGame__middle__pk__pokemon">
              <PlayerOneCards
                cards={palyerOne}
                hp={playerOneHp}
                side={'left'}
              />
            </div>
          </div>
          <Vs />
          <div>
            <div>
              {isPlayerOneFailed && (
                <div className="singleGame__middle__pk__win">You Win</div>
              )}
              {isComputerFailed && (
                <div className="singleGame__middle__pk__failed">You Failed</div>
              )}
            </div>
            <div className="singleGame__middle__pk__pokemon">
              <PlayerOneCards cards={computer} hp={computerHp} side={'right'} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
