import { Pokeball } from '../components/pokeball';
import './home.css';

export const Home = () => {
  return (
    <div>
      <div className="home__top">Welcome to pokemon's world</div>
      <div className="home__bottom">
        You can search all pokemons or a certain pokemon about its all
        attributes here. <br />
        And, of course, you can play single player mode or double players mode
        game here too!
      </div>
      <Pokeball />
    </div>
  );
};
