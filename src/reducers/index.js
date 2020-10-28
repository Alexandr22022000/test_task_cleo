import {combineReducers} from 'redux';
import statuses from './statuses';
import user from './user';
import repositories from './repositories';

const mainReducer = combineReducers({
    statuses,
    user,
    repositories,
});

export default mainReducer;
