import { useNavigate } from 'react-router-dom';
import './sideBar.css';
import { useDispatch, useSelector } from 'react-redux';
import { deleteAllData, fetchAllPokemonData } from '../features/fetchAllSlice';
import { RootState } from '../features/fetchDataSlice';

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
          navigate('/singleGame');
        }}
      >
        Game
      </div>
    </div>
  );
};
