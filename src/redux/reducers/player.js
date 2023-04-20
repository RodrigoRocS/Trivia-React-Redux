import { PLAYER_NAME_EMAIL } from '../actions';

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
  default:
    return state;
  }
};

export default playerLogin;
