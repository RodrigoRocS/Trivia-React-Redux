import { combineReducers } from 'redux';
import player from './player';
import questionsAnswers from './answers';
import timer from './timer';

const rootReducer = combineReducers({ player, questionsAnswers, timer });

export default rootReducer;
