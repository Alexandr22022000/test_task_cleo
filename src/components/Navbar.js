import React from 'react';
import '../styles/Navbar.css';

class Input extends React.Component {
    render () {
        return (
            <div className="navbar_container">
                <img src={this.props.img} className="navbar_img"/>
                <h1 className="navbar_text">{this.props.children}</h1>
            </div>
        );
    }
}

export default Input;
