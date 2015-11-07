import React from 'react';
import AdminComponent from './admin_component';


export default React.createClass({

  logOut(){
    // console.log('logOut');
  },

  addDeck(){
    // console.log('addDeck');
    this.props.onAdd();
  },

  playDeck(id){
    // console.log('playDeck');
    this.props.onPlay(id);

  },
  editDeck(id){
   // console.log('editDeck');
   this.props.onEdit(id);
  },
//-------------------------------------------------------
  formatDecks(deck){
    return(
      <div key={deck.id} className="deck">
        <div className="deckTitle">{deck.title}
         <p>{deck.id}</p>
        </div>

        <button className="play" onClick={() => this.playDeck(deck.id)}>
          <p className="buttonTitle">Play Deck</p>
          <i className="fa fa-play"></i>
        </button>

        <button className="edit" onClick={() => this.editDeck(deck.id)}>
          <p className="buttonTitle">Edit Deck</p>
          <i className="fa fa-pencil"></i>
        </button>

      </div>
        );
  },
//-------------------------------------------------------
  render() {
    return (
    <div> 
      <div className="admin">
       <AdminComponent onLogOut={this.logOut}/>
      </div>

      <div className="deckList">
       <h2 className="selectTitle">Choose a deck
        <i className="fa fa-hand-pointer-o"></i>
       </h2>

       <button className="addDeckBtn" onClick={this.addDeck}>
        <i className="fa fa-plus fa-2x"></i>
       </button>

       <div>
         {this.props.decks.map(this.formatDecks)}
       </div>

      </div>
    </div>
    ); //return
  } //render

}); 

