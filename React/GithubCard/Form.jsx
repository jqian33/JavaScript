import React from 'react';
import axios from 'axios';

class Form extends React.Component {
    constructor(props) {
        super(props);
        this.state = { userName: '' }

        // This binding is necessary to make `this` work in the callback
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit (event) {
        event.preventDefault();
        axios.get('https://api.github.com/users/' + this.state.userName)
            .then(resp => {
                this.props.onSubmit(resp.data);
                this.setState({ userName: '' });
            });
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <input type = "text" 
                    value = {this.state.userName}
                    onChange={(event) => this.setState({ userName: event.target.value })}
                    placeholder="Github username" />
                <button type="submit">Add card</button>
            </form>
        );
    }
}

export default Form;
