import { TIMER_DECREMENT, TIMER_UPDATE } from '../actions';

const INITIAL_STATE = {
  timer: 30,
};

const timerDecrement = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case TIMER_DECREMENT:
    return {
      ...state,
      timer: action.payload.timer - 1,
    };
  case TIMER_UPDATE:
    return {
      ...state,
      timer: action.payload,
    };
  default:
    return state;
  }
};

export default timerDecrement;
