import { combineReducers } from 'redux';
import player from './player';
import questionsAnswers from './answers';

const rootReducer = combineReducers({ player, questionsAnswers });

export default rootReducer;
