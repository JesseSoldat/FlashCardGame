import React from 'react';

export default React.createClass({

  adminLogOut(){
    this.props.logOutHandler();
  },

  render() {
    return (
    <div>
      <h1>Admin
        <i className="fa fa-lock"></i>
      </h1>
      <h3>User Name</h3>
      <button className="logOutBtn" 
        onClick={this.adminLogOut}>
        <p className="buttonTitle">Log Out</p>
        <i className="fa fa-sign-out"></i>
      </button>
    </div>
    );
  }

}); 