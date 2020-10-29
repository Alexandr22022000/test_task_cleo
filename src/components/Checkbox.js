import React from 'react';
import '../styles/Checkbox.css';

class Checkbox extends React.Component {
    render () {
        return (
            <div className="checkbox_main_container">
                <div className="checkbox_container">
                    <label className={"checkbox_label" + (this.props.value ? " checkbox_label_checked" : '')} >
                        <input className="checkbox_input" type="checkbox" onClick={() => this.props.onChange(!this.props.value)} checked={this.props.value}/>
                        Sort by stars
                    </label>
                </div>
            </div>
        );
    }
}

export default Checkbox;
