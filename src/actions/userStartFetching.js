import ACTIONS from './types';

const action = (login) => ({
    type: ACTIONS.USER_START_FETCHING,
    login,
});

export default action;
