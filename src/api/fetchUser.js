import HTTP from '../HTTPS/index';
import userSet from '../actions/userSet';
import userStartFetching from '../actions/userStartFetching';
import userNotFound from '../actions/userNotFound';

const action = (login) => (dispatch, getState) => {
    const errors = {
        404: () => {
            dispatch(userNotFound(login));
        },
    };

    dispatch(userStartFetching(login));
    HTTP.get('/users/' + login, {}, dispatch, errors)
        .then(data => {
            dispatch(userSet(data));
        });
};

export default action;
