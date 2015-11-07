import React from 'react';

export default React.createClass({

 getInitialState(){
    return {
      firstname: "",
      lastname: "",
      email: "",
      username: "",
      password: "", 
    };
  },

  updateUsername(event){
    // console.log("updateUsername");
    let newName = event.currentTarget.value;

    this.setState({
      username: newName
    });
    
      // console.log(this.state.username);
    
  },

  updatePassword(event){
    // console.log("updatePassword");
      let newPassword = event.currentTarget.value;
    
    this.setState({
      password: newPassword
    });
    // console.log(this.state.password);

  },

  signIn(){
    // console.log("signIn");
    // console.log(this.state.username, this.state.password);

    this.props.onSignInClick(this.state.username, this.state.password);

  },
  cancelHandler(){
    // console.log("cancelHandler");
    this.props.onCancelClick();

  },

  render() {
    return (
      <div>
        <div className="header">
          <h2>Welcome to Flashcard Game</h2>
        </div>
        <div className="sign-in">
          <h2>Enter Your Login Credentials</h2>
          <form>
            <label>Your Username:  <input id="userName" type="text" className="user" onChange={this.updateUsername}/>
            </label>
            <label>Your Password:  <input id="password" type="password" className="password" onChange={this.updatePassword}/>
            </label>
            <button onClick={this.signIn}>Sign In</button>
            <button onClick={this.cancelHandler}>Cancel</button>
          </form> 
        </div>
      </div>
    );
  }

}); 