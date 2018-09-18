import React from 'react';
import Form from './Form.jsx';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cards: []
        };

        // This binding is necessary to make `this` work in the callback
        this.addNewCard = this.addNewCard.bind(this);
    }
    
    addNewCard (cardInfo) {
        this.setState(prevState => ({
            cards: prevState.cards.concat(cardInfo)
        }));
    }

    render() {
        return (
            <div>
                <Form onSubmit={this.addNewCard} />
                <CardList cards={this.state.cards} />
            </div>
        );
    }
}

const Card = (props) => {
    return (
        <div>
            <img width="75" src={props.avatar_url} />
            <div style={{display: 'inline-block', marginLeft: 10}}>
                <div style={{fontSize: '1.25em', fontWeight: 'bold'}}>
                    {props.name}
                </div>
                <div>
                    {props.company}
                </div>
            </div>
        </div>
    )
}

const CardList = (props) => {
    return (
        <div>
            <ul style={styles}>
                {props.cards.map(card => <li key={card.login}><Card {...card} /></li>)}
            </ul>
        </div>
    );
}

var styles = {
    listStyleType: 'none',
    paddingLeft: '0'
};

export default App;