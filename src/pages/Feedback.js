import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';

class Feedback extends Component {
  handleclick = (page) => {
    const { history } = this.props;
    history.push(page);
  };

  render() {
    const { score, assertions } = this.props;
    const feedbackMsg = (points) => {
      const minPoints = 3;
      if (points < minPoints) {
        return 'Could be Better...';
      }
      return 'Well Done';
    };
    return (
      <div>
        <Header />
        <p data-testid="feedback-total-score">{`Total de pontos:${score}`}</p>
        <p data-testid="feedback-total-question">{`Total de acertos:${assertions}`}</p>
        <h3 data-testid="feedback-text">{feedbackMsg(assertions)}</h3>
        <button
          data-testid="btn-play-again"
          name="/"
          onClick={ ({ target }) => this.handleclick(target.name) }
        >
          Play Again

        </button>
        <button
          name="ranking"
          data-testid="btn-ranking"
          onClick={ ({ target }) => this.handleclick(target.name) }
        >
          Ranking

        </button>

      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  score: state.player.score,
  assertions: state.player.assertions,
});

Feedback.propTypes = {
  score: PropTypes.number.isRequired,
  assertions: PropTypes.number.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect(mapStateToProps)(Feedback);
