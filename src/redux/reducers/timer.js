import { CLEAR_TIMER, TIMER_DECREMENT, TIMER_UPDATE, PAUSE_TIMER } from '../actions';

const INITIAL_STATE = {
  timer: 30,
  isPaused: false,
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
  case CLEAR_TIMER:
    return {
      ...state,
      timer: 1,
    };
  case PAUSE_TIMER:
    return {
      ...state,
      isPaused: true,
    };

  default:
    return state;
  }
};

export default timerDecrement;
