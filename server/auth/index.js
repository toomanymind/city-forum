const sessionManager = require('../../session/sessionManager')
const { models } = require('../../db/connector')

let auth = (req, res, next) => {
  let {userid, sessionid} = req.cookies || {}

  if (
    userid
    && sessionid
    && sessionManager.getUserSession(userid) === sessionid
  ) {
    res.locals.isLogined = true
    res.locals.userInfo = models.users.getById({ id: userid })
  } else {
    res.locals.isLogined = false
    res.locals.userInfo = {}
  }

  next()
}


module.exports = auth