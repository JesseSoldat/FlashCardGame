import React from 'react';

export default React.createClass({
//-------------------------------------------------------


  updateFirst(event){
    let newFirst = event.currentTarget.value;
    
    this.setState({
      firstname: newFirst
    });
  },

  updateLast(event){
    let newLast = event.currentTarget.value;

    this.setState({
      lastname: newLast
    });
  },

  updateEmail(event){
    let newEmail = event.currentTarget.value;

    this.setState({
      email: newEmail
    });   
  },

  updateUsername(event){
    let newUsername = event.currentTarget.value;

    this.setState({
      username: newUsername
    });
  },

  updatePassword(event){
    let newPassword = event.currentTarget.value;

    this.setState({
      password: newPassword
    });
  },
//----------------------------------------------------------
  createAccount(event){
    this.props.onSubmitClick(
      this.state.firstname,
      this.state.lastname,
      this.state.email,
      this.state.username,
      this.state.password
    );
  },
  cancelHandler(){
    this.props.onCancelClick();
  },
//----------------------------------------------------------

  render() {
    return (
      <div>
        <div className="header">
          <h2>Welcome to the Flashcard Game</h2>
        </div>
        <div className="signIn">
          <h2>Create an Account</h2>
          <form>
            <label>First Name: <input type="text" className="firstName" onChange={this.updateFirst}/>
            </label>

            <label>Last Name: <input type="text" className="lastName" onChange={this.updateLast}/>
            </label>

            <label>Email: <input type="text" className="email" onChange={this.updateEmail}/>
            </label>

            <label>Username: <input type="text" className="username" onChange={this.updateUsername}/>
            </label>

            <label>Password: <input type="text" className="password" onChange={this.updatePassword}/>
            </label>
            <button onClick={this.createAccount}>Create Account</button>
            <button onClick={this.cancelHandler}>Cancel</button>
          </form>
        </div>  
      </div>
    );
  }

}); 