import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../features/fetchDataSlice';
import { deleteGame, pk } from '../features/gameSlice';
import { useState } from 'react';
import { nextRound } from '../features/gameSlice';
import { getCards } from '../features/playerOneSlice';
import { getComputerCards } from '../features/computerSlice';

export const Vs = () => {
  const dispatch = useDispatch();
  const [isVs, setIsVs] = useState(false);
  const isNewRound = useSelector((state: RootState) => state.game.isNewRound);
  const left = useSelector((state: RootState) => state.game.left);
  const right = useSelector((state: RootState) => state.game.right);
  const leftChoose = useSelector((state: RootState) => state.game.left.chosen);
  const rightChoose = useSelector(
    (state: RootState) => state.game.right.chosen
  );
  const leftChooseCard = useSelector(
    (state: RootState) => state.game.left.chosenId
  );
  const rightChooseCard = useSelector(
    (state: RootState) => state.game.right.chosenId
  );
  const leftImg = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${leftChooseCard}.png`;
  const rightImg = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${rightChooseCard}.png`;

  return (
    <div className="singleGame__middle__pk">
      <div className="singleGame__middle__pk__top">
        <div className="singleGame__middle__pk__left">
          <div>
            {isVs && (
              <div className="singleGame__middle__pk__defense">
                +{left[leftChoose].defense}
              </div>
            )}
          </div>
          <div>
            {isVs && (
              <div className="singleGame__middle__pk__attack">
                -{right[rightChoose].attack}
              </div>
            )}
          </div>
          <img
            className={
              leftChooseCard !== 0 ? 'singleGame__middle__pk__left__img' : ``
            }
            src={leftImg}
            alt="leftChosenCard"
          />
        </div>
        <div
          className="singleGame__middle__pk__VS"
          onClick={() => {
            if (isNewRound) {
              dispatch(pk());
              setIsVs(true);
            }
          }}
        >
          VS
        </div>
        <div>
          <div>
            {isVs && (
              <div className="singleGame__middle__pk__attack">
                -{left[leftChoose].attack}
              </div>
            )}
          </div>
          <div>
            {isVs && (
              <div className="singleGame__middle__pk__defense">
                +{right[rightChoose].defense}
              </div>
            )}
          </div>
          <img
            className="singleGame__middle__pk__right__img"
            src={rightImg}
            alt="rightChosenCard"
          />
        </div>
      </div>
      <button
        className="pk__bottom__btn"
        onClick={() => {
          dispatch(nextRound());
          setIsVs(false);
        }}
      >
        Next Round
      </button>
      <button
        className="pk__bottom__btn"
        onClick={() => {
          dispatch(deleteGame());
          dispatch(getCards('cardOne'));
          dispatch(getCards('cardTwo'));
          dispatch(getCards('cardThree'));
          dispatch(getComputerCards('cardOne'));
          dispatch(getComputerCards('cardTwo'));
          dispatch(getComputerCards('cardThree'));

          setIsVs(false);
        }}
      >
        Play Again
      </button>
    </div>
  );
};
