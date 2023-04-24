import { DISABLE_BTN, QUESTIONS_ANSWERS, TOKEN_IS_VALID } from '../actions';

const INITIAL_STATE = {
  tokenIsValid: '',
  questions: [],
  currentQuestion: 0,
  disable: true,
};

const questionsAnswers = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case QUESTIONS_ANSWERS:
    return {
      ...state,
      questions: action.payload,
    };
  case TOKEN_IS_VALID:
    return {
      ...state,
      tokenIsValid: action.payload,
    };
  case DISABLE_BTN:
    return {
      ...state,
      disable: action.payload,
    };
  default:
    return state;
  }
};

export default questionsAnswers;
