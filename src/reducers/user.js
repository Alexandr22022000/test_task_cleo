import ACTIONS from '../actions/types';
import FETCH_STATUS from '../constants/fetchStatuses';

const defaultState = {
    login: null,
    profile: null,
    status: FETCH_STATUS.READY,
};

const statuses = (state = defaultState, action) => {
    switch (action.type) {
        case ACTIONS.USER_SET:
            return {
                ...state,
                login: action.user.login,
                profile: {
                    img: action.user.avatar_url,
                    name: action.user.name,
                    public_repos: action.user.public_repos,
                    bio: action.user.bio,
                },
                status: FETCH_STATUS.END,
            };

        case ACTIONS.USER_START_FETCHING:
            return {
                ...state,
                login: action.login,
                profile: null,
                status: FETCH_STATUS.FETCHING,
            };

        case ACTIONS.USER_NOT_FOUND:
            return {
                ...state,
                login: action.login,
                profile: null,
                status: FETCH_STATUS.NOT_FOUND,
            };

        case ACTIONS.USER_SET_LOGIN:
            return {
                ...state,
                login: action.login,
            };

        default:
            return state;
    }
};

export default statuses;
