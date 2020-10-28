import ACTIONS from '../actions/types';
import FETCH_STATUS from '../constants/fetchStatuses';

const defaultState = {
    list: [],
    is_loading: false,
    is_not_fond: false,
    can_load_more: true,
    status: FETCH_STATUS.READY,
    page: 1,
};

const statuses = (state = defaultState, action) => {
    switch (action.type) {
        case ACTIONS.REPOSITORIES_ADD:
            if (!action.repositories.length)
                return {
                    ...state,
                    status: FETCH_STATUS.END,
                };

            return {
                ...state,
                list: state.list.concat(action.repositories.map(repo => ({
                    name: repo.name,
                    stars: repo.stargazers_count,
                }))),
                status: FETCH_STATUS.READY,
                page: state.page + 1,
            };

        case ACTIONS.REPOSITORIES_CLEAN:
            return {
                ...state,
                list: [],
                page: 1,
                status: FETCH_STATUS.READY,
            };

        case ACTIONS.REPOSITORIES_START_FETCHING:
            return {
                ...state,
                status: FETCH_STATUS.FETCHING,
            };

        case ACTIONS.REPOSITORIES_NOT_FOUND:
            return {
                ...state,
                status: FETCH_STATUS.NOT_FOUND,
            };

        default:
            return state;
    }
};

export default statuses;
