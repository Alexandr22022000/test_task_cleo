import React from 'react';
import {Link} from "react-router-dom";
import {connect, batch} from "react-redux";
import fetchRepositories from '../api/fetchRepositories';
import userSetLogin from '../actions/userSetLogin';
import repositoriesClean from '../actions/repositoriesClean';
import FETCH_STATUS from "../constants/fetchStatuses";
import NetworkError from './NetworkError';

class Repositories extends React.Component {
    state = {
        sortByStars: false,
        filter: "",
    };

    render () {
        return (
            <div>
                <NetworkError/>
                <Link to={"/" + this.props.login}><button>Back</button></Link>

                <h1>{"Repositories of " + this.props.login}</h1>

                <div>
                    <label>
                        <input type="checkbox" onClick={() => this.setState({sortByStars: !this.state.sortByStars})} checked={this.state.sortByStars}/>
                        Sort by stars
                    </label>

                    <input onChange={e => this.setState({filter: e.target.value})} value={this.state.filter}/>

                    <table>
                        <tbody>
                        {this.getRepositories().map(repo => (
                            <tr>
                                <td>{repo.name}</td>
                                <td>{repo.stars}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>

                {this.props.status === FETCH_STATUS.READY && (
                    <div>
                        <button onClick={() => this.props.fetchRepositories()}>Load more</button>
                    </div>
                )}
                {this.props.status === FETCH_STATUS.FETCHING && (
                    <div>
                        <h1>Loading...</h1>
                    </div>
                )}
                {this.props.status === FETCH_STATUS.NOT_FOUND && (
                    <div>
                        <h1>User not found</h1>
                    </div>
                )}
            </div>
        );
    }

    componentWillMount () {
        batch(() => {
            this.props.userSetLogin(this.props.match.params.user);
            this.props.repositoriesClean();
            this.props.fetchRepositories();
        });
    }

    getRepositories () {
        let repos = this.props.repositories;

        if (this.state.filter)
            repos = repos.filter(repo => repo.name.indexOf(this.state.filter) !== -1);

        if (this.state.sortByStars)
            repos = [...repos].sort((a, b) => a.stars === b.stars ? 0 : (a.stars > b.stars ? -1 : 1));

        return repos;
    }
}

const mapStateToProps = (state) => ({
    login: state.user.login,
    repositories: state.repositories.list,
    status: state.repositories.status,
});

const mapDispatchToProps = {
    fetchRepositories,
    userSetLogin,
    repositoriesClean,
};

export default connect(mapStateToProps, mapDispatchToProps)(Repositories);
