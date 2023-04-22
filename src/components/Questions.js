import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom/cjs/react-router-dom';
import { getTrivia } from '../services/triviaApi';
import Answer from './Answer';
import { questionsAnswers, tokenVerify } from '../redux/actions';

class Questions extends Component {
  async componentDidMount() {
    const { dispatch } = this.props;
    const token = localStorage.getItem('token');
    const questionAPI = await getTrivia(token);
    try {
      if (questionAPI.response_code === 0) {
        dispatch(tokenVerify(true));
        dispatch(questionsAnswers(questionAPI));
      } else {
        localStorage.removeItem('token');
        dispatch(tokenVerify(false));
        throw new Error('Token inválido');
      }
    } catch (error) {
      console.error(error);
    }
  }

  render() {
    const { questions, currentQuestion, tokenIsValid } = this.props;
    const { results } = questions;
    let renderQuestion;
    if (results) {
      renderQuestion = results
        .filter((_result, index) => (index === currentQuestion));
    }
    return (
      <div>
        { tokenIsValid ? (
          <div>
            { results && (
              <div>
                <p data-testid="question-category">
                  { renderQuestion[currentQuestion].category }
                </p>

                <p data-testid="question-text">
                  { renderQuestion[currentQuestion].question }
                </p>
                <Answer />
              </div>
            )}
          </div>
        ) : (
          <Redirect to="/" />
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  questions: state.questionsAnswers.questions,
  currentQuestion: state.questionsAnswers.currentQuestion,
  tokenIsValid: state.questionsAnswers.tokenIsValid,
});

Questions.propTypes = {
  questions: PropTypes.shape({
    results: PropTypes.arrayOf(PropTypes.shape({
      category: PropTypes.string.isRequired,
      question: PropTypes.string.isRequired,
      correct_answer: PropTypes.string.isRequired,
      incorrect_answers: PropTypes.arrayOf(PropTypes.string).isRequired,
    })).isRequired,
  }).isRequired,
  currentQuestion: PropTypes.number.isRequired,
  tokenIsValid: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect(mapStateToProps)(Questions);
