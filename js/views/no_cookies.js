import React from 'react';

export default React.createClass({

  signIn(){
    console.log('signIn');
  },

  createAccount(){
    console.log('createAccount');
    
  },


  render() {
    return (
      <div>
        <div className="header">
         <h1>test</h1>
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