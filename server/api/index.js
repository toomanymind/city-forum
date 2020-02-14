const express = require('express')
let router = express.Router()
let setApiApp = require('./app')
let setApiUpload = require('./upload')
let setApiUsers = require('./users')


setApiUsers(router)
setApiApp(router)
setApiUpload(router)

module.exports = router