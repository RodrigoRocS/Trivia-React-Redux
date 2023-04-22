import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Answer extends Component {
  state = {
    disable: true,
    timer: 30,
  };

  componentDidMount() {
    const disableTime = 5000;
    const dropdown = 1000;
    setTimeout(() => {
      this.setState({ disable: false });
    }, disableTime);
    const cronometer = setInterval(() => {
      const { timer } = this.state;
      this.setState({ timer: timer - 1 });
      if (timer === 1) {
        this.setState({ disable: true });
        clearInterval(cronometer);
      }
    }, dropdown);
  }

  render() {
    const { disable, timer } = this.state;
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

    return (
      <div data-testid="answer-options">

        {shuffledAnswers
          .map((answer, index) => (
            <button key={ index } data-testid={ answer.testId } disabled={ disable }>
              {answer.text}
            </button>
          ))}
        <p>{ timer }</p>
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
