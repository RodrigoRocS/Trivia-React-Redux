import { QUESTIONS_ANSWERS } from '../actions';

const INITIAL_STATE = {
  questions: [],
  currentQuestion: 0,
};

const questionsAnswers = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case QUESTIONS_ANSWERS:
    return {
      ...state,
      questions: action.payload.questions,
      currentQuestion: action.payload.currentQuestion,
    };
  default:
    return state;
  }
};

export default questionsAnswers;
