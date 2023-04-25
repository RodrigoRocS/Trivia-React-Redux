export const PLAYER_NAME_EMAIL = 'PLAYER_NAME_EMAIL';
export const QUESTIONS_ANSWERS = 'QUESTIONS_ANSWERS';
export const TOKEN_IS_VALID = 'TOKEN_IS_VALID';
export const DISABLE_BTN = 'DISABLE_BTN';
export const TIMER_DECREMENT = 'TIMER_DECREMENT';
export const SUM_SCORE = 'SUM_SCORE';

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

export const disableBtn = (payload) => ({
  type: DISABLE_BTN,
  payload,
});

export const timerDecrement = (timerValue) => ({
  type: TIMER_DECREMENT,
  payload: { timer: timerValue },
});

export const sumScore = (payload) => ({
  type: SUM_SCORE,
  payload,
});
