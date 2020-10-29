import React from 'react';
import '../styles/Input.css';

class Input extends React.Component {
    state = {
        error: false,
    };

    render () {
        return (
            <div className="input_container_main">
                <div className={"input_container" + (this.state.error ? " input_container_error" : "")}>
                    <input className="input_input" placeholder={this.props.placeholder} value={this.props.value} onKeyDown={e => e.keyCode === 13 && this.onSubmit()} onChange={e => this.onChange(e.target.value)}/>
                    <button className="input_button" onClick={this.onSubmit.bind(this)}>{this.props.label}</button>
                </div>
            </div>
        );
    }

    onChange (value) {
        const error = value && !/^[a-zA-Z0-9.-]+$/.test(value);
        if (this.state.error !== error) this.setState({error});

        this.props.onChange(value);
    }

    onSubmit () {
        if (!this.props.onSubmit || this.state.error) return;
        this.props.onSubmit();
    }
}

export default Input;
