import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './Answer.css';
import Timer from './Timer';

class Answer extends Component {
  state = {
    className: false,
  };

  handleClick = () => {
    this.setState({ className: true });
  };

  render() {
    const { className } = this.state;
    const { questions, currentQuestion, disable } = this.props;
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
