import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { sumScore } from '../redux/actions';
import '../styles/Answer.css';
import NextButton from './NextButton';
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

  componentDidUpdate(prevProps) {
    const { questions, currentQuestion } = this.props;
    if (prevProps.currentQuestion !== currentQuestion) {
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
      this.setState({ shuffledAnswers, className: false, showNextBtn: false });
    }
  }

  getQuestionDifficulty = (question) => {
    const hard = 3;
    const medium = 2;
    const easy = 1;
    if (question === 'hard') {
      return hard;
    } if (question === 'medium') {
      return medium;
    }
    return easy;
  };

  handleClick = (isCorrect) => {
    const { questions, currentQuestion, timer, dispatch } = this.props;
    const getQuestion = questions.results[currentQuestion];
    const questionDifficulty = this.getQuestionDifficulty(getQuestion.difficulty);
    const points = 10;
    const currentTimer = timer;
    if (isCorrect) {
      const sumPoints = points + (currentTimer * questionDifficulty);
      dispatch(sumScore(sumPoints));
    }

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
              onClick={ () => this.handleClick(answer.isCorrect) }
              className={ className ? answer.testId : 'default' }
            >
              {answer.text}
            </button>
          ))}
        <div>
          { showNextBtn ? (<NextButton />) : (<Timer />) }
        </div>

      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  questions: state.questionsAnswers.questions,
  currentQuestion: state.questionsAnswers.currentQuestion,
  disable: state.questionsAnswers.disable,
  timer: state.timer.timer,
  score: state.player.score,
});

Answer.propTypes = {
  questions: PropTypes.arrayOf(PropTypes.shape({
  })).isRequired,
  currentQuestion: PropTypes.number.isRequired,
}.isRequired;

export default connect(mapStateToProps)(Answer);
