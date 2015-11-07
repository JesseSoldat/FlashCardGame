import Backbone from 'backbone';
import React from 'react';
import ReactDom from 'react-dom';
import _ from 'underscore';
import Cookies from 'cookies-js';
//---------------------------------
//Views
//---------------------------------
import NoCookies from './views/no_cookies'

//Router for page views
//-----------------------------------
let Router = Backbone.Router.extend({

  routes: {
    ""           : "redirectToWelecome",
    "welcome"    : "welcome",
    "login"      : "login",
    "register"   : "register",
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

  redirectToWelecome() {
    // console.log('redirectToWelcome');
    this.navigate('welcome', {
      replace: true,
      trigger: true
    });
  }, //redirectToWelcome

  welcome() {
    // console.log("welcome");
    this.render(<NoCookies/>)
  }, //welcome



  login() {

  }, //login

  register() {

  }, //register






});


export default Router;