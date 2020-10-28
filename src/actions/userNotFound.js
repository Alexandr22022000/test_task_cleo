import ACTIONS from './types';

const action = (login) => ({
    type: ACTIONS.USER_NOT_FOUND,
    login,
});

export default action;
