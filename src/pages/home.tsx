import { Pokeball } from '../components/pokeball';
import './home.css';

export const Home = () => {
  return (
    <div>
      <div className="home__top">Welcome to pokemon's world</div>
      <div className="home__bottom">
        You can search a certain pokemon and know every arribute about it or
        play a GAME here!
      </div>
      <Pokeball />
    </div>
  );
};
