import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Answer extends Component {
  render() {
    const { questions, currentQuestion } = this.props;
    const answers = [
      { text: questions[currentQuestion]
        .correct_answer,
      isCorrect: true,
      testId: 'correct-answer' },
      ...questions[currentQuestion].incorrect_answers
        .map((question) => ({
          text: question, isCorrect: false, testId: 'wrong-answer' })),
    ];
    console.log(answers);

    const shuffledAnswers = answers.sort(() => Math.random() - 0.5);

    return (
      <div>
        <ul>
          {shuffledAnswers.map((answer, index) => (
            <li key={ index } data-testid={ answer.testId }>
              {answer.text}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  questions: state.questionsAnswers.questions,
  currentQuestion: state.questionsAnswers.currentQuestion,
});

Answer.propTypes = {
  questions: PropTypes.arrayOf(PropTypes.shape({
  })).isRequired,
  currentQuestion: PropTypes.number.isRequired,
}.isRequired;

export default connect(mapStateToProps)(Answer);
