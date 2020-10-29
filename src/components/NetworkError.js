import React from 'react';
import {connect} from "react-redux";
import requestError from '../actions/requestError';
import '../styles/NetworkError.css';

class NetworkError extends React.Component {
    render () {
        return (
            <div>
                {this.props.request_error && (
                    <div className="network_error_container">
                        <h1 className="network_error_text">{this.props.request_error}</h1>
                        <button className="network_error_close" onClick={() => this.props.requestError(null)}>X</button>
                    </div>
                )}
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    request_error: state.statuses.request_error,
});

const mapDispatchToProps = {
    requestError,
};

export default connect(mapStateToProps, mapDispatchToProps)(NetworkError);
