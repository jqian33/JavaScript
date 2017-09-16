import React from 'react';

class Button extends React.Component {
    constructor(props) {
        super(props);

        // This binding is necessary to make `this` work in the callback
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick () {
        this.props.onClickFunction(this.props.incrementValue);
    }

    render () {
        return (
            <button onClick={this.handleClick}>
                +{this.props.incrementValue}
            </button>
        );
    }
}

export default Button;