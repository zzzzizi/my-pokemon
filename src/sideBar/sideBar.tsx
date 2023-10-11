import { useNavigate } from 'react-router-dom';
import './sideBar.css';

export const SideBar = () => {
  const navigate = useNavigate();

  return (
    <div className="side__container">
      <div
        className="side__home"
        onClick={() => {
          navigate('/');
        }}
      >
        HOME
      </div>
      <div
        onClick={() => {
          navigate('/showAll');
        }}
      >
        Pokemon
      </div>
      <div
        onClick={() => {
          navigate('/game');
        }}
      >
        Game
      </div>
    </div>
  );
};
