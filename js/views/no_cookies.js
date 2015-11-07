import React from 'react';

export default React.createClass({

  signIn(){
    // console.log('signIn');
    this.props.onSignInClick();
  },

  createAccount(){
    // console.log('createAccount');
    this.props.onCreateAccountClick();

    
  },


  render() {
    return (
      <div>
        <div className="header">
         <h1>Welcome</h1>
        </div>
        <div className="welcome">
          <form>
            <button onClick={this.signIn}>Sign In</button>
            <button onClick={this.createAccount}>Create Account</button>
          </form>  
        </div>
      </div>
    );
  }

}); 

// console.log('noCookies');