import Backbone from 'backbone';
import React from 'react';
import ReactDom from 'react-dom';
import _ from 'underscore';
import Cookies from 'cookies-js';
import $ from 'jquery';
//---------------------------------
//Views
//---------------------------------
import NoCookies from './views/no_cookies';
import SignIn from './views/sign_in';
import CreateAccount from './views/create_account';

//Router for page views
//-----------------------------------
let Router = Backbone.Router.extend({

  routes: {
    ""           : "redirectToWelecome",
    "welcome"    : "welcome",
    "login"      : "signIn",
    "register"   : "createAccount",
  },


//initial setup 
//-----------------------------------

  initialize(appElement) {
    this.el = appElement;
    let router = this;
    // console.log("initialize");
    // console.log(this.el);
  },

  render(component) {
    ReactDom.render(component, this.el);
    // console.log('render');
  },

  start() {
    Backbone.history.start();
    return this;
  },

  goto(route) {
    this.navigate(route, {
      trigger: true
    });
  },
//---------------------------------------------------------------
  redirectToWelecome() {
    // console.log('redirectToWelcome');
    this.navigate('welcome', {
      replace: true,
      trigger: true
    });
  }, //redirectToWelcome
//---------------------------------------------------------------
  welcome() {
    // console.log("welcome");
    this.render(
      <NoCookies
      onSignInClick={() => this.goto('login')}
      onCreateAccountClick={() => this.goto('register')}/>, 
      );
  }, //welcome
//---------------------------------------------------------------
  signIn(){
    this.render(<SignIn
      onSignInClick={(username, password) => this.logIn(username, password)}
      onCancelClick={() => this.goto('welcome')}/>
        );
  },

   logIn(username, password) {
    console.log(username, password);
  }, //login
//---------------------------------------------------------------
  createAccount() {
    this.render(<CreateAccount
      onSubmitClick={(first, last, email, user, password) => this.newUser(first, last, email, user, password)}
      onCancelClick={() => this.goto('welcome')}/>
      );
  }, //createAccount

  newUser(first, last, email, user, password){
    console.log(first, last, email, user, password);
    let request = $.ajax({
      url: "https://morning-temple-4972.herokuapp.com/signup",
      method: 'POST',
      data: {
        firstname: first,
        lastname: last,
        email: email,
        username: user,
        password: password
      } //data
    }); //ajax

    $('.app').html('loading....');

    request.then((data) => {
      $.ajaxSetup({
        headers: {
          auth_token: data.access_token,
          firsname: data.firstname,
          lastname: data.lastname,
          email: data.email,
          username: data.username
        }//headers
      });//ajaxSetup
      this.goto('login');
    }).fail(() => {
      $('.app').html('Try again......');

    }); //.fail chained from .then

  },//createAccount
//---------------------------------------------------------------









}); //router
export default Router;