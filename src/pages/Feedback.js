import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Feedback extends Component {
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
        <p data-testid="feedback-total-score">{`Total de pontos:${score}`}</p>
        <p data-testid="feedback-total-question">{`Total de acertos:${assertions}`}</p>
        <h3 data-testid="feedback-text">{feedbackMsg(assertions)}</h3>
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
};
export default connect(mapStateToProps)(Feedback);
