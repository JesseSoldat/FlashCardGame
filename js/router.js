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
//---------------------------------
import SelectDeck from './views/select_deck';
import PlayDeck from './views/play_deck';
import AddDeck from './views/add_deck';
import EditDeck from './views/edit_deck';

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
    "user/:username/play/:id"         : "playDeck",
    "user/:username/decks/:id/edit"   : "editDeck",

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
      
    }).fail(() => {
      $('.app').html('Try again......');
      this.goto("login");


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
      this.goto('welcome')
      $('.app').html('Try again.........');

    }); //.then.fail
  }, //login
//---------------------------------------------------------------
  removeCookies(event) {
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
      onEdit={(id) => this.goto(`user/${userData.username}/decks/${id}/edit`)}
      onLogOut={() => this.removeCookies()}/>
      
      );
    //-----------------------
  
    }).fail(() => {
      $('.app').html('Unable to load Decks...');
    });
    


  }, //selectDeck
//------------------------------------------------------------
  addDeck(){
    let data = Cookies.getJSON('user');
    // console.log('addDeckPage');
    this.render(<AddDeck
      onLogOut={() => this.removeCookies()}
      onSubmitClick={(title) => this.newDeck(title)}
      onCancelClick={() => this.goto(`user/${data.username}`)}/>
      );
  },
  newDeck(title) {
    console.log(title);
    let user = Cookies.getJSON('user');

    let request = $.ajax({
      url: 'https://morning-temple-4972.herokuapp.com/decks',
      method: 'POST',
      headers: {
        auth_token: user.auth_token
      },//headers
      data: {
        title: title
      }
    });//ajax
    $('.app').html('loading.....');
    request.then((data) => {
      $.ajaxSetup({
        headers: {
          id: data.id,
          title: data.title
        }
      });
      this.goto(`user/${user.username}`);
    }).fail(() => {
      $('.app').html('Could not add deck.....');
    })
  },//newDeck
//------------------------------------------------------------
   playDeck(username, id) {
    // console.log(id);
    let user = Cookies.getJSON('user');

    let request=$.ajax({
      url: `https:/morning-temple-4972.herokuapp.com/decks/${id}/cards`,
      method: 'GET',
      headers: {
        auth_token: user.auth_token,
      },//headers
      data: {
        title: user.title
      }
    }); //ajax
    $('.app').html('loading.....');

    request.then((data) => {

      // console.log(data);


    this.render(<PlayDeck
      cards={data}
      question={data.question}
      answer={data.answer}/>
      );

   })//.then
  },//playDeck
//------------------------------------------------------------ 
  editDeck(username, id) {
    let user = Cookies.getJSON('user');
    // console.log(id);

    let request = $.ajax({
      url: `https:/morning-temple-4972.herokuapp.com/decks/${id}/cards`,
      method: 'GET',
      headers: {
        auth_token: user.auth_token
      },//headers
      data: {
        
      },//data
    });//ajax

    $('.app').html('loading.....');

    request.then((data) => {
      console.dir(data);
    
    this.render(<EditDeck
      deckId={id}
      cards={data}
      onLogOut={() => this.removeCookies()}
      onCancelClick={() => this.goto(`user/${user.username}`)}
      onSubmitClick={(question, answer, id) => this.saveCard(question, answer, id)} />
      );
      
    }).fail(() => {
      $('.app').html('Can not load cards......');
    });

   
  },
  saveCard(question, answer, id){
    let user = Cookies.getJSON('user');
    console.log(question, answer, id);
    let request = $.ajax({
      url: `https:/morning-temple-4972.herokuapp.com/decks/${id}/cards`,
      method: 'POST',
      headers: {
        auth_token: user.auth_token
      },//headers
      data: {
        question: question,
        answer: answer
      }
    });//ajax
    

    $('.app').html('loading.....');

    request.then((data) => {
      $.ajaxSetup({
        headers: {
          id: data.id,
          question: data.question,
          answer: data.answer
        }//headers
      });//ajaxSetup
     this.goto(`user/${user.username}`);
    }).fail(() => {
      $('.app').html('Can not save card......');
    });
  },//saveCard
//------------------------------------------------------------





}); //router
export default Router;