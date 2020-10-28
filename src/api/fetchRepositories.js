import HTTP from '../HTTPS/index';
import repositoriesAdd from '../actions/repositoriesAdd';
import repositoriesStartFetching from '../actions/repositoriesStartFetching';
import repositoriesNotFound from '../actions/repositoriesNotFound';

const action = (login) => (dispatch, getState) => {
    const state = getState();

    const errors = {
        404: () => {
            dispatch(repositoriesNotFound());
        },
    };

    dispatch(repositoriesStartFetching());
    HTTP.get('/users/' + state.user.login + '/repos?per_page=100&page=' + state.repositories.page, {}, dispatch, errors)
        .then(data => {
            dispatch(repositoriesAdd(data));
        });
};

export default action;
