import { PLAYER_NAME_EMAIL, RESET_PLAYER, SUM_SCORE } from '../actions';

const INITIAL_STATE = {
  gravatarEmail: '',
  name: '',
  score: 0,
  assertions: 0,
};

const playerLogin = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case PLAYER_NAME_EMAIL:
    return {
      ...state,
      gravatarEmail: action.payload.email,
      name: action.payload.name,
    };
  case SUM_SCORE:
    return {
      ...state,
      score: state.score + action.payload,
      assertions: state.assertions + 1,
    };
  case RESET_PLAYER:
    return {
      ...state,
      gravatarEmail: '',
      name: '',
      score: 0,
      assertions: 0,
    };
  default:
    return state;
  }
};

export default playerLogin;
