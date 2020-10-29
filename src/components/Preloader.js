import React from 'react';
import '../styles/Preloader.css';

class Preloader extends React.Component {
    render () {
        return (
            <div className="preloader_container">
                <div className="lds-ring">
                    <div/>
                    <div/>
                    <div/>
                    <div/>
                </div>
            </div>

        );
    }
}

export default Preloader;
