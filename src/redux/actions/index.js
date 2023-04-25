export const PLAYER_NAME_EMAIL = 'PLAYER_NAME_EMAIL';
export const QUESTIONS_ANSWERS = 'QUESTIONS_ANSWERS';
export const TOKEN_IS_VALID = 'TOKEN_IS_VALID';
export const DISABLE_BTN = 'DISABLE_BTN';
export const TIMER_DECREMENT = 'TIMER_DECREMENT';
export const SUM_SCORE = 'SUM_SCORE';
export const TIMER_UPDATE = 'TIMER_UPDATE';
export const QUESTION_UPDATE = 'QUESTION_UPDATE';
export const CLEAR_TIMER = 'CLEAR_TIMER';
export const PAUSE_TIMER = 'PAUSE_TIMER';
export const RESET_QUESTION = 'RESET_QUESTION';
export const RESET_PLAYER = 'RESET_PLAYER';

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

export const updateTimer = (payload) => ({
  type: TIMER_UPDATE,
  payload,
});

export const updateQuestion = () => ({
  type: QUESTION_UPDATE,
});

export const clearTimer = () => ({
  type: CLEAR_TIMER,
});

export const resetQuestion = () => ({
  type: RESET_QUESTION,
});

export const resetPlayer = () => ({
  type: RESET_PLAYER,
});
