import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';
import Questions from '../components/Questions';

class Game extends Component {
  render() {
    return (
      <div data-testid="game-page">
        <Header />
        <Questions />
      </div>
    );
  }
}

export default connect()(Game);
