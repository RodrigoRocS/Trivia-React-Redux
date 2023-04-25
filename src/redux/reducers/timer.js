import { TIMER_DECREMENT } from '../actions';

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
  default:
    return state;
  }
};

export default timerDecrement;
