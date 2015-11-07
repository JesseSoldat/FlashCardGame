import React from 'react';
import AdminComponent from './admin_component';


export default React.createClass({

  updateTitle(event){
    let newTitle = event.currentTarget.value;

    this.setState({
      title: newTitle
    });
  },
  logOutHandler(){
    // console.log('logOut');
    this.props.onLogOut();
  },
  submit() {
    this.props.onSubmitClick(this.state.title);

  },
  cancel(){
    this.props.onCancelClick();
  },

  render() {
    return (
    <div>
      <AdminComponent logOutHandler={this.logOutHandler}/>
     <h2>Create a deck</h2>
     <input onChange={this.updateTitle}/>
     <button onClick={this.submit}>Submit</button>
     <button onClick={this.cancel}>Cancel</button>
    </div>
    );
  }

}); 
console.log('add decks view');