import React from 'react';
import AdminComponent from './admin_component';


export default React.createClass({

  logOutHandler(){
    // console.log('logOut');
    this.props.onLogOut();
  },
//--------------------------------------------------
  updateQuestion(event){
    let newQuestion = event.currentTarget.value;

    this.setState({
      card_question: newQuestion
    });
  },
   updateAnswer(event){
    let newAnswer = event.currentTarget.value;

    this.setState({
      card_answer: newAnswer
    });
  },
//--------------------------------------------------
cancel(){
    this.props.onCancelClick();
  },
submit(){
  this.props.onSubmitClick(this.state.card_question, this.state.card_answer, this.props.deckId);
  
},

  render() {
    return (
    <div>
      <AdminComponent logOutHandler={this.logOutHandler}/>
      <h2>Edit Cards</h2>
      <h3>{this.props.deckId}</h3>
      <input onChange={this.updateQuestion}></input>
      <input onChange={this.updateAnswer}></input>
      <button onClick={this.submit}>Submit</button>
      <button onClick={this.cancel}>Cancel</button>

    </div>
    );
  }

}); 