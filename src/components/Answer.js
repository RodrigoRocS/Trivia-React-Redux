import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './Answer.css';
import Timer from './Timer';

class Answer extends Component {
  state = {
    className: false,
    shuffledAnswers: [],
    showNextBtn: false,
  };

  componentDidMount() {
    const { questions, currentQuestion } = this.props;
    const answers = [
      { text: questions.results[currentQuestion]
        .correct_answer,
      isCorrect: true,
      testId: 'correct-answer' },
      ...questions.results[currentQuestion].incorrect_answers
        .map((question) => ({
          text: question, isCorrect: false, testId: 'wrong-answer' })),
    ];

    const shufleNumber = 0.5;
    const shuffledAnswers = answers.sort(() => Math.random() - shufleNumber);
    this.setState({ shuffledAnswers });
  }

  handleClick = () => {
    this.setState({ className: true, showNextBtn: true });
  };

  render() {
    const { disable } = this.props;
    const { className, shuffledAnswers, showNextBtn } = this.state;

    return (
      <div data-testid="answer-options">

        {shuffledAnswers
          .map((answer, index) => (
            <button
              key={ index }
              data-testid={ answer.testId }
              disabled={ disable }
              onClick={ this.handleClick }
              className={ className ? answer.testId : 'default' }
            >
              {answer.text}
            </button>
          ))}
        <Timer />
        {showNextBtn && (
          <button
            data-testid="btn-next"
          >
            Next
          </button>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  questions: state.questionsAnswers.questions,
  currentQuestion: state.questionsAnswers.currentQuestion,
  disable: state.questionsAnswers.disable,
});

Answer.propTypes = {
  questions: PropTypes.arrayOf(PropTypes.shape({
  })).isRequired,
  currentQuestion: PropTypes.number.isRequired,
}.isRequired;

export default connect(mapStateToProps)(Answer);
