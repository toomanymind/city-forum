const express = require('express')
let router = express.Router()


router.get('/', (req, res) => {
  res.redirect('/index')
})
router.get('/login', (req, res) => {
  res.render('login')
})
router.get('/index', (req, res) => {
  res.render('index', {})
})






router.get('/test/user', (req, res) => {
  res.render('test/user')
})
router.get('/test/upload', (req, res) => {
  res.render('test/upload')
})

module.exports = router