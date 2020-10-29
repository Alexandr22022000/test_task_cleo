import React from 'react';
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import fetchUser from '../api/fetchUser';
import FETCH_STATUS from "../constants/fetchStatuses";
import NetworkError from './NetworkError';
import Input from './Input';
import Navbar from './Navbar';
import Preloader from './Preloader';
import NotFound from './NotFound';
import '../styles/User.css';
import profile from '../images/profile.png';

class User extends React.Component {
    state = {
        search: "",
    };

    render () {
        return (
            <div>
                <Navbar img={profile}>{this.props.login || "GitHub explorer"}</Navbar>
                <NetworkError/>
                <div style={{marginTop: '75px'}}>
                    <Input label="Search" placeholder="Search for GitHub users" onChange={value => this.setState({search: value})} value={this.state.search} onSubmit={this.onClickSearch.bind(this)}/>
                    {this.props.status === FETCH_STATUS.FETCHING && <Preloader/>}
                    {this.props.status === FETCH_STATUS.NOT_FOUND && <NotFound/>}
                    {this.props.profile && (
                        <div className="user_container">
                            <img className="user_img" src={this.props.profile.img}/>

                            <div className="user_info_container">
                                <h2 className="user_name">{this.props.profile.name}</h2>
                                <h3 className="user_login">{"Login: " + this.props.login}</h3>
                                <p className="user_bio">{this.props.profile.bio || ""}</p>
                                <Link className="user_repos" to={`/${this.props.login}/repositories`}><span>{"Repositories: " + this.props.profile.public_repos}</span></Link>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        );
    }

    componentWillMount () {
        if (this.props.match.params.user)
            this.props.fetchUser(this.props.match.params.user);
    }

    onClickSearch () {
        window.history.pushState('React App', 'React App', '/' + this.state.search);
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
