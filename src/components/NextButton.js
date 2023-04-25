import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { resetQuestion, updateQuestion, updateTimer } from '../redux/actions';

class NextButton extends Component {
  handleClick = () => {
    const { currentQuestion, history, dispatch } = this.props;
    const finalQuestion = 4;
    const initialTime = 30;
    dispatch(updateQuestion());
    dispatch(updateTimer(initialTime));
    if (currentQuestion === finalQuestion) {
      dispatch(resetQuestion());
      return history.push('/feedback');
    }
  };

  render() {
    return (
      <button
        data-testid="btn-next"
        onClick={ this.handleClick }
      >
        Next
      </button>
    );
  }
}

const mapStateToProps = (state) => ({
  currentQuestion: state.questionsAnswers.currentQuestion,
  timer: state.timer.timer,

});

NextButton.propTypes = {
  currentQuestion: PropTypes.number.isRequired,
  timer: PropTypes.number.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
}.isRequired;

export default withRouter(connect(mapStateToProps)(NextButton));
