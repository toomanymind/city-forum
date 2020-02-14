const { models } = require('../../db/connector')
const sessionManager = require('../../session/sessionManager')

let setApiApp = function(router) {

  router.post('/login', (req, res) => {
    let { name, password } = req.body

    let userFound = models.users.where({ name, password })

    if (userFound) {
      let sessionId = sessionManager.set(userFound.id)
      res.cookie('userid', userFound.id)
      res.cookie('sessionid', sessionId)
      res.redirect('/index')
    } else {
      res.send('username password not exists')
    }
  })

  router.all('/logout', (req, res) => {
    let {userid, sessionid} = req.cookies || {}

    if (
      userid
      && sessionid
      && sessionManager.getUserSession(userid) === sessionid
    ) {
      sessionManager.unset(userid)
      res.clearCookie('userid')
      res.clearCookie('sessionid')
      res.redirect('/login')
    } else {
      res.send('not logined yet.')
    }
  })
}

module.exports = setApiApp

