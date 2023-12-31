import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Bar } from './bar/bar';
import './App.css';
import { Home } from './pages/home';
import { SearchResult } from './pages/searchResult';
import { SideBar } from './sideBar/sideBar';
import { ShowAllPokemon } from './pages/showAllPokemon';
import { Game } from './pages/game';
import { useDispatch } from 'react-redux';
import { changeLocation } from './features/routerLocationSlice';
import { PokemonGame } from './pages/pokemonGame';

function App() {
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    dispatch(changeLocation(location));
    console.log('Location changed!', location);
  }, [location]);

  return (
    <div className="App">
      <div className="app__bar">
        <Bar />
      </div>
      <div className="app__middle">
        <div className="app__middle__side">
          <SideBar />
        </div>
        <div className="app__middle__right">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/searchResult" element={<SearchResult />} />
            <Route path="/showAll" element={<ShowAllPokemon />} />
            <Route path="/game" element={<Game />} />
            <Route path="/game/pokemonGame" element={<PokemonGame />} />
          </Routes>
        </div>
      </div>
      <div className="app__foot">Contact Me</div>
    </div>
  );
}

export default App;
