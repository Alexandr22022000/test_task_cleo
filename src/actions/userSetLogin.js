import ACTIONS from './types';

const action = (login) => ({
    type: ACTIONS.USER_SET_LOGIN,
    login,
});

export default action;
