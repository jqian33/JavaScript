import React from 'react';

class Button extends React.Component {
    constructor(props) {
        super(props);
        this.state = { counter: 3 };
        // This binding is necessary to make `this` work in the callback
        this.handleClick = this.handleClick.bind(this);

    }

   handleClick () {
       this.setState({
           counter: this.state.counter + 1
       })
   };

    render () {
        return (
            <button onClick={this.handleClick}>
                {this.state.counter}
            </button>
        );
    }
}

export default Button;