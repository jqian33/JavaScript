import React from 'react';
import Lodash from 'lodash';

const Stars = (props) => {
    return (
        <div className="col-5">
            {_.range(props.numberOfStars).map((number, i) =>
                <i key={i} className="fa fa-star"></i>
            )}
        </div>
    );
}

const Button = (props) => {
    let button;
    switch(props.answerIsCorrect) {
        case true:
            button =
                <button className="btn btn-success" onClick={props.acceptAnswer}>
                    <i className="fa fa-check"></i>
                </button>;
            break;
        case false:
            button = 
                <button className="btn btn-danger">
                    <i className="fa fa-times"></i>
                </button>;
            break;
        default:
            button = 
                <button className="btn" 
                        onClick={props.checkAnswer}
                        disabled={props.selectedNumbers.length === 0}>
                    =
                </button>;
            break;
    }

    return (
        <div className="col-2 text-center">
            {button}
            <br /><br />
            <button className="btn btn-warning btn-sm" 
                    onClick={props.redraw}
                    disabled={props.redraws <= 0}>
                <i className="fa fa-refresh"></i> {props.redraws}
            </button>
        </div>
    );
}

const Answer = (props) => {
    return (
        <div className="col-5">
            {props.selectedNumbers.map((number, i) =>
                <span key={i} onClick={() => props.unselectNumber(number)}>
                    {number}
                </span>)}
        </div>
    )
}

const DoneFrame = (props) => {
    return (
        <div className="text-center">
            <h2>{props.doneStatus}</h2>
            <button className="btn btn-secondary" onClick={props.resetGame}>
                Play Again
            </button>
        </div>
    );
}

const Numbers = (props) => {
    // This function just returns a string that will be used by the className attribute below
    const numberClassName = (number) => {
        if (props.selectedNumbers.indexOf(number) >= 0) {
            return 'selected';
        }
        if (props.usedNumbers.indexOf(number) >= 0) {
            return 'used';
        }
    }

    return (
        <div className="card text-center">
            <div>
                {Numbers.list.map((number, i) => 
                    <span key={i} className={numberClassName(number)}
                          onClick={() => props.selectNumber(number)}>
                        {number}
                    </span>
                )}
            </div>
        </div>
    );
}

Numbers.list =  _.range(1, 10);

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedNumbers: [],
            numberOfStars: 1 + Math.floor(Math.random()*9),
            answerIsCorrect: null,
            usedNumbers: [],
            redraws: 5,
            doneStatus: null
        };

        // This binding is necessary to make `this` work in the callback
        this.selectNumber = this.selectNumber.bind(this);
        this.unselectNumber = this.unselectNumber.bind(this);
        this.checkAnswer = this.checkAnswer.bind(this);
        this.acceptAnswer = this.acceptAnswer.bind(this);
        this.redraw = this.redraw.bind(this);
        this.resetGame = this.resetGame.bind(this);
    }

    acceptAnswer() {
        this.setState(prevState => ({
            usedNumbers: prevState.usedNumbers.concat(prevState.selectedNumbers),
            selectedNumbers: [],
            answerIsCorrect: null,
            numberOfStars: 1 + Math.floor(Math.random()*9)
        }), this.updateDoneStatus);
    };

    unselectNumber (clickedNumber) {
        this.setState(prevState => ({
            answerIsCorrect: null,
            selectedNumbers: prevState.selectedNumbers.filter(number => number !== clickedNumber)
        }));
    };

    selectNumber (clickedNumber) {
        if (this.state.selectedNumbers.indexOf(clickedNumber) >= 0 ||
            this.state.usedNumbers.indexOf(clickedNumber) >= 0) { return; }
        this.setState(prevState => ({
            answerIsCorrect: null,
            selectedNumbers: prevState.selectedNumbers.concat(clickedNumber)
        }));
    };

    checkAnswer () {
        this.setState(prevState => ({
            answerIsCorrect: prevState.numberOfStars === 
                prevState.selectedNumbers.reduce((acc, n) => acc + n, 0)
        }));
    };

    redraw() {
        if (this.state.redraws <=0 ) { return; }
        this.setState(prevState => ({
            selectedNumbers: [],
            answerIsCorrect: null,
            numberOfStars: 1 + Math.floor(Math.random()*9),
            redraws: prevState.redraws - 1
        }), this.updateDoneStatus);
    };

    possibleSolutions ({numberOfStars, usedNumbers}) {
        const possibleNumbers = _.range(1, 10).filter(number =>
            usedNumbers.indexOf(number) === -1    
        );

        return possibleCombinationSum(possibleNumbers, numberOfStars);
    }

    updateDoneStatus() {
        this.setState(prevState => {
            if (prevState.usedNumbers.length === 9) {
                return {doneStatus: 'Complete!'};
            }
            if (prevState.redraws <= 0 && !this.possibleSolutions(prevState)) {
                return {doneStatus: 'Game Over!'};
            }
        });
    }

    resetGame() {
        this.setState({
            selectedNumbers: [],
            numberOfStars: 1 + Math.floor(Math.random()*9),
            answerIsCorrect: null,
            usedNumbers: [],
            redraws: 5,
            doneStatus: null
        });
    }

    render() {
        const { selectedNumbers, numberOfStars, answerIsCorrect, usedNumbers, redraws, doneStatus } = this.state;
        return (
            <div className="container">
               <h3>Play Nine</h3>
               <hr />
               <div className="row">
                   <Stars numberOfStars={numberOfStars} />
                   <Button selectedNumbers={selectedNumbers} 
                           checkAnswer={this.checkAnswer} 
                           answerIsCorrect={answerIsCorrect} 
                           acceptAnswer={this.acceptAnswer} 
                           redraw={this.redraw}
                           redraws={redraws} />
                   <Answer selectedNumbers={selectedNumbers} 
                            unselectNumber={this.unselectNumber} />
               </div>
               <br />
               {doneStatus ? 
                   <DoneFrame doneStatus={doneStatus} resetGame={this.resetGame} />:
                   <Numbers selectedNumbers={selectedNumbers} 
                            selectNumber={this.selectNumber}
                            usedNumbers={usedNumbers} />
             }
              
            </div>
        );
    }
}

class App extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <Game />
            </div>
        );
    }
}

// bit.ly/s-pcs
var possibleCombinationSum = function(arr, n) {
    if (arr.indexOf(n) >= 0) { return true; }
    if (arr[0] > n) { return false; }
    if (arr[arr.length - 1] > n) {
      arr.pop();
      return possibleCombinationSum(arr, n);
    }
    var listSize = arr.length, combinationsCount = (1 << listSize)
    for (var i = 1; i < combinationsCount ; i++ ) {
      var combinationSum = 0;
      for (var j=0 ; j < listSize ; j++) {
        if (i & (1 << j)) { combinationSum += arr[j]; }
      }
      if (n === combinationSum) { return true; }
    }
    return false;
  };

export default App;