import React from 'react';
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import fetchUser from '../api/fetchUser';
import FETCH_STATUS from "../constants/fetchStatuses";
import NetworkError from './NetworkError';

class User extends React.Component {
    state = {
        search: "",
    };

    render () {
        return (
            <div>
                <NetworkError/>
                <div>
                    <input onChange={e => this.setState({search: e.target.value})} value={this.state.search} />
                    <button onClick={this.onClickSearch.bind(this)}>GET</button>
                </div>
                {this.props.profile && (
                    <div>
                        <h1>{"User: " + this.props.login}</h1>

                        <img src={this.props.profile.img}/>

                        <p>{"Name: " + this.props.profile.name}</p>
                        <Link to={`/${this.props.login}/repositories`}><p>{"Repositories: " + this.props.profile.public_repos}</p></Link>
                        <p>{"Bio: " + (this.props.profile.bio || "")}</p>
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
        if (this.props.match.params.user)
            this.props.fetchUser(this.props.match.params.user);
    }

    onClickSearch () {
        this.props.fetchUser(this.state.search);
    }
}

const mapStateToProps = (state) => ({
    login: state.user.login,
    profile: state.user.profile,
    status: state.user.status,
});

const mapDispatchToProps = {
    fetchUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(User);
