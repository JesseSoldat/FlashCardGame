import Backbone from 'backbone';
import React from 'react';
import ReactDom from 'react-dom';
import _ from 'underscore';
import Cookies from 'js-cookie';
import $ from 'jquery';
//---------------------------------
//Views
//---------------------------------
import NoCookies from './views/no_cookies';
import SignIn from './views/sign_in';
import CreateAccount from './views/create_account';
import SelectDeck from './views/select_deck';

//Router for page views
//-----------------------------------
let Router = Backbone.Router.extend({

  routes: {
    ""                                : "redirectToWelecome",
    "welcome"                         : "welcome",
    "login"                           : "signIn",
    "register"                        : "createAccount",
    "user/:username"                  : "selectDeck",
    "user/:username/decks"            : "addDeck",
    "user/:username/decks/:id/edit"   : "editDeck",
    "user/:username/play/:id"         : "playDeck",

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
          firstname: data.firstname,
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
  signIn(){
    this.render(<SignIn
      onSignInClick={(username, password) => this.logIn(username, password)}
      onCancelClick={() => this.goto('welcome')}/>
        );
  },

   logIn(username, password) {
    console.log(username, password);

    let request = $.ajax({
      url: 'https://morning-temple-4972.herokuapp.com/login',
      method: 'POST',
      data: {
        username: username,
        password: password
      }//data
    });//request

    $('.app').html('loading.......');

    request.then((data) => {
      Cookies.set('user', data, { expires: 7 });

      Cookies.getJSON();

      $.ajaxSetup({
        headers: {
          auth_token: data.access_token,
          firstname: data.firstname,
          lastname: data.lastname,
          email: data.email,
          username: data.username
        }//headers
      });//.ajaxSetup
      this.goto(`user/${data.username}`);
    }).fail(() => {
      $('.app').html('Try again......');
    }); //.then.fail
  }, //login
//---------------------------------------------------------------
  removeCookie(event) {
    Cookies.remove('user');

    let ajaxNull = $.ajaxSetup({
      headers: {
        auth_token: null
      }//headers
    })//.ajaxSetup

    this.goto('login');
  },
//---------------------------------------------------------------

   selectDeck(){
    let userData = Cookies.getJSON('user');
    // let test = Cookies.get('user');
    // console.log(userData);

    let request = $.ajax({
      url: 'https://morning-temple-4972.herokuapp.com/decks',
      method: 'GET',
      headers: {
        auth_token: userData.auth_token
      }, //headers
    })//.ajax

    request.then((data) => {

      // console.log(data);
    //-----------------------
    this.render(<SelectDeck
      decks={data}
      onAdd={() => this.goto(`user/${userData.username}/decks`)}
      onPlay={(id) => this.goto(`user/${userData.username}/play/${id}`)}
      onEdit={(id) => this.goto(`user/${userData.username}/decks/${id}/edit`)}/>
      
      );
    //-----------------------
  
    }).fail(() => {
      $('.app').html('Unable to load Decks...');
    });
    


  }, //selectDeck
//------------------------------------------------------------
  addDeck(){
    console.log('addDeckPage');
  },
//------------------------------------------------------------ 
  editDeck(username, id) {
    console.log(id);
  },
//------------------------------------------------------------
  playDeck(username, id) {
    console.log(id);
  },





}); //router
export default Router;