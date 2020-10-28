import ACTIONS from './types';

const action = (user) => ({
    type: ACTIONS.USER_SET,
    user,
});

export default action;
