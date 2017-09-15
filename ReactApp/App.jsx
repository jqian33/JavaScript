import React from 'react';
import Button from './Button.jsx'
import Result from './Result.jsx'

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = { counter: 0 };
        // This binding is necessary to make `this` work in the callback
        this.IncrementCounter = this.IncrementCounter.bind(this);
    }

    IncrementCounter (value) {
        this.setState((prevState) => ({
             counter: prevState.counter + value
        }));
    };

    render() {
        return (
            <div>
                Hello World!
                <div>
                    <Button incrementValue={1} onClickFunction={this.IncrementCounter}/>
                    <Button incrementValue={5} onClickFunction={this.IncrementCounter}/>
                    <Button incrementValue={10} onClickFunction={this.IncrementCounter}/>
                    <Button incrementValue={20} onClickFunction={this.IncrementCounter}/>
                    <Result counter={this.state.counter}/>
                </div>
            </div>
        );
    }
}

export default App;