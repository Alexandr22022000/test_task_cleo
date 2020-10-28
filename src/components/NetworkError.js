import React from 'react';
import {connect} from "react-redux";
import requestError from '../actions/requestError';

class NetworkError extends React.Component {
    render () {
        return (
            <div>
                {this.props.request_error && (
                    <div>
                        <h1>{this.props.request_error}</h1>
                        <button onClick={() => this.props.requestError(null)}>close</button>
                    </div>
                )}
            </div>
        );
    }

    componentWillMount () {

    }
}

const mapStateToProps = (state) => ({
    request_error: state.statuses.request_error,
});

const mapDispatchToProps = {
    requestError,
};

export default connect(mapStateToProps, mapDispatchToProps)(NetworkError);
