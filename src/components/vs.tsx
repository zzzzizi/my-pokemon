import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../features/fetchDataSlice';
import { choose, deleteGame, pk, Card } from '../features/gameSlice';
import { useState } from 'react';
import { nextRound, isSinglePlayer } from '../features/gameSlice';
import { getCards } from '../features/playerOneSlice';
import { getComputerCards } from '../features/computerSlice';
import './vs.css';

export const Vs = () => {
  const dispatch = useDispatch();
  const [isStart, setIsStart] = useState(false);
  const [isVs, setIsVs] = useState(false);
  const isComputer = useSelector((state: RootState) => state.game.singlePlayer);
  const isNewRound = useSelector((state: RootState) => state.game.isNewRound);
  const computer = useSelector((state: RootState) => state.computer);
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

  let chosenCard: Card = 'cardOne';
  const handleClick = () => {
    const cardNumber: Array<'cardOne' | 'cardTwo' | 'cardThree'> = [];
    right.cardOne.hp > 0 && cardNumber.push('cardOne');
    right.cardTwo.hp > 0 && cardNumber.push('cardTwo');
    right.cardThree.hp > 0 && cardNumber.push('cardThree');
    const randomNumber = Math.floor(Math.random() * cardNumber.length);

    chosenCard = cardNumber[randomNumber];
  };

  return (
    <div className="game__middle">
      {!isStart ? (
        <div className="game__vs__start">
          <button
            className="game__vs__start__btn"
            onClick={() => {
              if (isComputer === true) {
                setIsStart(true);
                handleClick();
                dispatch(
                  choose({
                    side: 'right',
                    card: chosenCard,
                    pokemon: computer[chosenCard].pokemon,
                  })
                );
              } else {
                setIsStart(true);
              }
            }}
          >
            Start
          </button>
        </div>
      ) : (
        <div className="game__vs">
          <div className="game__vs__top">
            <div className="game__vs__img__container">
              <div>
                {isVs && (
                  <div className="game__vs__defense">
                    +{left[leftChoose].defense}
                  </div>
                )}
              </div>
              <div>
                {isVs && (
                  <div className="game__vs__attack">
                    -{right[rightChoose].attack}
                  </div>
                )}
              </div>
              <img
                className={leftChooseCard !== 0 ? 'game__vs__left__img' : ``}
                src={leftImg}
                alt="leftChosenCard"
              />
            </div>
            <div
              className="game__vs__VS"
              onClick={() => {
                if (
                  isNewRound &&
                  leftChooseCard !== 0 &&
                  rightChooseCard !== 0
                ) {
                  dispatch(pk());
                  setIsVs(true);
                }
              }}
            >
              VS
            </div>
            <div className="game__vs__img__container">
              <div>
                {isVs && (
                  <div className="game__vs__attack">
                    -{left[leftChoose].attack}
                  </div>
                )}
              </div>
              <div>
                {isVs && (
                  <div className="game__vs__defense">
                    +{right[rightChoose].defense}
                  </div>
                )}
              </div>
              <img src={rightImg} alt="rightChosenCard" />
            </div>
          </div>
          <button
            className="game__vs__battle__btn"
            onClick={() => {
              if (isNewRound && leftChooseCard !== 0 && rightChooseCard !== 0) {
                dispatch(pk());
                setIsVs(true);
              }
            }}
          >
            Battle
          </button>
          <button
            className="game__vs__next__btn"
            onClick={() => {
              if (isComputer === false) {
                dispatch(nextRound());
                setIsVs(false);
              } else {
                handleClick();
                dispatch(nextRound());
                dispatch(
                  choose({
                    side: 'right',
                    card: chosenCard,
                    pokemon: computer[chosenCard].pokemon,
                  })
                );
                setIsVs(false);
              }
            }}
          >
            Next Round
          </button>
          <button
            className="game__vs__again__btn"
            onClick={() => {
              if (isComputer === false) {
                dispatch(deleteGame());
                dispatch(getCards('cardOne'));
                dispatch(getCards('cardTwo'));
                dispatch(getCards('cardThree'));
                dispatch(getComputerCards('cardOne'));
                dispatch(getComputerCards('cardTwo'));
                dispatch(getComputerCards('cardThree'));

                setIsVs(false);
                setIsStart(false);
              } else {
                dispatch(deleteGame());
                dispatch(isSinglePlayer(true));
                dispatch(getCards('cardOne'));
                dispatch(getCards('cardTwo'));
                dispatch(getCards('cardThree'));
                dispatch(getComputerCards('cardOne'));
                dispatch(getComputerCards('cardTwo'));
                dispatch(getComputerCards('cardThree'));
                setIsVs(false);
                setIsStart(false);
              }
            }}
          >
            Play Again
          </button>
        </div>
      )}
    </div>
  );
};
