import { ShowCard } from './showCard';
import './playerCards.css';
import { PlayerState } from '../features/playerOneSlice';
import { choose } from '../features/gameSlice';
import { Hp } from '../features/gameSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Side } from '../features/gameSlice';

import { RootState } from '../features/fetchDataSlice';

export const PlayerOneCards = ({
  cards,
  hp,
  side,
  isComputer,
}: {
  cards: PlayerState;
  hp: Hp;
  side: Side;
  isComputer: boolean;
}) => {
  const dispatch = useDispatch();
  const isNewRound = useSelector((state: RootState) => state.game.isNewRound);
  let cardOnePercentage: number = 0;
  let cardTwoPercentage: number = 0;
  let cardThreePercentage: number = 0;
  if (hp.cardOne && hp.cardTwo && hp.cardThree) {
    cardOnePercentage = hp.cardOne.hp / cards.cardOne.HP;
    cardTwoPercentage = hp.cardTwo.hp / cards.cardTwo.HP;
    cardThreePercentage = hp.cardThree.hp / cards.cardThree.HP;
  }

  return (
    <div className="player__cards">
      <div style={{ filter: hp.cardOne.hp === 0 ? 'grayscale(0.8)' : '' }}>
        <div
          onClick={() => {
            isNewRound &&
              !isComputer &&
              hp.cardOne.hp !== 0 &&
              dispatch(
                choose({
                  side: side,
                  card: 'cardOne',
                  pokemon: cards.cardOne.pokemon,
                })
              );
          }}
        >
          <ShowCard
            pokemonData={cards.cardOne.pokemon}
            showCardStyle="player__"
          />
        </div>
        <div className="player__hp__container">
          <p>hp:</p>
          <div
            className="player__showhp"
            style={{
              background: `linear-gradient(to right, red ${
                cardOnePercentage * 100
              }%, white ${cardOnePercentage * 100}%)`,
            }}
          >
            {hp.cardOne.hp}/{cards.cardOne.HP}
          </div>
        </div>
      </div>
      <div style={{ filter: hp.cardTwo.hp === 0 ? 'grayscale(0.8)' : '' }}>
        <div
          onClick={() => {
            isNewRound &&
              !isComputer &&
              hp.cardTwo.hp !== 0 &&
              dispatch(
                choose({
                  side: side,
                  card: 'cardTwo',
                  pokemon: cards.cardTwo.pokemon,
                })
              );
          }}
        >
          <ShowCard
            showCardStyle="player__"
            pokemonData={cards.cardTwo.pokemon}
          />
        </div>

        <div className="player__hp__container">
          <p>hp:</p>
          <div
            className="player__showhp"
            style={{
              background: `linear-gradient(to right, red ${
                cardTwoPercentage * 100
              }%, white ${cardTwoPercentage * 100}%)`,
            }}
          >
            {hp.cardTwo.hp}/{cards.cardTwo.HP}
          </div>
        </div>
      </div>
      <div style={{ filter: hp.cardThree.hp === 0 ? 'grayscale(0.8)' : '' }}>
        <div
          onClick={() => {
            isNewRound &&
              !isComputer &&
              hp.cardThree.hp !== 0 &&
              dispatch(
                choose({
                  side: side,
                  card: 'cardThree',
                  pokemon: cards.cardThree.pokemon,
                })
              );
          }}
        >
          <ShowCard
            showCardStyle="player__"
            pokemonData={cards.cardThree.pokemon}
          />
        </div>

        <div className="player__hp__container">
          <p>hp:</p>
          <div
            className="player__showhp"
            style={{
              background: `linear-gradient(to right, red ${
                cardThreePercentage * 100
              }%, white ${cardThreePercentage * 100}%)`,
            }}
          >
            {hp.cardThree.hp}/{cards.cardThree.HP}
          </div>
        </div>
      </div>
    </div>
  );
};
