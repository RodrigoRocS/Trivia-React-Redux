import React, { Component } from 'react';

class Ranking extends Component {
  handleclick = (page) => {
    const { history } = this.props;
    history.push(page);
  };

  render() {
    return (
      <div>
        <h1 data-testid="ranking-title">Melhores Jogadores !!</h1>

        <button
          data-testid="btn-play-again"
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
