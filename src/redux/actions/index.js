export const PLAYER_NAME_EMAIL = 'PLAYER_NAME_EMAIL';
export const QUESTIONS_ANSWERS = 'QUESTIONS_ANSWERS';
export const TOKEN_IS_VALID = 'TOKEN_IS_VALID';

export const playerInfos = (payload) => ({
  type: PLAYER_NAME_EMAIL,
  payload,
});

export const questionsAnswers = (payload) => ({
  type: QUESTIONS_ANSWERS,
  payload,
});

export const tokenVerify = (payload) => ({
  type: TOKEN_IS_VALID,
  payload,
});
