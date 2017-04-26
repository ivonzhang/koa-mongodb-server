'use strict'

const bodyParser = require('koa-bodyparser')
const Router = require('koa-router')
const User = require('../app/controllers/user')
const App = require('../app/controllers/app')

module.exports = function(){
	var router = new Router({
    prefix: '/api'
  })

  // user
  router.post('/u/signup', bodyParser(), App.hasBody, User.signup)
  router.post('/u/update', App.hasBody, App.hasToken, User.update)

  return router
}