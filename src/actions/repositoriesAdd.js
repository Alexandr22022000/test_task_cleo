import ACTIONS from './types';

const action = (repositories) => ({
    type: ACTIONS.REPOSITORIES_ADD,
    repositories,
});

export default action;
