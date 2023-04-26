import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../styles/Ranking.css';
import '../styles/buttons.css';

class Ranking extends Component {
  state = {
    ranking: [],
  };

  componentDidMount() {
    const ranking = JSON.parse(localStorage.getItem('ranking'))
      .sort((a, b) => b.score - a.score);
    this.setState({ ranking });
  }

  handleClick = (page) => {
    const { history } = this.props;
    history.push(page);
  };

  render() {
    const { ranking } = this.state;
    return (
      <div>
        <h1
          className="ranking-title"
          data-testid="ranking-title"
        >
          Melhores Jogadores !!

        </h1>
        <div className="ranking-container">

          { ranking.map((player, index) => (
            <div key={ index }>
              <img src={ player.picture } alt="imagem do jogador" />
              <p data-testid={ `player-name-${index}` }>{ player.name }</p>
              <p data-testid={ `player-score-${index}` }>{ player.score }</p>
            </div>
          )) }
        </div>
        <div className="button-home">

          <button
            data-testid="btn-go-home"
            name="/"
            onClick={ ({ target }) => this.handleClick(target.name) }
            className="btn-primary btn-color-primary btn-go-home"
          >
            Voltar ao ínicio
          </button>
        </div>
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
