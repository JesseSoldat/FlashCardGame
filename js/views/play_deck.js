import React from 'react';

export default React.createClass({

  showQuestions(card){
    return(
  <div key={card.id}> 
    <li>Question........  {card.question}</li>
    <li>Answer.........  {card.answer}</li>
  </div>
  );

  },
  render() {
    return (
    <div>
      <h1>Play this deck</h1>
      <ul>{this.props.cards.map(this.showQuestions)}</ul>
     


     

    </div>
    );
  }

});  