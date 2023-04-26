import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Config from './pages/Config';
import Feedback from './pages/Feedback';
import Game from './pages/Game';
import Login from './pages/Login';
import Ranking from './pages/Ranking';
import logo from './trivia.png';

export default function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={ logo } className="App-logo" alt="logo" />
        <Switch>
          <Route exact path="/" component={ Login } />
          <Route path="/config" component={ Config } />
          <Route path="/game" component={ Game } />
          <Route path="/feedback" component={ Feedback } />
          <Route path="/ranking" component={ Ranking } />
        </Switch>
      </header>
    </div>
  );
}
