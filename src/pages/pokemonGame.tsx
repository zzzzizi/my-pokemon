import { PlayerOneCards } from '../components/playerCards';
import { Vs } from '../components/vs';
import { useSelector } from 'react-redux';
import { RootState } from '../features/fetchDataSlice';
import './pokemonGame.css';

export const PokemonGame = () => {
  const playerOneHp = useSelector((state: RootState) => state.game.left);
  const computerHp = useSelector((state: RootState) => state.game.right);
  const palyerOne = useSelector((state: RootState) => state.playerOne);
  const computer = useSelector((state: RootState) => state.computer);
  const singlePlayer = useSelector(
    (state: RootState) => state.game.singlePlayer
  );

  let isLeftFailed = false;
  if (
    playerOneHp.cardOne.hp === 0 &&
    playerOneHp.cardTwo.hp === 0 &&
    playerOneHp.cardThree.hp === 0
  ) {
    isLeftFailed = true;
  }
  let isRightFailed = false;
  if (
    computerHp.cardOne.hp === 0 &&
    computerHp.cardTwo.hp === 0 &&
    computerHp.cardThree.hp === 0
  ) {
    isRightFailed = true;
  }

  return (
    <div className="game">
      <div className="game__cards">
        <div>
          {isRightFailed && <div className="game__win">You Win</div>}
          {isLeftFailed && <div className="game__failed">You Failed</div>}
        </div>
        <PlayerOneCards
          cards={palyerOne}
          hp={playerOneHp}
          side={'left'}
          isComputer={false}
        />
      </div>
      <Vs isLeftFailed={isLeftFailed} isRightFailed={isRightFailed} />
      <div className="game__cards">
        <div>
          {isLeftFailed && <div className="game__win">You Win</div>}
          {isRightFailed && <div className="game__failed">You Failed</div>}
        </div>
        <PlayerOneCards
          cards={computer}
          hp={computerHp}
          side={'right'}
          isComputer={singlePlayer}
        />
      </div>
    </div>
  );
};
