const sessionManager = require('../../session/sessionManager')

let auth = (req, res, next) => {
  let {userid, sessionid} = req.cookies || {}

  res.locals.isLogined = (
    userid
    && sessionid
    && sessionManager.getUserSession(userid) === sessionid
  )


  next()
}


module.exports = auth