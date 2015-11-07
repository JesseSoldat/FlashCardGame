import React from 'react';

export default React.createClass({

  render() {
    return (
    <div>
      <h1>Play this deck</h1>
      <h1>{this.props.cards.title}</h1>
      <h1>{this.props.cards.id}</h1>

    </div>
    );
  }

}); 