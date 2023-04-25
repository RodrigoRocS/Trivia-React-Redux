import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';
import Header from '../components/Header';
import { resetPlayer } from '../redux/actions';

class Feedback extends Component {
  componentDidMount() {
    const { name, gravatarEmail, score } = this.props;
    const convertImg = md5(gravatarEmail).toString();
    const picture = `https://www.gravatar.com/avatar/${convertImg}`;
    const player = {
      picture,
      name,
      score,
    };
    const ranking = JSON.parse(localStorage.getItem('ranking') || '[]');
    const updatedRanking = [...ranking, player];
    localStorage.setItem('ranking', JSON.stringify(updatedRanking));
  }

  handleclick = (page) => {
    const { history, dispatch } = this.props;
    dispatch(resetPlayer());
    history.push(page);
  };

  render() {
    const { score, assertions } = this.props;
    const feedbackMsg = (points) => {
      const minPoints = 3;
      if (points < minPoints) {
        return 'Could be better...';
      }
      return 'Well Done!';
    };
    return (
      <div>
        <Header />
        <p data-testid="feedback-total-score">{`${score}`}</p>
        <p data-testid="feedback-total-question">{`${assertions}`}</p>
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
  gravatarEmail: state.player.gravatarEmail,
  name: state.player.name,
  score: state.player.score,
  assertions: state.player.assertions,
});

Feedback.propTypes = {
  dispatch: PropTypes.func.isRequired,
  gravatarEmail: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  assertions: PropTypes.number.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect(mapStateToProps)(Feedback);
