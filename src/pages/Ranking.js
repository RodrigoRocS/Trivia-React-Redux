import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Ranking extends Component {
  state = {
    playerRanking: [],
  };

  componentDidMount() {
    const playerRanking = JSON.parse(localStorage.getItem('playerRanking'))
      .sort((a, b) => b.score - a.score);
    this.setState({ playerRanking });
  }

  handleclick = (page) => {
    const { history } = this.props;
    history.push(page);
  };

  render() {
    const { playerRanking } = this.state;
    return (
      <div>
        <h1 data-testid="ranking-title">Melhores Jogadores !!</h1>
        { playerRanking.map((player, index) => (
          <div key={ index }>
            <img src={ player.imgProfile } alt="" />
            <p data-testid={ `player-name-${index}` }>{ player.name }</p>
            <p data-testid={ `player-score-${index}` }>{ player.score }</p>
          </div>
        )) }
        <button
          data-testid="btn-go-home"
          name="/"
          onClick={ ({ target }) => this.handleclick(target.name) }
        >
          Voltar ao ínicio

        </button>
      </div>
    );
  }
}

Ranking.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect()(Ranking);
