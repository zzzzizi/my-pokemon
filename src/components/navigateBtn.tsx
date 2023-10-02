import { useNavigate } from 'react-router-dom';

export const NavigateBtn = () => {
  const navigate = useNavigate();

  return (
    <div>
      <div className="navigate__container">
        <div
          className="navigate__home"
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
    </div>
  );
};
