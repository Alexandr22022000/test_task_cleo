import React from 'react';
import {Link} from "react-router-dom";
import {connect, batch} from "react-redux";
import fetchRepositories from '../api/fetchRepositories';
import userSetLogin from '../actions/userSetLogin';
import repositoriesClean from '../actions/repositoriesClean';
import FETCH_STATUS from "../constants/fetchStatuses";
import NetworkError from './NetworkError';
import Input from './Input';
import Navbar from './Navbar';
import Preloader from './Preloader';
import NotFound from './NotFound';
import Checkbox from './Checkbox';
import '../styles/Repositories.css';
import arrow from '../images/arrow.png';

class Repositories extends React.Component {
    state = {
        sortByStars: false,
        filter: "",
    };

    render () {
        return (
            <div>
                <Link to={"/" + this.props.login}>
                    <Navbar img={arrow}>{this.props.login}</Navbar>
                </Link>
                <NetworkError/>

                <div style={{marginTop: '75px'}}>
                    <Input placeholder="Repositories filter" label="Filter" onChange={value => this.setState({filter: value})} value={this.state.filter}/>
                    <Checkbox onChange={value => this.setState({sortByStars: value})} value={this.state.sortByStars}/>

                    <table>
                        <tbody>
                        <tr>
                            <td>Name</td>
                            <td>Stars</td>
                        </tr>
                        {this.getRepositories().map(repo => (
                            <tr>
                                <td>{repo.name}</td>
                                <td>{repo.stars}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>

                    {this.props.status === FETCH_STATUS.READY && (
                        <div className="repositories_load_container">
                            <button onClick={() => this.props.fetchRepositories()} className="repositories_load">LOAD MORE</button>
                        </div>
                    )}
                    {this.props.status === FETCH_STATUS.FETCHING && <Preloader/>}
                    {this.props.status === FETCH_STATUS.NOT_FOUND && <NotFound/>}
                </div>
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
