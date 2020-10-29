import React from 'react';
import '../styles/Preloader.css';

class NotFound extends React.Component {
    render () {
        return (
            <h3 style={{fontSize: '40px', color: 'red', textAlign: 'center'}}>404 NOT FOUND</h3>
        );
    }
}

export default NotFound;
