import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getTrivia } from '../services/triviaApi';
import Answer from './Answer';
import { questionsAnswers } from '../redux/actions';

class Questions extends Component {
  state = {
    questionsList: [],
    currentQuestion: 0,
  };

  async componentDidMount() {
    const { history } = this.props;
    const token = localStorage.getItem('token');
    try {
      const questionAPI = await getTrivia(token);
      this.setState(
        { questionsList: questionAPI },
      );
    } catch (error) {
      localStorage.removeItem('token');
      history.push('/');
    }
  }

  render() {
    const { questionsList, currentQuestion } = this.state;
    const { results } = questionsList;
    let renderQuestion;
    if (results) {
      renderQuestion = results
        .filter((_result, index) => (index === currentQuestion));
    }
    return (
      <div>
        { results && (
          <div>
            <p data-testid="question-category">
              { renderQuestion[0].category }
            </p>

            <p data-testid="question-text">
              { renderQuestion[0].question }
            </p>
            <Answer />
          </div>
        )}
      </div>
    );
  }
}

Questions.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect()(Questions);
