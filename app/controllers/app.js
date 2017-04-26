'use strict'

// 用于封装controllers的公共方法

var mongoose = require('mongoose')
var uuid = require('uuid')
var User = mongoose.model('User')

exports.hasBody = function *(next) {
  var body = this.request.body || {}
  // console.log(this.query.phonenumber)
  console.log(this)

  if (Object.keys(body).length === 0) {
    this.body = {
      success: false,
      err: '某参数缺失'
    }

    return next
  }

  yield next
}

// 检验token
exports.hasToken = function *(next) {
  var accessToken = this.query.accessToken

  if (!accessToken) {
    accessToken = this.request.body.accessToken
  }

  if (!accessToken) {
    this.body = {
      success: false,
      err: '钥匙丢了'
    }

    return next
  }

  var user = yield User.findOne({
    accessToken: accessToken
  })
  .exec()

  if (!user) {
    this.body = {
      success: false,
      err: '用户没登陆'
    }

    return next
  }

  this.session = this.session || {}
  this.session.user = user

  yield next
}